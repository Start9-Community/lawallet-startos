# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `lawallet-nwc`.** Three containers: the upstream `web` image,
  the upstream `listener` image, and a `postgres` sidecar. Two volumes — `main`
  (app data at subpath `data`, plus `store.json` at the root) and `db`
  (PostgreSQL). One HTTP interface on 2288; the listener's 4100 is loopback only
  and deliberately not exported.
- **The two upstream images move in lockstep.** `masize/lawallet-nwc` and
  `masize/lawallet-nwc-listener` are tagged by the same release workflow — bump
  both or neither. See `UPDATING.md`.
- **The four secrets in `store.json` are write-once.** The PostgreSQL cluster is
  initialized with `postgresPassword`, sessions are signed with `jwtSecret`,
  server-custodied Nostr keys are encrypted under `keyVaultSecret`, and the web
  app and listener authenticate to each other with `listenerAuthSecret`.
  Regenerating any of them destroys data, so `main.ts` fails loudly on a missing
  secret rather than minting a replacement.
- **`db` is backed up with `withPgDump`, not rsync.** Copying a live PGDATA is
  not crash-consistent. If you add a volume, add it to `backups.ts` too —
  `withPgDump` starts from an empty volume list.
- **Secret charsets are comma-separated ranges.** `utils.getDefaultString({ charset: 'a-zA-Z0-9' })`
  throws at runtime; the grammar wants `'a-z,A-Z,0-9'`. This is a `tsc`-invisible
  failure that previously made the package impossible to install.

## Inspecting a running install

To run a command inside one of the service's containers (query the database, read
app logs), use `start-cli package attach lawallet-nwc -n <name> -- <cmd>`, where
`<name>` is `web-sub`, `listener-sub`, or `postgres-sub` — the names passed to
`SubContainer.of` in `main.ts`. Note: `-s/--subcontainer` matches the internal
**Guid**, not the name, so passing a name to `-s` fails with "no matching
subcontainers".
