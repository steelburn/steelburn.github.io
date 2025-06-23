---
layout: default
title: My Repositories
---

<h1>My GitHub Repositories</h1>

{% assign repos_by_name = site.data.repos | index_by: "name" %}
{% assign all_listed_repos = "" | split: "," %}

{% for list in site.data.repo_lists %}
  {% assign list_name = list[0] %}
  {% assign repo_names = list[1] %}
  {% assign all_listed_repos = all_listed_repos | concat: repo_names %}

  <h2>{{ list_name }}</h2>
  <table>
    <thead>
      <tr><th>Repository</th><th>Description</th></tr>
    </thead>
    <tbody>
      {% for repo_name in repo_names %}
        {% assign repo = repos_by_name[repo_name] %}
        {% if repo %}
        <tr>
          <td><a href="{{ repo.html_url }}">{{ repo.name }}</a></td>
          <td>{{ repo.description | default: "No description provided." }}</td>
        </tr>
        {% else %}
        <tr>
          <td colspan="2">{{ repo_name }} <em>(not found)</em></td>
        </tr>
        {% endif %}
      {% endfor %}
    </tbody>
  </table>
{% endfor %}

<h2>Unlisted Repositories</h2>
<table>
  <thead>
    <tr><th>Repository</th><th>Description</th></tr>
  </thead>
  <tbody>
    {% for repo in site.data.repos %}
      {% unless all_listed_repos contains repo.name %}
      <tr>
        <td><a href="{{ repo.html_url }}">{{ repo.name }}</a></td>
        <td>{{ repo.description | default: "No description provided." }}</td>
      </tr>
      {% endunless %}
    {% endfor %}
  </tbody>
</table>
