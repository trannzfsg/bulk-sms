# bulk-sms
Send bulk sms with twilio API

**requires**

- AWS Server manager / parameter store: set up 3 variables as stated in serverless.yml
- Locally store credentials file that contains access key/secret to deploy cloud formation templates (refer to serverless.com documentation)

**to deploy**

sls deploy -v

**to run**

Using postman to post to API gate way URL (get domain name from API gateway). 

Example:

curl -X POST \
  https://{uniq-api-gateway-id}.execute-api.ap-southeast-2.amazonaws.com/dev/sendsms \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: bd76f8b8-3d49-e472-5f2d-316d1f8946a2' \
  -d '{
	"message":"test",
	"numbers":"+64211234567,+64217654321"
}'
