---
layout: post.njk
pagination:
  data: cmsPosts
  size: 1
  alias: post
permalink: "/blog/{{ post.slug }}/"
---
{{ post.content | safe }}
