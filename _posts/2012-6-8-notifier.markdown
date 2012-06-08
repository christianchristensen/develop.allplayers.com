---
layout: default
title: Notifier
---

# Notifier API

API for accessing and modifying notifiers.

## Creating a new notifier

<a id="/notifier"></a>
**Input**

*  `title`\*
*  `body`\*
*  `type`
*  `users`
*  `groups`
*  `identifier`
*  `visibility`
*  `global_notifier`
*  `group_filter`

\* Fields marked with an asterisk are required.

    /notifier [POST]

<pre class="terminal">
$ curl -b cjar
  https://www.allplayers.com/api/v1/rest/notifier.json
  -d "title=Notifier Title&body=Notifier Body&type=warning&users[]=sandy&groups[]=103078&identifier=unique identifier&visibility=anyone&global_notifier=group_dashboards&group_filter=admins"
{
  "uri": "https://www.allplayers.com/api/v1/rest/node/238248",
  "nid": "238238"
}
</pre>
