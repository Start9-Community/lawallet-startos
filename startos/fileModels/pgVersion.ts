import { FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

/**
 * Probe for a Postgres data directory on the `main` volume.
 *
 * This package keeps Postgres on its own `db` volume. The sideload package at
 * lawalletio/lawallet-startos publishes the same `id: lawallet-nwc` with
 * Postgres on `main` under the `postgresql` subpath, so a server that has a
 * sideloaded install and this registry configured is offered this listing as an
 * ordinary in-place update. Nothing would move the cluster, and Postgres would
 * come up on an empty `db` volume.
 *
 * `PG_VERSION` is written by initdb and is present in every initialized
 * cluster, so finding it here means the install belongs to the other package.
 */
export const sideloadPgVersion = FileHelper.string({
  base: sdk.volumes.main,
  subpath: 'postgresql/PG_VERSION',
})
