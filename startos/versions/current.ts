import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

const CHANGELOG =
  'https://github.com/lawalletio/lawallet-nwc/releases/tag/v2.7.0'

export const current = VersionInfo.of({
  version: '2.7.0:1',
  releaseNotes: {
    en_US: `Updates LaWallet NWC from 2.6.0 to 2.7.0.

Heads up: the Alby Hub sub-account integration is removed, and its settings are deleted on update. The legacy "subdomain" setting is folded into "domain"; a blank public endpoint now defaults to https://<domain>.

**Features**

- Zap receipts now settle for every NWC wallet, including ones that send no payment notifications
- Vouchers: a coupon stash compatible with the lacrypta/coupons protocol, with a deposit policy and sender allowlist
- First activation of a never-paired card binds a working wallet and reserves one free Lightning Address
- NWC wallets idle for more than 48 hours are archived automatically
- Wallet: keyboard input on the keypad, a shared payment receipt on send and receive, and mobile PWA sessions that stay logged in
- Admin: a Verify Protocols scan that finds stale alias chips

**Security**

- BoltCard write-token consumption is atomic, closing a window that could leak card keys
- Closed a pubkey-existence oracle on the user relays endpoint and stopped logging a bearer token in cleartext
- Sentry reports are scrubbed of event tags and bearer-token path segments
- Next.js updated to 16.3.4

**Fixes**

- Residual routing-reserve legs survive a receive-config edit; revoked and dead wallets are hidden from the forwarding map
- Webhook delivery times out DNS lookups and no longer overlaps inline retries
- Stale RECEIVE mode no longer blocks card spends permanently

Full changelog: ${CHANGELOG}`,
    es_ES: `Actualiza LaWallet NWC de 2.6.0 a 2.7.0.

Atención: se elimina la integración de subcuentas de Alby Hub y sus ajustes se borran al actualizar. El ajuste heredado "subdomain" se integra en "domain"; un endpoint público vacío ahora toma por defecto https://<domain>.

**Novedades**

- Los recibos de zaps ahora se liquidan con cualquier monedero NWC, incluso los que no envían notificaciones de pago
- Vales: un depósito de cupones compatible con el protocolo lacrypta/coupons, con política de depósito y lista de remitentes permitidos
- La primera activación de una tarjeta nunca emparejada vincula un monedero operativo y reserva una Lightning Address gratuita
- Los monederos NWC inactivos más de 48 horas se archivan automáticamente
- Monedero: entrada por teclado en el teclado numérico, un recibo de pago compartido al enviar y recibir, y sesiones PWA móviles que permanecen iniciadas
- Administración: un análisis Verify Protocols que detecta alias obsoletos

**Seguridad**

- El consumo del token de escritura de BoltCard es atómico, cerrando una ventana que podía filtrar claves de tarjeta
- Cerrado un oráculo de existencia de pubkey en el endpoint de relés del usuario y eliminado el registro en claro de un token bearer
- Los informes de Sentry se limpian de etiquetas de eventos y segmentos de ruta con tokens bearer
- Next.js actualizado a 16.3.4

**Correcciones**

- Los tramos residuales de reserva de enrutamiento sobreviven a la edición de la configuración de cobro; los monederos revocados o muertos se ocultan del mapa de reenvío
- La entrega de webhooks aplica tiempo de espera a las consultas DNS y ya no se solapa con los reintentos en línea
- Un modo RECEIVE obsoleto ya no bloquea permanentemente los gastos con tarjeta

Registro de cambios completo: ${CHANGELOG}`,
    de_DE: `Aktualisiert LaWallet NWC von 2.6.0 auf 2.7.0.

Achtung: Die Alby-Hub-Unterkonto-Integration wurde entfernt, ihre Einstellungen werden beim Update gelöscht. Die veraltete Einstellung „subdomain“ geht in „domain“ auf; ein leerer öffentlicher Endpunkt lautet jetzt standardmäßig https://<domain>.

**Funktionen**

- Zap-Belege werden jetzt für jede NWC-Wallet abgewickelt, auch für solche ohne Zahlungsbenachrichtigungen
- Gutscheine: ein Coupon-Depot, kompatibel mit dem lacrypta/coupons-Protokoll, mit Einzahlungsregel und Absender-Freigabeliste
- Die erste Aktivierung einer nie gekoppelten Karte bindet eine funktionierende Wallet und reserviert eine kostenlose Lightning-Adresse
- NWC-Wallets, die länger als 48 Stunden inaktiv sind, werden automatisch archiviert
- Wallet: Tastatureingabe auf dem Ziffernblock, ein gemeinsamer Zahlungsbeleg beim Senden und Empfangen sowie mobile PWA-Sitzungen, die angemeldet bleiben
- Admin: ein Verify-Protocols-Scan, der veraltete Alias-Chips findet

**Sicherheit**

- Der Verbrauch des BoltCard-Schreibtokens ist atomar; das schließt ein Zeitfenster, in dem Kartenschlüssel abfließen konnten
- Ein Pubkey-Existenz-Orakel am Relays-Endpunkt des Nutzers geschlossen und die Klartext-Protokollierung eines Bearer-Tokens beendet
- Sentry-Berichte werden um Event-Tags und Bearer-Token-Pfadsegmente bereinigt
- Next.js auf 16.3.4 aktualisiert

**Korrekturen**

- Verbleibende Routing-Reserve-Teilstrecken überstehen das Bearbeiten der Empfangskonfiguration; widerrufene und tote Wallets werden in der Weiterleitungskarte ausgeblendet
- Die Webhook-Zustellung begrenzt DNS-Abfragen zeitlich und überschneidet sich nicht mehr mit Inline-Wiederholungen
- Ein veralteter RECEIVE-Modus blockiert Kartenzahlungen nicht mehr dauerhaft

Vollständiges Änderungsprotokoll: ${CHANGELOG}`,
    pl_PL: `Aktualizuje LaWallet NWC z 2.6.0 do 2.7.0.

Uwaga: integracja subkont Alby Hub została usunięta, a jej ustawienia są kasowane przy aktualizacji. Stare ustawienie „subdomain” zostaje scalone z „domain”; pusty publiczny endpoint domyślnie przyjmuje teraz https://<domain>.

**Nowości**

- Pokwitowania zapów rozliczają się teraz dla każdego portfela NWC, także tych, które nie wysyłają powiadomień o płatności
- Vouchery: skarbonka kuponów zgodna z protokołem lacrypta/coupons, z polityką wpłat i listą dozwolonych nadawców
- Pierwsza aktywacja nigdy niesparowanej karty wiąże działający portfel i rezerwuje jeden darmowy adres Lightning
- Portfele NWC bezczynne ponad 48 godzin są archiwizowane automatycznie
- Portfel: wprowadzanie z klawiatury na klawiaturze numerycznej, wspólne pokwitowanie płatności przy wysyłaniu i odbieraniu oraz mobilne sesje PWA, które pozostają zalogowane
- Administracja: skan Verify Protocols wykrywający nieaktualne aliasy

**Bezpieczeństwo**

- Zużycie tokenu zapisu BoltCard jest atomowe, co zamyka okno, w którym mogły wyciec klucze karty
- Zamknięto wyrocznię istnienia pubkey na endpoincie przekaźników użytkownika i zaprzestano logowania tokenu bearer w postaci jawnej
- Raporty Sentry są oczyszczane z tagów zdarzeń i segmentów ścieżek z tokenami bearer
- Next.js zaktualizowany do 16.3.4

**Poprawki**

- Pozostałe odcinki rezerwy routingu przetrwają edycję konfiguracji odbioru; odwołane i martwe portfele są ukrywane na mapie przekazywania
- Dostarczanie webhooków ma limit czasu na zapytania DNS i nie nakłada się już na ponowienia inline
- Nieaktualny tryb RECEIVE nie blokuje już na stałe płatności kartą

Pełna lista zmian: ${CHANGELOG}`,
    fr_FR: `Met à jour LaWallet NWC de 2.6.0 vers 2.7.0.

Attention : l'intégration des sous-comptes Alby Hub est supprimée et ses réglages sont effacés à la mise à jour. L'ancien réglage « subdomain » est fusionné dans « domain » ; un point de terminaison public vide vaut désormais https://<domain> par défaut.

**Fonctionnalités**

- Les reçus de zaps se règlent désormais pour tout portefeuille NWC, y compris ceux qui n'envoient aucune notification de paiement
- Bons : une réserve de coupons compatible avec le protocole lacrypta/coupons, avec politique de dépôt et liste d'expéditeurs autorisés
- La première activation d'une carte jamais appairée lie un portefeuille opérationnel et réserve une adresse Lightning gratuite
- Les portefeuilles NWC inactifs depuis plus de 48 heures sont archivés automatiquement
- Portefeuille : saisie au clavier sur le pavé numérique, un reçu de paiement commun à l'envoi et à la réception, et des sessions PWA mobiles qui restent connectées
- Administration : une analyse Verify Protocols qui repère les alias obsolètes

**Sécurité**

- La consommation du jeton d'écriture BoltCard est atomique, ce qui ferme une fenêtre pouvant divulguer des clés de carte
- Fermeture d'un oracle d'existence de pubkey sur le point de terminaison des relais utilisateur et fin de la journalisation en clair d'un jeton bearer
- Les rapports Sentry sont expurgés des tags d'événements et des segments de chemin contenant des jetons bearer
- Next.js mis à jour en 16.3.4

**Correctifs**

- Les tronçons résiduels de réserve de routage survivent à la modification de la configuration de réception ; les portefeuilles révoqués ou morts sont masqués de la carte de transfert
- La livraison des webhooks limite la durée des résolutions DNS et ne chevauche plus les nouvelles tentatives en ligne
- Un mode RECEIVE obsolète ne bloque plus définitivement les dépenses par carte

Journal des modifications complet : ${CHANGELOG}`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
