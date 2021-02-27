#!/bin/bash
set -e

if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

echo "stop & remove old docker and starting new instance of [$HOST]"
(docker kill $HOST || :) && \
  (docker rm $HOST || :) && \
  docker run --name $HOST \
  -e POSTGRES_USER=$UNAME \
  -e POSTGRES_PASSWORD=$PWORD \
  -e PGPASSWORD=$PWORD \
  -p 5432:5432 \
  -d postgres

echo "wait for pg-server [$HOST] to start";
sleep 3;

echo "CREATE DATABASE $DBASE ENCODING 'UTF-8';" \
  "CREATE DATABASE ${DBASE}_test ENCODING 'UTF-8';" | docker exec -i $HOST psql -U $UNAME

echo "\l" | docker exec -i $HOST psql -U $UNAME
