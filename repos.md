---
layout: default
title: My Categorized GitHub Repos
---

<h2>My Public Repositories Categorized by Tags</h2>

{% assign all_tags = site.data.repos | map: "tags" | uniq | flatten | uniq | sort %}
{% assign all_tags = all_tags | push: "No Tag" %}

{% for tag in all_tags %}
  <h3>{{ tag }}</h3>
  <table>
    <thead>
      <tr>
        <th>Repository</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {% for repo in site.data.repos %}
        {% if tag == "No Tag" %}
          {% if repo.tags == empty %}
            <tr>
              <td><a href="{{ repo.html_url }}">{{ repo.name }}</a></td>
              <td>{{ repo.description | default: "No description provided." }}</td>
            </tr>
          {% endif %}
        {% else %}
          {% if repo.tags contains tag %}
            <tr>
              <td><a href="{{ repo.html_url }}">{{ repo.name }}</a></td>
              <td>{{ repo.description | default: "No description provided." }}</td>
            </tr>
          {% endif %}
        {% endif %}
      {% endfor %}
    </tbody>
  </table>
{% endfor %}
