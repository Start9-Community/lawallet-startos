import { FileHelper } from '@start9labs/start-sdk'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

// PG_VERSION under main/postgresql/data means the sideload package wrote this cluster.
const sideloadPgVersion = FileHelper.string({
  base: sdk.volumes.main,
  subpath: 'postgresql/data/PG_VERSION',
})

export const refuseSideloadData = sdk.setupOnInit(async (_effects, kind) => {
  if (kind !== 'update') return
  if ((await sideloadPgVersion.read().once()) === null) return
  throw new Error(
    i18n(
      'This install has a PostgreSQL cluster on the main volume, which means it came from the sideload package at lawalletio/lawallet-startos. This package keeps its database elsewhere, so updating in place would start an empty database and leave your data unreachable. Keep using the sideload package; its own releases update in place.',
    ),
  )
})
