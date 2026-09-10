import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: 'store.json' },
  z.object({
    postgresPassword: z.string().optional().catch(undefined),
    jwtSecret: z.string().optional().catch(undefined),
    keyVaultSecret: z.string().optional().catch(undefined),
    listenerAuthSecret: z.string().optional().catch(undefined),
    listenerRequestAuthSecret: z.string().optional().catch(undefined),
    nwcVaultSecret: z.string().optional().catch(undefined),
  }),
)
