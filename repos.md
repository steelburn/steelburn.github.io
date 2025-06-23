---
layout: default
title: My Public Repositories
---

<h2>My Public GitHub Repositories</h2>

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    {% for repo in site.data.repos %}
    <tr>
      <td><a href="{{ repo.html_url }}">{{ repo.name }}</a></td>
      <td>{{ repo.description | default: "No description provided." }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>
