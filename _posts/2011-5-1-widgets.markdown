---
layout: default
title: Widgets
---

# Widgets

## Group Registration

The Group Registration widget allows users to easily sign up for groups/teams on AllPlayers.com.
The widget is a simple iframe that you can drop into your page.
When not logged into AllPlayers, users will be prompted for their username and password or they
can register for a new account.

**Example**

<img src="/images/group_registration_1.png" style="border:1px solid gray" />

    < iframe id="group_register" name="group_register" seamless="seamless" style="border: none; overflow-y: hidden;" src="https://m.allplayers.com/g/store_group/register#group_register" width="100%" height="0px"></iframe>

**Get your app to display widget seamlessly**

One of the goals when having widgets embedded in your application/web site is to have a seamless
integration so that the user has a better experience, in order to do that we must do some javascript work to communicate
between the child iframe and the parent.

1. Get your iframe to resize dynamically based on content.

We use porthole for the app to be able to communicate cross-domain, so just include it or download it into your app:
    <script src="https://raw.github.com/ternarylabs/porthole/master/src/porthole.min.js" type="text/javascript" />

Then include the following script:

    function onMessage(messageEvent) {
      var height = messageEvent.data.height + 'px';
      console.log(height);
      // Once height message is received from QS, slide open the iframe
      $('#group_register').animate({
        'height' : height
      }, 200);
    }
    var windowProxy;
    window.onload=function(){
        // Create a proxy window to send to and receive
        // messages from the iFrame
        windowProxy = new Porthole.WindowProxy(
            '/assets/proxy.html', 'group_register');

        // Register an event handler to receive messages;
        windowProxy.addEventListener(onMessage);
    };