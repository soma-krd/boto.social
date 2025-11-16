#!/bin/bash

set -o xtrace

docker rmi localhost/boto || true
docker build --target dist -t localhost/boto -f Dockerfile.dev .
docker build --target devcontainer -t localhost/boto-devcontainer -f Dockerfile.dev .
