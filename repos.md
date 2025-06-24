---
layout: default
title: Repositories by List
---

{% assign repos_by_full_name = site.data.repos | index_by: "full_name" %}
{% assign all_listed_repos = "" | split: "," %}

{% for list in site.data.repo_lists %}
  {% assign list_name = list[0] %}
  {% assign repo_paths = list[1] %}
  {% assign all_listed_repos = all_listed_repos | concat: repo_paths %}

  <h2>{{ list_name }}</h2>
  <table>
    <thead>
      <tr><th>Repository</th><th>Description</th></tr>
    </thead>
    <tbody>
      {% for full_name in repo_paths %}
        {% assign repo = repos_by_full_name[full_name] %}
        {% if repo %}
        <tr>
          <td><a href="{{ repo.html_url }}">{{ repo.full_name }}</a></td>
          <td>{{ repo.description | default: "No description" }}</td>
        </tr>
        {% else %}
        <tr>
          <td colspan="2">{{ full_name }} <em>(not found)</em></td>
        </tr>
        {% endif %}
      {% endfor %}
    </tbody>
  </table>
{% endfor %}
