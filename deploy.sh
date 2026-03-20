#!/bin/bash
readonly env_file=${1:-".env.dev"}

docker compose -p jub --env-file "$env_file" -f jub.yml down
docker compose --profile staging -p jub --env-file "$env_file" -f jub.yml up --build -d 