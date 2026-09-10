import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.6.0:1',
  releaseNotes: {
    en_US:
      'LaWallet NWC 2.6.0. Pins both published images to 2.6.0 and generates the NWC vault key plus a dedicated listener request secret required since 2.1. Existing 2.0.0:1 secrets are left unchanged on upgrade.',
    es_ES:
      'LaWallet NWC 2.6.0. Pins both published images to 2.6.0 and generates the NWC vault and listener request secrets required since 2.1. Existing 2.0.0:1 secrets are left unchanged on upgrade.',
    de_DE:
      'LaWallet NWC 2.6.0. Pins both published images to 2.6.0 and generates the NWC vault and listener request secrets required since 2.1. Existing 2.0.0:1 secrets are left unchanged on upgrade.',
    pl_PL:
      'LaWallet NWC 2.6.0. Pins both published images to 2.6.0 and generates the NWC vault and listener request secrets required since 2.1. Existing 2.0.0:1 secrets are left unchanged on upgrade.',
    fr_FR:
      'LaWallet NWC 2.6.0. Pins both published images to 2.6.0 and generates the NWC vault and listener request secrets required since 2.1. Existing 2.0.0:1 secrets are left unchanged on upgrade.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
