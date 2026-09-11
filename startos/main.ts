import { i18n } from './i18n'
import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'
import { listenerPort, pgDatabase, pgPort, pgUser, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup ========================
   *
   * listenerRequestAuthSecret is absent from this list on purpose: upstream
   * marks it `.optional()` in both apps and documents a fallback to
   * LISTENER_AUTH_SECRET, so a store.json restored from a backup taken before
   * it existed must still boot.
   */
  const store = await storeJson.read().const(effects)
  if (
    !store?.postgresPassword ||
    !store.jwtSecret ||
    !store.keyVaultSecret ||
    !store.listenerAuthSecret ||
    !store.nwcVaultSecret
  ) {
    throw new Error('LaWallet NWC secrets are missing from store.json')
  }

  // Omit the key when unset so the app applies its documented fallback; an
  // empty string would fail its min(32) validation instead.
  const requestAuthEnv = store.listenerRequestAuthSecret
    ? { LISTENER_REQUEST_AUTH_SECRET: store.listenerRequestAuthSecret }
    : {}

  const databaseUrl = `postgresql://${pgUser}:${store.postgresPassword}@127.0.0.1:${pgPort}/${pgDatabase}`

  /**
   * ======================== Subcontainers ========================
   */
  const postgres = sdk.SubContainer.of(
    effects,
    { imageId: 'postgres' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'db',
      subpath: null,
      mountpoint: '/var/lib/postgresql',
      readonly: false,
    }),
    'postgres-sub',
  )

  const web = sdk.SubContainer.of(
    effects,
    { imageId: 'web' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: 'data',
      mountpoint: '/app/data',
      readonly: false,
    }),
    'web-sub',
  )

  const listener = sdk.SubContainer.of(
    effects,
    { imageId: 'listener' },
    sdk.Mounts.of(),
    'listener-sub',
  )

  /**
   * ======================== Daemons ========================
   *
   * Postgres comes up first on loopback only. The web app then runs the
   * image's `prisma migrate deploy && node server.js`, which owns the schema
   * both it and the listener read. The listener waits for that migration to
   * land before opening its relay connections.
   */
  return sdk.Daemons.of(effects)
    .addDaemon('postgres', {
      subcontainer: postgres,
      exec: {
        command: sdk.useEntrypoint(['-c', 'listen_addresses=127.0.0.1']),
        env: {
          POSTGRES_USER: pgUser,
          POSTGRES_DB: pgDatabase,
          POSTGRES_PASSWORD: store.postgresPassword,
        },
      },
      ready: {
        display: null,
        fn: async () => {
          const { exitCode } = await postgres.exec([
            'pg_isready',
            '-h',
            '127.0.0.1',
            '-U',
            pgUser,
            '-d',
            pgDatabase,
          ])
          return exitCode === 0
            ? { result: 'success', message: i18n('PostgreSQL is ready') }
            : {
                result: 'loading',
                message: i18n('Waiting for PostgreSQL to be ready'),
              }
        },
      },
      requires: [],
    })
    .addOneshot('chown-data', {
      subcontainer: web,
      exec: {
        command: ['chown', '-R', 'nextjs:nodejs', '/app/data'],
        user: 'root',
      },
      requires: [],
    })
    .addDaemon('web', {
      subcontainer: web,
      exec: {
        command: sdk.useEntrypoint(),
        env: {
          DATABASE_URL: databaseUrl,
          JWT_SECRET: store.jwtSecret,
          KEY_VAULT_SECRET: store.keyVaultSecret,
          NWC_VAULT_SECRET: store.nwcVaultSecret,
          LISTENER_URL: `http://127.0.0.1:${listenerPort}`,
          LISTENER_AUTH_SECRET: store.listenerAuthSecret,
          ...requestAuthEnv,
          NODE_ENV: 'production',
          PORT: String(uiPort),
          HOSTNAME: '0.0.0.0',
        },
      },
      ready: {
        display: i18n('Web Interface'),
        gracePeriod: 60000,
        fn: () =>
          sdk.healthCheck.checkWebUrl(
            effects,
            `http://127.0.0.1:${uiPort}/api/health`,
            {
              successMessage: i18n('The web interface is ready'),
              errorMessage: i18n('The web interface is not reachable'),
            },
          ),
      },
      requires: ['postgres', 'chown-data'],
    })
    .addDaemon('listener', {
      subcontainer: listener,
      exec: {
        command: sdk.useEntrypoint(),
        env: {
          DATABASE_URL: databaseUrl,
          LISTENER_PORT: String(listenerPort),
          LISTENER_AUTH_SECRET: store.listenerAuthSecret,
          ...requestAuthEnv,
          NWC_VAULT_SECRET: store.nwcVaultSecret,
          WEB_ORIGIN: `http://127.0.0.1:${uiPort}`,
          NODE_ENV: 'production',
        },
      },
      ready: {
        display: i18n('Payment Listener'),
        gracePeriod: 30000,
        fn: () =>
          sdk.healthCheck.checkWebUrl(
            effects,
            `http://127.0.0.1:${listenerPort}/health`,
            {
              successMessage: i18n('The payment listener is connected'),
              errorMessage: i18n('The payment listener is not reachable'),
            },
          ),
      },
      requires: ['web'],
    })
})
