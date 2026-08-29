---
layout: post.njk
pagination:
  data: cmsPosts
  size: 1
  alias: post
permalink: "{% if post.locale == 'en' %}/en/blog/{{ post.slug }}/{% else %}/blog/{{ post.slug }}/{% endif %}"
---
{{ post.content | safe }}
