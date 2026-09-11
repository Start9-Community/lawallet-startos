# Updating the upstream version

This package wraps [lawalletio/lawallet-nwc](https://github.com/lawalletio/lawallet-nwc),
which publishes two multi-arch images per release: `masize/lawallet-nwc`
(the web app) and `masize/lawallet-nwc-listener` (the NWC payment listener).
They are built and tagged together by the same workflow, so they always move as
a pair — never pin them to different versions.

## Determining the upstream version

- **lawallet-nwc** ([lawalletio/lawallet-nwc](https://github.com/lawalletio/lawallet-nwc)) — fetch the latest release tag:

  ```sh
  gh release view -R lawalletio/lawallet-nwc --json tagName -q .tagName
  ```

  The current pins live in `startos/manifest/index.ts` at
  `images.web.source.dockerTag` and `images.listener.source.dockerTag`.

## Applying the bump

1. Bump both `dockerTag` values in `startos/manifest/index.ts` to the new
   version (drop the leading `v` from the release tag).
2. Set `version` in `startos/versions/current.ts` to `<new version>:1` and
   rewrite `releaseNotes` for all five locales.

   The revision starts at **`:1`**, not `:0`. The sideload package at
   [lawalletio/lawallet-startos](https://github.com/lawalletio/lawallet-startos)
   publishes the same `id: lawallet-nwc` and takes `:0` for every version, so
   starting here at `:1` keeps the two registries from minting the same
   `version:revision` for different packages.

   Write the notes for the person deciding whether to take the update: what
   changed upstream and anything that behaves differently afterwards, with a
   link to the full changelog. Packaging internals belong in the PR
   description, not here.
3. Check the release's changelog for new or renamed environment variables. The
   package sets its own environment in `startos/main.ts`; upstream adding a
   required variable is the one kind of bump that needs a code change. The
   authoritative lists are `apps/web/lib/config/env.ts` and
   `apps/listener/src/env.ts`, and `docker-compose.hub.yml` shows what a
   published-image deployment is expected to set.
