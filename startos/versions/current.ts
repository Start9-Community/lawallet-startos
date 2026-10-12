import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

const CHANGELOG = 'https://github.com/lawalletio/lawallet-nwc/releases'

export const current = VersionInfo.of({
  version: '2.7.1:3',
  releaseNotes: {
    en_US:
      'Restarting LaWallet NWC while it is still starting stops every process of the previous run.',
    es_ES:
      'Reiniciar LaWallet NWC mientras aún se está iniciando detiene todos los procesos de la ejecución anterior.',
    de_DE:
      'Ein Neustart von LaWallet NWC, während es noch startet, beendet alle Prozesse des vorherigen Laufs.',
    pl_PL:
      'Ponowne uruchomienie LaWallet NWC w trakcie uruchamiania zatrzymuje wszystkie procesy poprzedniego uruchomienia.',
    fr_FR:
      "Redémarrer LaWallet NWC pendant son démarrage arrête tous les processus de l'exécution précédente.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
