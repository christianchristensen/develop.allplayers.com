---
layout: default
title: General API Information
---

# General API Information #

## Schema ##

All API access is over HTTP and starts with

    https://www.allplayers.com/api/v1/rest/*.:format

where `:format` is one of 'json', 'jsonp', 'xml' or 'yaml', specifying what the
response data should be formatted in.

A Web Application Description ([WADL](http://www.w3.org/Submission/wadl/)) for [AllPlayers.com](https://www.allplayers.com/api/v1/rest/wadl/describe.xml) can be found at

    https://www.allplayers.com/api/v1/rest/wadl/describe.xml

## Authentication ##

**Note** [OAuth](./oauth.html) is the preferred authentication method because tokens can be limited to specific types of data, and can be revoked by users at any time.


You can use HTTP Basic Auth `curl -u "email:password"` to authenticate as a AllPlayers.com user. Note that all requests that need authentication should include the Authentication header.  Unauthenticated requests will return 404 to prevent any sort of private information leakage.


    /users/login [POST]

<pre class="terminal">
$ curl -c cjar -d 'email=EMAIL&password=PASSWORD' \
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
    "uri": "https://www.allplayers.com/api/v1/rest/users/c871c01c-f368-11e0-855a-12313d0118c2",
    "nickname": "Chris",
    "uuid": "c871c01c-f368-11e0-855a-12313d0118c2",
    "username": "Chris Christensen",
    "gender": "male",
    "lastname": "Christensen",
    "profile_url": "https://www.allplayers.com/users/christianchristensen",
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

## Use of the ?offset addition ##

With groups, the offset is the number of groups from the beginning you want to start with.

An offset of 1 will give back groups 2 through a max of 11,
An offset of 2 will give back groups 3 through a max of 12,
and etc.

## JSON callbacks ##

If you send a `:format` of `.jsonp` a 'callback' variable to any call, it will wrap the result JSON in that function, so you can automatically execute it.

<pre class="terminal">
$ curl https://www.allplayers.com/api/v1/rest/groups/fb8544ba-f368-11e0-855a-12313d0118c2.jsonp?callback=myJsFunction
myJsFunction({
  "accept_amex": "Accept",
  "activity_level": "14",
  "uri": "https://www.allplayers.com/api/v1/rest/groups/fb8544ba-f368-11e0-855a-12313d0118c2",
  "location": {
    "city": "Irving",
    "latitude": "32.860409",
    "zip": "76039",
    "country": "us",
    "street": "600 E. Las Colinas Blvd.",
    "longitude": "-96.930037",
    "state": "TX"
  },
  "list_in_directory": "0",
  "title": "Dev pit badminton",
  "uuid": "fb8544ba-f368-11e0-855a-12313d0118c2",
  "url": "https://www.allplayers.com/g/dev-pit-badminton",
  "logo": "https://d2v81b0git4m95.cloudfront.net/sites/default/files/imagecache/profile_small/group_content_logo/logo1.png",
  "secondary_color": "4682B4",
  "node_status": "1",
  "primary_color": "CD5C5C",
  "approved_for_payment": "Approved",
  "description": "Badminton Devs",
  "group_mates_enabled": "Group Mates",
  "approved_for_idverify": "Not approved",
  "groups_above_uuid": [
    "fb870f84-f368-11e0-855a-12313d0118c2"
  ],
  "registration_fees_enabled": "Fee (Approval Required)",
  "active": "Active"
});
</pre>

## Secure Access ##

You can access any API call over HTTPS.

## Limitations ##

Currently we are limiting API calls to 60 per minute.  This may change
in the future, or possibly per user at some point, but if you try to
access the API more than 60 times in a minute, it will start giving
you "access denied" errors.

Additionally to protect form submissions there is a CAPTCHA mechanism
to allow connecting client apps to continue using the API when
requests are invalidated due to abuse.

Sequence:

1. Request to API
2. **406** Response Error "Invalid captcha..."
3. Request to API with headers: `X-ALLPLAYERS-CAPTCHA-TOKEN` / `X-ALLPLAYERS-CAPTCHA-SOLUTION`

<pre class="terminal">
$ curl -d "firstname=FirstName&lastname=LastName&email=usertest5@..." \
  https://www.allplayers.com/api/v1/rest/users.json
{
  "captcha_token": "5aa9809ebd17f57916110ef46af90b6c",
  "captcha_problem": "2 + 10 = ",
  "form_errors": "Invalid captcha, please validate by solving math problem and sending solution, you will need to add x-allplayers-catpcha-token and x-allplayers-captcha-solution to the headers."
}

$ curl -H "X-ALLPLAYERS-CAPTCHA-TOKEN: 5aa9809ebd17f57916110ef46af90b6c" \
  -H "X-ALLPLAYERS-CAPTCHA-SOLUTION: 12" \
  -d "firstname=FirstName&lastname=LastName&email=usertest5@..." \
  https://www.allplayers.com/api/v1/rest/users.json
{
  ...
  "nickname": "FirstName",
  "lastname": "LastName",
  ...
}
</pre>
