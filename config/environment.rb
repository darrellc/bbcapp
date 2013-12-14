# Load the rails application
require File.expand_path('../application', __FILE__)
require 'google/api_client'
require 'launchy'
# Initialize the rails application
Myapp::Application.initialize!

CLIENT_ID = "715145715672-kuikm4rdn9pliv5dlv0dhplq24n5tdr4.apps.googleusercontent.com"
CLIENT_SECRET = "4Me34tDEpaXlzi5-MSKd937U"
OAUTH_SCOPE = "https://www.googleapis.com/auth/drive"
REDIRECT_URI = "urn:ietf:wg:oauth:2.0:oob"


#Load the Google Drive API
$client = Google::APIClient.newe
$drive = client.discovered_api('drive','v2')

#request authorization
$client.authorization.client_id = CLIENT_ID
$client.authorization.client_secret = CLIENT_SECRET
$client.authorization.scope = OAUTH_SCOPE
$client.authorization.redirect_uri = REDIRECT_URI

uri = client.authorization.authorization_uri
Launchy.open(uri)


