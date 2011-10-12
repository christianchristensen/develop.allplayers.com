---
layout: default
title: General API Information
---

# General API Information #

## Schema ##

All API access is over HTTP and starts with

    https://www.allplayers.com/api/v1/rest/*.:format

where `:format` is one of 'json', 'xml' or 'yaml', specifying what the
response data should be formatted in.

A Web Application Description ([WADL](http://www.w3.org/Submission/wadl/)) for [AllPlayers.com](https://www.allplayers.com/api/v1/rest/wadl/describe.xml) can be found at

    https://www.allplayers.com/api/v1/rest/wadl/describe.xml

## Authentication ##

You can use HTTP Basic Auth to authenticate as a AllPlayers.com user. Note that all requests that need authentication should include the Authentication header.  Unauthenticated requests will return 404 to prevent any sort of private information leakage.


    /users/login [POST]

<pre class="terminal">
$ curl -c cjar -d 'username=USERNAME&password=PASSWORD' \
https://www.allplayers.com/api/v1/rest/users/login.json
{
  "session_name": "SESSac971aed20589e9c28ae3ae5e510ef9c",
  "sessid": "4841f7aaba8b65a19a42012d48d2e3b6",
  "user": {
    "address": {
      "city": "Irving",
      "country": "us",
      "postal_code": "75039",
      "street": "600 E. Las Colinas Blvd., Ste. 1525",
      "state": "TX"
    },
    "uri": "https://www.pdup.allplayers.com/api/v1/rest/users/c871c01c-f368-11e0-855a-12313d0118c2",
    "nickname": "Chris",
    "uuid": "c871c01c-f368-11e0-855a-12313d0118c2",
    "username": "Chris Christensen",
    "gender": "male",
    "lastname": "Christensen",
    "profile_url": "https://www.pdup.allplayers.com/users/christianchristensen",
    "phone": {
      "phone": "2142349770"
    },
    "firstname": "Chris",
    "emergency_contact": {
      "emergency_address": {
        "city": "",
        "country": "us",
        "postal_code": "",
        "street": "",
        "state": ""
      }
    },
    "picture": "sites/default/files/pictures/picture-10055.jpg",
    "email": "chris@example.com"
  }
}
</pre>
<br /> <!-- HACK -->
#### Note:
*  Subsequent requests should use the cookie/session information or with `curl -b cjar` option and the `cjar` file


## Universally unique identifiers ##

AllPlayers.com uses [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier) to uniquely identify all objects in the system. Referencing `{uuid}` in documentation is a placeholder for the 32 digit identifier (e.g. `550e8400-e29b-41d4-a716-446655440000`).

## Secure Access ##

You can access any API call over HTTPS.

## Limitations ##

Currently we are limiting API calls to 60 per minute.  This may change
in the future, or possibly per user at some point, but if you try to
access the API more than 60 times in a minute, it will start giving
you "access denied" errors.

Additionally to protect form submissions there is a CAPTCHA mechanism to allow connecting client apps to continue using the API when requests are invalidated due to abuse protection.
