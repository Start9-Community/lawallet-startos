import { sdk } from '../sdk'
import { generateSecret } from '../utils'
import { storeJson } from '../fileModels/store.json'

/**
 * Generate the secrets the service needs on first install. All four are
 * long-lived: the Postgres cluster is initialized with `postgresPassword`,
 * sessions are signed with `jwtSecret`, server-custodied Nostr keys are
 * encrypted under `keyVaultSecret`, and the web app authenticates the listener
 * with `listenerAuthSecret`. Regenerating any of them breaks existing data, so
 * they are written once and then only read.
 */
export const generateSecrets = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await storeJson.merge(effects, {
      postgresPassword: generateSecret(24),
      jwtSecret: generateSecret(48),
      keyVaultSecret: generateSecret(48),
      listenerAuthSecret: generateSecret(48),
    })
  } else {
    await storeJson.merge(effects, {})
  }
})
