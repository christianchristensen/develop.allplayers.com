---
layout: default
title: Resources
---

# Resources API

API for accessing and modifying resources.

## Getting Resource Information

You can get the full information for a resource by calling its specific URI

<a id="/resources/{uuid}"></a>

    /resources/{uuid} [GET]

<pre class="terminal">
$ curl -b cjar http://www.allplayers.local:8080/api/v1/rest/resources/c412c73e-84cf-11e1-a209-da9f8ce3ca4d.json
{
  "uuid":"c412c73e-84cf-11e1-a209-da9f8ce3ca4d",
  "title":"linux",
  "location":{
    "lid":"29859",
    "street":"",
    "city":"Wheeling",
    "state":"IL",
    "zip":"60090",
    "country":"US",
    "latitude":"42.133521",
    "longitude":"-87.918771"
  },
  "groups":[
    "aea342ac-69ef-11e1-b865-300db1507b7a"
  ],
  "external_id":"",
  "availability":{
    "c3405524-84cf-11e1-a209-da9f8ce3ca4d":{
      "0":{
        "start":"2012-09-15T11:00:00",
        "end":"2012-09-15T12:00:00"
      },
      "1":{
        "start":"2012-10-17T00:00:00",
        "end":"2012-10-17T01:00:00"
      },
      "repeat_info":{
        "freq":"DAILY",
        "interval":"1",
        "bymonth":[
          "9",
          "10"
        ],
        "bymonthday":[
          "12",
          "15",
          "17"
        ],
        "byday":[
          "SU",
          "MO"
        ],
        "until":"2012-10-15T00:00:00",
        "exdate":[
          "2012-09-17T00:00:00"
        ],
        "rdate":[
          "2012-10-17T00:00:00"
        ]
      }
    }
  },
"uri":"http://www.allplayers.local:8080/api/v1/rest/resources/c412c73e-84cf-11e1-a209-da9f8ce3ca4d"
}

</pre>

Please examine the various [field defitions](fields.html) and the [AllPlayers WADL Documentation](https://www.allplayers.com/api/v1/rest/wadl/describe.xml) for further description of the data returned.

## Creating Resources

Let's take a look at how to create a resource

<a id="/resources"></a>
**Input**  

*  `title`\*
*  `location`\* [info](fields.html#/location)
*  `groups`\*
*  `availability` [info](fields.html#/availability)
*  `external_id`

\* Fields specified with an asterisk are required.  

    /resources [POST / PUT]

<pre class="terminal">
curl -b cjar http://www.allplayers.local:8080/api/v1/rest/resources.json -d"groups[0]=aea342ac-69ef-11e1-b865-300db1507b7a&title=linux&availability[0][start]=2012-09-15T11%3A00%3A00&availability[0][end]=2012-09-15T12%3A00%3A00&location[zip]=60090"
{
  "uuid":"7787e8b2-84d5-11e1-a209-da9f8ce3ca4d",
  "title":"linux",
  "location":{
    "lid":"29861",
    "street":"",
    "city":"Wheeling",
    "state":"IL",
    "zip":"60090",
    "country":"US",
    "latitude":"42.133521",
    "longitude":"-87.918771"
  },
  "groups":[
    "aea342ac-69ef-11e1-b865-300db1507b7a"
  ],
  "external_id":"",
  "availability":{
    "76c2e83c-84d5-11e1-a209-da9f8ce3ca4d":[
      {
        "start":"2012-09-15T11:00:00",
        "end":"2012-09-15T12:00:00"
      }
    ]
  },
  "uri":"http://www.allplayers.local:8080/api/v1/rest/resources/7787e8b2-84d5-11e1-a209-da9f8ce3ca4d"
}
</pre>
Please examine the various [field defitions](fields.html) and the [AllPlayers WADL Documentation](https://www.allplayers.com/api/v1/rest/wadl/describe.xml) for further description of the data returned. 

The parameters for updating resources are very similar, with the caveat that none of them are longer required.  
The PUT request to event works with only the data you pass in, and the rest is left alone.  There are however a few caveats to keep in mind:

*  If you wish to add a group that's authorized to use this resource, you must pass in the entire groups array.  The data is rebuilt as a whole.

*  If you wish to update an availability, you may send the full updated date_time information inside the availability's uuid. In the example above, should you choose to update the availability, you would send
`availability[76c2e83c-84d5-11e1-a209-da9f8ce3ca4d][start] = 2012-10-15T11:00:00`  
`availability[76c2e83c-84d5-11e1-a209-da9f8ce3ca4d][end] = 2012-10-15T12:00:00`  

*  If you wish to add a new availability to this resource, simply pass in 
`availability[0][start] = 2012-11-15T11:00:00`  
`availability[0][end] = 2012-11-15T12:00:00`  
and the additional availability will be added.

*  If you wish to delete a single availability simply send
`availability[76c2e83c-84d5-11e1-a209-da9f8ce3ca4d] = 0`

*  To delete all availabilities, send  
`availability[0] = 0`

