ARG IMAGE
FROM ${IMAGE}
ARG RUNAS
USER root
# Upstream's node slim base ships no system CA bundle, and Node's compiled-in roots go stale between releases.
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/* \
 && ! grep -q MIICTjCCAdOgAwIBAgIKPPYHqWhwDtqLhDAKBggqhkjOPQQDAzBr /etc/ssl/certs/ca-certificates.crt
ENV NODE_OPTIONS=--use-openssl-ca
USER ${RUNAS}
