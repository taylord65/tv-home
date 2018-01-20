cd lambda
zip -r getStreamsTVApp.zip *
aws lambda update-function-code --function-name getStreamsTVApp --region us-east-2 --zip-file fileb://getStreamsTVApp.zip