# bulk-sms
Send bulk sms with twilio API, and simple UI to use the API. 

Developed using serverless framework https://serverless.com. Deploy to AWS lambda for usage. Requires Twilio account with Programmable SMS service set up.

# API
**to deploy**

- AWS Server manager / parameter store: set up 3 variables as stated in serverless.yml. Environment variable values requires Twilio account set up, requires Account Sid, Account Auth Token and Programmable SMS Service ID
- Locally store credentials file that contains access key/secret to deploy cloud formation templates (refer to serverless.com documentation)
- run serverless command `sls deploy -v`

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

# Webpage
**to deploy**
- Copy index.html into a s3 bucket
- Set up s3 to be static website and use cloudfront if needed, remember to set up bucket default page, and policy to allow public acess if not using cloudfront.

**to run**
Enter bucket public URL into any browser
