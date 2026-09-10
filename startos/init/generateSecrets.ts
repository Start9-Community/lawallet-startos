import { sdk } from '../sdk'
import { generateSecret } from '../utils'
import { storeJson } from '../fileModels/store.json'

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
