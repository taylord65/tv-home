cd lambda
zip -r getStreamsTVApp.zip index.js
aws lambda update-function-code --function-name getStreamsTVApp --region us-east-2 --zip-file fileb://getStreamsTVApp.zip