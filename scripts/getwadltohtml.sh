
# Dependencies:
# *  [curl](http://curl.haxx.se/)
# *  [xsltproc](http://xmlsoft.org/XSLT/xsltproc2.html)
# *  [tidyp](http://www.tidyp.com/)
# Note: This is a utility script to pull WADL docs from AllPlayers.com and convert them to pretty HTML (especially useful for copying into the dev. documentation)

# Download WADL and Stylesheet (auth and non-auth)
curl -k https://www.allplayers.com/wadl.xsl -o wadl.xsl
curl -k https://www.allplayers.com/?q=api/v1/rest/wadl/describe.xml -o describe_nonauth.xml
curl -k -c cjar -d 'email=EMAIL&password=PASSWORD' https://www.allplayers.com/api/v1/rest/users/login.json
curl -k -b cjar https://www.allplayers.com/?q=api/v1/rest/wadl/describe.xml -o describe_auth.xml

# Convert the WADL XML to HTML
xsltproc wadl.xsl describe_nonauth.xml > describe_nonauth.html
xsltproc wadl.xsl describe_auth.xml > describe_auth.html

# Pretty print the HTML
tidy -imu describe_auth.html
tidy -imu describe_nonauth.html

# Cleanup temp files
rm wadl.xsl describe_nonauth.xml describe_auth.xml cjar # describe_nonauth.html describe_auth.html
