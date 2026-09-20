import { sdk } from '../sdk'
import { generateSecret } from '../utils'
import { storeJson } from '../fileModels/store.json'

// Each secret is load-bearing for data already on disk, so none is ever regenerated.
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
  await storeJson.merge(effects, {
    listenerRequestAuthSecret:
      existing?.listenerRequestAuthSecret ?? generateSecret(48),
    nwcVaultSecret: existing?.nwcVaultSecret ?? generateSecret(48),
  })
})
