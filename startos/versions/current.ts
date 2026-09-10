import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.6.0:1',
  releaseNotes: {
    en_US:
      'LaWallet NWC 2.6.0. Pins both published images to 2.6.0 and generates the NWC vault key plus a dedicated listener request secret required since 2.1. Existing 2.0.0:1 secrets are left unchanged on upgrade.',
    es_ES:
      'LaWallet NWC 2.6.0. Fija ambas imágenes publicadas en 2.6.0 y genera la clave del vault NWC y el secreto de petición del listener exigidos desde 2.1. Los secretos de 2.0.0:1 no cambian al actualizar.',
    de_DE:
      'LaWallet NWC 2.6.0. Setzt beide veröffentlichten Images auf 2.6.0 und erzeugt den NWC-Vault-Schlüssel sowie das Listener-Request-Geheimnis, die seit 2.1 nötig sind. Bestehende Geheimnisse von 2.0.0:1 bleiben beim Update unverändert.',
    pl_PL:
      'LaWallet NWC 2.6.0. Przypina oba opublikowane obrazy do 2.6.0 i generuje klucz sejfu NWC oraz osobny sekret żądań listenera wymagane od 2.1. Istniejące sekrety z 2.0.0:1 nie zmieniają się przy aktualizacji.',
    fr_FR:
      'LaWallet NWC 2.6.0. Épingle les deux images publiées sur 2.6.0 et génère la clé du coffre NWC plus le secret de requête du listener exigés depuis 2.1. Les secrets 2.0.0:1 restent inchangés à la mise à jour.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
