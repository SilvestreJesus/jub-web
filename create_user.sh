readonly username=${1:-"invitado"}
readonly password=${2:-"invitado"}
readonly secret=${3:-"ed448c7a5449e9603058ce630e26c9e3befb2b15e3692411c001e0b4256852d2"}

echo "Creating user with username: $username and password: $password"
echo "\n"
curl --request POST \
  --url http://localhost:10000/api/v4/users \
  --header 'Content-Type: application/json' \
  --data '{
  "username":"'"$username"'",
  "first_name":"'"$username"'",
  "last_name":"",
  "email":"'"$username"'@jub.mx", 
  "password":"'"$password"'",
  "profile":""
}'

echo "\n"
echo "Creating scope 'jub' and assigning it to user '$username'"
echo "\n"
curl --request POST \
  --url http://localhost:10000/api/v4/scopes/ \
  --header 'Content-Type: application/json' \
  --data '{
  "name":"jub"
}'

echo "\n"
echo "Assigning scope 'jub' to user '$username'"
echo "\n"
curl --request POST \
  --url http://localhost:10000/api/v4/scopes/assign \
  --header 'Content-Type: application/json' \
  --data '{
  "name":"jub",
  "username":"'"$username"'"
}'


echo "Creating license for user '$username' with scope 'jub'"
curl --request POST \
  --url http://localhost:10000/api/v4/licenses/ \
  --header 'Content-Type: application/json' \
  --header "Secret: $secret" \
  --data '{
  "username":"'"$username"'",
  "scope":"jub",
  "expires_in":"1y",
  "force":true
}'