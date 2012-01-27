---
layout: default
title: Messages
---

# Messages API

API for accessing and modifying messages.

## Getting Message and Thread Information

You can get the message information by listing all message or by specific box name (list, inbox, or sent).

If no box name is passed, the response defaults to list (all messages)
<a id="/messages"></a>

    /messages?box={inbox} [GET]

<pre class="terminal">
$ curl -b cjar https://www.allplayers.com/api/v1/rest/messages.json?box=inbox
{
  37509: {
    thread_id: "37508",
    subject: "Hello",
    last_updated: "1320853797",
    is_new: "2",
    message_count: "1",
    last_message_sender: "Maksim Pecherskiy",
    last_message_sender_uuid: "90967468-f61e-11e0-98df-12313d18191a",
    last_message_body: "Hello Friend, how are you?",
    uri: "https://www.allplayers.com/api/v1/rest/messages/37508"
  },
  37509: {
    thread_id: "37509",
    subject: "Hello World",
    last_updated: "1320853798",
    is_new: "2",
    message_count: "1",
    last_message_sender: "Roberto Rodriguez",
    last_message_sender_uuid: "90937468-f61e-11e0-98df-12313d18191a",
    last_message_body: "Hope all is going well for you",
    uri: "https://www.allplayers.com/api/v1/rest/messages/37509"
  }
}
</pre>

You can retrieve a specific message by sending a [GET] request to one of the URIs returned in the above response.

It's important to note that the first message in a given thread will have the same ID as the thread itself.  Therefore, it's important to distinguish in your requests as to whether you're trying to act upon a message or a thread.  This can be done with the type parameter.  By default, the system will default to type=thread, but you can override by passing type=msg

You can retrieve a thread by passing a thread id with no parameters

    /messages/37509 [GET]

<pre class="terminal">
curl -b cjar http://www.allplayers.com/api/v1/rest/messages/37509.json

{
	"37509":{
		"mid":"37509",
		"subject":"Hello World",
		"body":"Whatcha up to?",
		"timestamp":"1320853798",
		"is_new":"1",
		"sender":"Maksim Pecherskiy",
		"sender_uuid":"90967468-f61e-11e0-98df-12313d18191a",
		"uri":"http:\/\/www.allplayers.com\/api\/v1\/rest\/messages\/37509?type=msg"
	}
	"37511":{
		"mid":"37511",
		"subject":"Hello World",
		"body":"Hope all is going well for you",
		"timestamp":"1320854798",
		"is_new":"1",
		"sender":"Roberto Gonzales",
		"sender_uuid":"90937468-f61e-11e0-98df-12313d18191a",
		"uri":"http:\/\/www.allplayers.com\/api\/v1\/rest\/messages\/37509?type=msg"
	}
}
</pre>

Or a specific message by passing type=msg parameter

	/messages/37509?type=msg [GET]

<pre class="terminal">
curl -b cjar http://www.allplayers.com/api/v1/rest/messages/37509.json?type=msg

{
	"mid":"37509",
	"subject":"Hello World",
	"body":"Whatcha up to?",
	"timestamp":"1320853798",
	"is_new":"1",
	"thread_id":"37509",
	"sender":"Maksim Pecherskiy",
	"sender_uuid":"90818850-f61e-11e0-98df-12313d18191a"
}
</pre>


##Updating Messages Status

You can update a message's or a thread's read status by sending a PUT request to the specific message or thread id.  However it is important to note that the type parameter is passed in the body of the request this time instead of path

* `status` *Is the message new or not.  (1 = new, 0 = read)*
* `type` *thread or msg*

	/messages/37509 [PUT]


##Deleting Messages

You can delete a message by sending a DELETE request to the message or thread path with a path parameter of type. If no type is passed, the system will default to deleting a whole thread.

	/messages/37509?type=msg [DELETE]

##Creating Messages

You can create a new thread or reply to a message in a thread by sending a POST request.

	/messages [POST]

The system will take the body you send in the request and behave accordingly, deciding whether to reply to a message in a thread, or to create a new one.  

If you send:

* `recipients` *an array of message recipient uuids*
* `subject` 
* `body`

The system will know that you would like to create a new message.  

<pre class="terminal">
curl -b cjar -d 'recipients[0]=90967468-f61e-11e0-98df-12313d18191a&subject=test&body=one' \http://www.allplayers.com/api/v1/rest/messages.json
{
	"subject":"test",
	"body":"one",
	"recipients":{
		"1":"Maksim Pecherskiy"
	},
	"timestamp":1321989498,
	"mid":"37533",
	"thread_id":"37533"
}
</pre>


However, sending:

* `thread_id`
* `body`

Will reply to a message in a given thread id:

<pre class="terminal">
curl -b cjar -d 'thread_id=37509&body=one two three' \http://www.allplayers.com/api/v1/rest/messages.json

{
	"body":"one two three",
	"timestamp":1321990032,
	"thread_id":"37509",
	"recipients":{
		"1":"Maksim Pecherskiy"
	},
	"subject":"Hello World",
	"mid":"37534"
}
</pre>

