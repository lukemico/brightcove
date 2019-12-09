5121028909001,


curl \
--include \
--header "Authorization: BC_TOKEN AEnTxThqow44Cu2POiu2eH4bNTg5UDYKKHF5eZRhswWB8t7_0h8h6qfwbyvGA4ecedR8LTNhbJpcjwe3POOULrTtXHpx61i-48C_wsbCOmGI6IA_toaPccU" \
--data {'name=AnalyticsClient&maximum_scope=[{
    "identity": {
      "type": "video-cloud-account",
      "account-id": 5859021222001
    },
    "operations": [
      "LIST_OF_OPERATIONS"[1]
    ]
}]}' \
https://oauth.brightcove.com/v4/client_credentials

curl \
--include \
--header "Authorization: BC_TOKEN YOUR_BC_TOKEN" \
--data {'name=YOUR_CREDENTIAL_NAME_GOES_HERE&maximum_scope=[{
    "identity": {
      "type": "video-cloud-account",
      "account-id": YOUR_ACCOUNT_ID
    },
    "operations": [
      "LIST_OF_OPERATIONS"[1]
    ]
}]}' \
https://oauth.brightcove.com/v4/client_credentials