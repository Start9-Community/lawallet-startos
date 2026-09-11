import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { sideloadPgVersion } from '../fileModels/pgVersion'

const CHANGELOG =
  'https://github.com/lawalletio/lawallet-nwc/releases/tag/v2.6.0'

export const current = VersionInfo.of({
  version: '2.6.0:1',
  releaseNotes: {
    en_US: `Updates LaWallet NWC from 2.0.0 to 2.6.0.

Heads up: the DEFAULT_NWC address mode was removed in 2.3.0. An address now names its wallet explicitly instead of inheriting whichever wallet your primary address pointed at. Check that each address is bound to the wallet you expect after updating.

New since 2.0.0:
- Receive forwarding: an NWC wallet can forward everything it receives to one or more Lightning Addresses, split by weight, with per-leg fee and routing-reserve accounting (2.3.0), and recovery for payments left stranded mid-forward (2.5.0)
- NIP-57 zap receipts and LUD-21 payment verification for wallet-backed invoices, plus per-wallet notifications (2.3.0)
- A protocol capability view showing which of LUD-16, NIP-05, LUD-21, NIP-57 and LUD-12 each address actually speaks (2.3.0)
- MASTER account-recovery cards, which follow the account rather than the physical card (2.2.0)
- Deferred Lightning Address proxy settlement and a full-screen claim flow (2.1.0)
- Security hardening across rate limiting, JWT sessions, settings secrets and webhook intake, plus optional Sentry monitoring (2.4.0)

Full changelog: ${CHANGELOG}`,
    es_ES: `Actualiza LaWallet NWC de 2.0.0 a 2.6.0.

Atención: el modo de dirección DEFAULT_NWC se eliminó en 2.3.0. Ahora cada dirección indica explícitamente su monedero en lugar de heredar el de la dirección principal. Comprueba que cada dirección quede vinculada al monedero que esperas después de actualizar.

Novedades desde 2.0.0:
- Reenvío de cobros: un monedero NWC puede reenviar todo lo que recibe a una o varias Lightning Address, repartido por peso, con contabilidad de comisiones y reserva de enrutamiento por tramo (2.3.0), y recuperación de pagos que quedaron a medio reenviar (2.5.0)
- Recibos de zaps NIP-57 y verificación de pagos LUD-21 para facturas respaldadas por monedero, además de notificaciones por monedero (2.3.0)
- Una vista de capacidades de protocolo que muestra cuáles de LUD-16, NIP-05, LUD-21, NIP-57 y LUD-12 habla cada dirección (2.3.0)
- Tarjetas MASTER de recuperación de cuenta, que siguen a la cuenta y no a la tarjeta física (2.2.0)
- Liquidación diferida del proxy de Lightning Address y un flujo de reclamo a pantalla completa (2.1.0)
- Refuerzo de seguridad en límites de tasa, sesiones JWT, secretos de configuración y recepción de webhooks, además de monitorización opcional con Sentry (2.4.0)

Registro de cambios completo: ${CHANGELOG}`,
    de_DE: `Aktualisiert LaWallet NWC von 2.0.0 auf 2.6.0.

Achtung: Der Adressmodus DEFAULT_NWC wurde in 2.3.0 entfernt. Eine Adresse benennt ihre Wallet jetzt ausdrücklich, statt die der primären Adresse zu übernehmen. Prüfe nach dem Update, ob jede Adresse mit der erwarteten Wallet verknüpft ist.

Neu seit 2.0.0:
- Weiterleitung von Eingängen: Eine NWC-Wallet kann alles Empfangene an eine oder mehrere Lightning-Adressen weiterleiten, gewichtet aufgeteilt, mit Abrechnung von Gebühren und Routing-Reserve pro Teilstrecke (2.3.0), sowie Wiederherstellung für mitten in der Weiterleitung hängen gebliebene Zahlungen (2.5.0)
- NIP-57-Zap-Belege und LUD-21-Zahlungsprüfung für Wallet-gedeckte Rechnungen, dazu Benachrichtigungen pro Wallet (2.3.0)
- Eine Protokollübersicht, die zeigt, welche von LUD-16, NIP-05, LUD-21, NIP-57 und LUD-12 jede Adresse tatsächlich beherrscht (2.3.0)
- MASTER-Karten zur Kontowiederherstellung, die dem Konto statt der physischen Karte folgen (2.2.0)
- Aufgeschobene Abwicklung des Lightning-Adress-Proxys und ein Vollbild-Einlöseablauf (2.1.0)
- Sicherheitshärtung bei Rate-Limits, JWT-Sitzungen, Einstellungsgeheimnissen und Webhook-Annahme, dazu optionales Sentry-Monitoring (2.4.0)

Vollständiges Änderungsprotokoll: ${CHANGELOG}`,
    pl_PL: `Aktualizuje LaWallet NWC z 2.0.0 do 2.6.0.

Uwaga: tryb adresu DEFAULT_NWC został usunięty w 2.3.0. Adres wskazuje teraz swój portfel wprost, zamiast dziedziczyć portfel adresu głównego. Po aktualizacji sprawdź, czy każdy adres jest powiązany z oczekiwanym portfelem.

Nowości od 2.0.0:
- Przekazywanie wpłat: portfel NWC może przekazywać wszystko, co otrzyma, na jeden lub więcej adresów Lightning, dzieląc według wag, z rozliczeniem opłat i rezerwy routingu dla każdego odcinka (2.3.0), oraz odzyskiwanie płatności zawieszonych w trakcie przekazywania (2.5.0)
- Pokwitowania zapów NIP-57 i weryfikacja płatności LUD-21 dla faktur obsługiwanych portfelem, a także powiadomienia dla każdego portfela (2.3.0)
- Widok możliwości protokołów pokazujący, które z LUD-16, NIP-05, LUD-21, NIP-57 i LUD-12 obsługuje dany adres (2.3.0)
- Karty MASTER do odzyskiwania konta, przypisane do konta, a nie do fizycznej karty (2.2.0)
- Odroczone rozliczenie proxy adresu Lightning i pełnoekranowy proces odbioru (2.1.0)
- Wzmocnienie bezpieczeństwa w limitach zapytań, sesjach JWT, sekretach ustawień i przyjmowaniu webhooków, plus opcjonalny monitoring Sentry (2.4.0)

Pełna lista zmian: ${CHANGELOG}`,
    fr_FR: `Met à jour LaWallet NWC de 2.0.0 vers 2.6.0.

Attention : le mode d'adresse DEFAULT_NWC a été supprimé en 2.3.0. Une adresse désigne désormais explicitement son portefeuille au lieu d'hériter de celui de l'adresse principale. Après la mise à jour, vérifiez que chaque adresse est liée au portefeuille attendu.

Nouveautés depuis 2.0.0 :
- Transfert des encaissements : un portefeuille NWC peut transférer tout ce qu'il reçoit vers une ou plusieurs adresses Lightning, réparti par poids, avec comptabilité des frais et de la réserve de routage par tronçon (2.3.0), et récupération des paiements bloqués en cours de transfert (2.5.0)
- Reçus de zaps NIP-57 et vérification de paiement LUD-21 pour les factures adossées à un portefeuille, ainsi que des notifications par portefeuille (2.3.0)
- Une vue des capacités de protocole indiquant lesquelles de LUD-16, NIP-05, LUD-21, NIP-57 et LUD-12 chaque adresse parle réellement (2.3.0)
- Cartes MASTER de récupération de compte, rattachées au compte plutôt qu'à la carte physique (2.2.0)
- Règlement différé du proxy d'adresse Lightning et un parcours de réclamation en plein écran (2.1.0)
- Renforcement de la sécurité sur les limites de débit, les sessions JWT, les secrets de configuration et la réception des webhooks, plus une surveillance Sentry optionnelle (2.4.0)

Journal des modifications complet : ${CHANGELOG}`,
  },
  migrations: {
    /**
     * Refuse the update when the data belongs to the sideload package.
     *
     * Both packages publish `id: lawallet-nwc`. This one keeps Postgres on the
     * `db` volume; lawalletio/lawallet-startos keeps it on `main` under
     * `postgresql`. With `other: []` StartOS offers this version to a
     * sideloaded install as a normal update, and an empty `up` would let
     * Postgres start on an empty `db` volume with the real cluster still
     * sitting on `main`.
     *
     * Only a positive detection blocks: if the probe itself fails we let the
     * update through rather than break every legitimate one on a read error.
     */
    up: async () => {
      let strayCluster: string | null = null
      try {
        // A one-shot read: this is a probe, not a value the service tracks.
        strayCluster = await sideloadPgVersion.read().once()
      } catch {
        return
      }
      if (strayCluster === null) return
      throw new Error(
        'This install has a PostgreSQL cluster on the `main` volume, which means it came from the sideload package at lawalletio/lawallet-startos. That package stores its database where this one does not, so updating in place would start an empty database and leave your data unreachable. Keep using the sideload package (its own releases update in place), or back up, uninstall, and reinstall from this registry to migrate deliberately.',
      )
    },
    down: IMPOSSIBLE,
  },
})
