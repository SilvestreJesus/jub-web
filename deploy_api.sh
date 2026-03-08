#!/bin/bash
readonly env_file=${1:-".env.dev"}
docker compose -p jub --env-file "$env_file" -f jub.yml down
docker compose -p jub --env-file "$env_file" -f jub.yml up -d jub jub-db

docker compose -p jub --env-file "$env_file" -f xolo.yml down
docker compose -p jub --env-file "$env_file" -f xolo.yml up -d
