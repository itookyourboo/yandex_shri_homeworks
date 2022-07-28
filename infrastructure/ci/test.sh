#!/usr/bin/env bash

RESULT=$(npm run test 2>&1 | tail -n +3)
echo "${RESULT}"

URL="https://api.tracker.yandex.net/v2/issues/_search"
VERSION=$(git tag --sort version:refname)
UNIQUE_TAG="[wignorbo] release ${VERSION}"

HEADER_OAUTH="Authorization: OAuth ${ACCESS_TOKEN}"
HEADER_ORG_ID="X-Org-ID: ${ORG_ID}"
HEADER_CONTENT_TYPE="Content-Type: application/json"

TICKET_URL=$(
  curl -s -X POST ${URL} \
  --header "${HEADER_OAUTH}" \
  --header "${HEADER_ORG_ID}" \
  --header "${HEADER_CONTENT_TYPE}" \
  --data '{
    "filter": {
      "unique": "'"${UNIQUE_TAG}"'"
      }
  }' | jq -r '.[].self'
)

echo "Ticket: ${TICKET_URL}"

COMMENT_URL=$(
  curl -s -X POST ${URL} \
  --header "${HEADER_OAUTH}" \
  --header "${HEADER_ORG_ID}" \
  --header "${HEADER_CONTENT_TYPE}" \
  --data '{
    "filter": {
      "unique": "'"${UNIQUE_TAG}"'"
    }
  }' | jq -r '.[].description'
)

COMMENT='{
  "description": "'"${COMMENT_URL}\nTests:\n${RESULT}"'"
}'

RESPONSE=$(
  curl -sS -X PATCH ${TICKET_URL} \
  --header "${HEADER_OAUTH}" \
  --header "${HEADER_ORG_ID}" \
  --header "${HEADER_CONTENT_TYPE}" \
  --data "${COMMENT}"
)

echo "Response: ${RESPONSE}"

if [ ${RESPONSE} = 200 ]; then
  echo "Published"
  exit 0
elif [ ${RESPONSE} = 401 ]; then
  echo "Auth Error"
  exit 1
elif [ ${RESPONSE} = 403 ]; then
  echo "Auth Error"
  exit 1
fi