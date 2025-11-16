#!/usr/bin/env bash

docker kill boto || true 
docker rm boto || true 
docker create --name boto -p 3000:3000 -p 4200:4200 localhost/boto
