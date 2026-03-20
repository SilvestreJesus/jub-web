#!/bin/bash

curl --request POST \
  --url http://localhost:5000/api/v2/code \
  --header 'Content-Type: multipart/form-data' \
  --form file=@obs_test.yml
  