import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.0.0:1',
  releaseNotes: {
    en_US:
      'First community-registry release. Adds the NWC payment listener, encrypted storage for passkey accounts, and database-dump backups.',
    es_ES:
      'Primera versión para el registro comunitario. Añade el escucha de pagos NWC, almacenamiento cifrado para cuentas con passkey y copias de seguridad por volcado de la base de datos.',
    de_DE:
      'Erste Veröffentlichung für die Community-Registry. Ergänzt den NWC-Zahlungslauscher, verschlüsselte Speicherung für Passkey-Konten und Sicherungen per Datenbank-Dump.',
    pl_PL:
      'Pierwsze wydanie w rejestrze społecznościowym. Dodaje nasłuch płatności NWC, szyfrowane przechowywanie kont z passkey oraz kopie zapasowe w postaci zrzutu bazy danych.',
    fr_FR:
      'Première version pour le registre communautaire. Ajoute l’écouteur de paiements NWC, le stockage chiffré des comptes passkey et des sauvegardes par vidage de la base de données.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
