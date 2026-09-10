import { sdk } from '../sdk'
import { generateSecret } from '../utils'
import { storeJson } from '../fileModels/store.json'

/**
 * Generate the secrets the service needs on first install. All six are
 * long-lived: the Postgres cluster is initialized with `postgresPassword`,
 * sessions are signed with `jwtSecret`, server-custodied Nostr keys are
 * encrypted under `keyVaultSecret`, the two halves authenticate to each
 * other with `listenerAuthSecret` / `listenerRequestAuthSecret`, and
 * RemoteWallet NWC data is encrypted under `nwcVaultSecret`. Regenerating
 * any of them breaks existing data, so they are written once and then only
 * read. Missing NWC/request secrets on update are filled once for installs
 * created before 2.6.0:1.
 */
export const generateSecrets = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await storeJson.merge(effects, {
      postgresPassword: generateSecret(24),
      jwtSecret: generateSecret(48),
      keyVaultSecret: generateSecret(48),
      listenerAuthSecret: generateSecret(48),
      listenerRequestAuthSecret: generateSecret(48),
      nwcVaultSecret: generateSecret(48),
    })
    return
  }

  const existing = await storeJson.read().once()
  const patch: {
    listenerRequestAuthSecret?: string
    nwcVaultSecret?: string
  } = {}
  if (!existing?.listenerRequestAuthSecret) {
    patch.listenerRequestAuthSecret = generateSecret(48)
  }
  if (!existing?.nwcVaultSecret) {
    patch.nwcVaultSecret = generateSecret(48)
  }
  if (Object.keys(patch).length > 0) {
    await storeJson.merge(effects, patch)
  }
})
