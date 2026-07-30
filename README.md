<p align="center">
  <img src="icon.svg" alt="LaWallet NWC Logo" width="21%">
</p>

# LaWallet NWC on StartOS

> **Upstream docs:** <https://docs.lawallet.io>
>
> Everything not listed in this document should behave the same as upstream
> LaWallet NWC. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable.

StartOS service package for [LaWallet NWC](https://github.com/lawalletio/lawallet-nwc)
— an open-source Lightning Address platform with Nostr Wallet Connect (NIP-47).
The package runs the upstream web app and the upstream NWC payment listener
against a bundled PostgreSQL database; no external services are required.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Image ID   | Image                            | Command                                          |
| ---------- | -------------------------------- | ------------------------------------------------ |
| `web`      | `masize/lawallet-nwc`            | Image entrypoint                                 |
| `listener` | `masize/lawallet-nwc-listener`   | Image entrypoint                                 |
| `postgres` | `postgres:15-alpine`             | Image entrypoint, `-c listen_addresses=127.0.0.1` |

Architectures: `x86_64`, `aarch64`. The `web` and `listener` images are the
multi-arch images published by lawallet-nwc CI, unmodified. All three run their
own entrypoints; only the PostgreSQL listen address is overridden.

The `web` image runs as its built-in unprivileged user (`nextjs`), so a oneshot
takes ownership of the mounted data directory before the daemon starts.

---

## Volume and Data Layout

| Volume | Subpath      | Mount point           | Purpose                                       |
| ------ | ------------ | --------------------- | --------------------------------------------- |
| `main` | `data`       | `/app/data`           | Cached Nostr profiles and uploaded branding   |
| `main` | `store.json` | not mounted           | Package-generated secrets                     |
| `db`   | —            | `/var/lib/postgresql` | PostgreSQL data directory                     |

`store.json` sits at the root of the `main` volume, outside the subpath the web
container sees, so the application never has access to it.

---

## Installation and First-Run Flow

1. On **install**, the package generates four secrets and persists them to
   `store.json`: the PostgreSQL password, the JWT signing secret, the key-vault
   secret that encrypts server-custodied Nostr keys, and the shared secret the
   web app and listener authenticate to each other with. They are written once
   and thereafter only read — regenerating any of them would break existing
   data.
2. On **start**, PostgreSQL comes up on loopback, the web app runs
   `prisma migrate deploy` and starts, then the payment listener connects.
3. There is no admin password. The operator claims the **root admin** role by
   signing in with a Nostr key through the Web UI. Until someone does, the
   instance has no administrator.

---

## Configuration Management

There is no StartOS config form. The runtime environment is derived entirely
from the generated secrets and the package's own port constants.

| StartOS-Managed                                                                | Upstream-Managed                                                               |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Database connection, secrets, ports, listen addresses, web↔listener pairing    | Domain, lightning addresses, remote wallets, cards, branding, SMTP, NWC services |

Environment variables the package sets:

| Variable               | Container  | Value                                            |
| ---------------------- | ---------- | ------------------------------------------------ |
| `DATABASE_URL`         | both       | Loopback connection to the bundled PostgreSQL    |
| `JWT_SECRET`           | `web`      | Generated on install                             |
| `KEY_VAULT_SECRET`     | `web`      | Generated on install                             |
| `LISTENER_URL`         | `web`      | Loopback URL of the listener                     |
| `LISTENER_AUTH_SECRET` | both       | Generated on install                             |
| `WEB_ORIGIN`           | `listener` | Loopback URL of the web app                      |
| `LISTENER_PORT`        | `listener` | Listener HTTP port                               |
| `PORT` / `HOSTNAME`    | `web`      | Web port, bound to all interfaces                |
| `NODE_ENV`             | both       | `production`                                     |

Upstream settings stored in the database — including the NWC Services entries —
override the corresponding environment values, as upstream documents.

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose                                              |
| --------- | ---- | -------- | ---------------------------------------------------- |
| Web UI    | 2288 | HTTP     | Admin dashboard, user wallet, public LUD-16 / NIP-05 |

**Access methods:**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

PostgreSQL and the payment listener bind loopback only and are not exported as
interfaces.

---

## Actions (StartOS UI)

None.

---

## Backups and Restore

**Included in backup:**

- `db` volume — dumped with `pg_dump` rather than copied, so the backup is
  taken from a consistent snapshot instead of a live data directory
- `main` volume — cached Nostr profiles, uploaded branding, and `store.json`

**Restore behavior:** volumes are restored, then the database is re-initialized
and the dump replayed, before the service starts. Because `store.json` is part
of the backup, the restored instance keeps its key-vault secret and can still
decrypt server-custodied Nostr keys.

---

## Health Checks

| Check            | Method                                     | Shown in UI |
| ---------------- | ------------------------------------------ | ----------- |
| PostgreSQL       | `pg_isready` on loopback                   | No          |
| Web Interface    | HTTP GET `/api/health` (60 s grace period) | Yes         |
| Payment Listener | HTTP GET `/health` (30 s grace period)     | Yes         |

---

## Dependencies

None.

---

## Limitations and Differences

1. **The key-vault secret is generated, not operator-supplied.** Upstream lets
   you set `KEY_VAULT_SECRET` yourself and rotate it through
   `KEY_VAULT_SECRET_PREVIOUS`. The package generates it on install and does not
   expose rotation.
2. **Alby subaccount integration is not wired.** Upstream's `ALBY_API_URL`,
   `ALBY_BEARER_TOKEN`, and `AUTO_GENERATE_ALBY_SUBACCOUNTS` are not set.
3. **Rate limiting is in-memory.** The package runs a single instance and does
   not configure Upstash Redis for distributed rate limiting.
4. **PostgreSQL is not reachable off-host.** Upstream's development Compose file
   publishes port 5432; this package binds it to loopback inside the service's
   own container namespace.
5. **The separate docs and OpenAPI containers are not packaged.** The API
   playground the web app serves itself is unaffected.
6. **Logging, listener tuning, and rate-limit environment variables use upstream
   defaults** and are not exposed for editing.

---

## What Is Unchanged from Upstream

The `web` and `listener` images are upstream's own published builds, run with
their own entrypoints. Everything the application does behaves as upstream
documents: the admin dashboard, the user wallet, BoltCard fleet management,
Lightning Address claiming and routing, the domain onboarding wizard, branding,
the NIP-05 / LUD-16 / LUD-21 endpoints, the REST API and its OpenAPI playground,
and every setting stored in the database.

---

## Contributing

See [AGENTS.md](AGENTS.md).

---

## Quick Reference for AI Consumers

```yaml
package_id: lawallet-nwc
images:
  web: masize/lawallet-nwc
  listener: masize/lawallet-nwc-listener
  postgres: postgres:15-alpine
architectures: [x86_64, aarch64]
volumes:
  main: /app/data # subpath `data`; store.json at the volume root, unmounted
  db: /var/lib/postgresql
ports:
  ui: 2288
  listener: 4100 # loopback only, not exported
health:
  web: GET http://127.0.0.1:2288/api/health
  listener: GET http://127.0.0.1:4100/health
  postgres: pg_isready
startos_managed_env_vars:
  - DATABASE_URL
  - JWT_SECRET
  - KEY_VAULT_SECRET
  - LISTENER_URL
  - LISTENER_AUTH_SECRET
  - LISTENER_PORT
  - WEB_ORIGIN
  - NODE_ENV
  - PORT
  - HOSTNAME
generated_secrets: # store.json, main volume
  - postgresPassword
  - jwtSecret
  - keyVaultSecret
  - listenerAuthSecret
first_run: claim root admin by signing in with a Nostr key
dependencies: none
actions: none
```
