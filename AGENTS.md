# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Secret charsets are comma-separated ranges.** `utils.getDefaultString({ charset: 'a-zA-Z0-9' })` throws at runtime; the grammar wants `'a-z,A-Z,0-9'`. This is a `tsc`-invisible failure that previously made the package impossible to install.
- **The listener's port stays unexported.** It is loopback-only and authenticated with the shared secret; exporting it would publish a second authenticated path into the wallet.
