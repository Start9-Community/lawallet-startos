import { sdk } from '../sdk'
import { generateSecret } from '../utils'
import { storeJson } from '../fileModels/store.json'

/**
 * Write the package-managed secrets on install, and backfill on update.
 *
 * Every one of these is load-bearing for data already on disk: the cluster was
 * initialized with `postgresPassword`, issued sessions are signed with
 * `jwtSecret`, custodied Nostr keys are encrypted under `keyVaultSecret`, and
 * RemoteWallet NWC strings under `nwcVaultSecret`. Regenerating any of them
 * destroys access rather than rotating a credential, so they are written once
 * and then only read.
 *
 * `nwcVaultSecret` is required by the listener; `listenerRequestAuthSecret` is
 * optional upstream and kept only to keep web→listener auth separate from the
 * webhook secret. Both are backfilled for installs that predate them.
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
  // `merge` diffs against what is on disk and skips a no-op write, so an
  // already-populated store needs no guard here.
  await storeJson.merge(effects, {
    listenerRequestAuthSecret:
      existing?.listenerRequestAuthSecret ?? generateSecret(48),
    nwcVaultSecret: existing?.nwcVaultSecret ?? generateSecret(48),
  })
})
