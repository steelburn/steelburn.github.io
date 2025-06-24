// scripts/update-libs.js
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// List of GitHub starred list URLs
const listUrls = [
  'https://github.com/stars/steelburn/lists/dev-libraries',
  'https://github.com/stars/steelburn/lists/dataops',
  'https://github.com/stars/steelburn/lists/business-intelligence',
  'https://github.com/stars/steelburn/lists/api',
  'https://github.com/stars/steelburn/lists/references',
  'https://github.com/stars/steelburn/lists/devops',
  'https://github.com/stars/steelburn/lists/secops',
  'https://github.com/stars/steelburn/lists/devtools',
  'https://github.com/stars/steelburn/lists/common-tools',
  'https://github.com/stars/steelburn/lists/aiops',
  'https://github.com/stars/steelburn/lists/ui-ux',
  'https://github.com/stars/steelburn/lists/financial',
  'https://github.com/stars/steelburn/lists/inspiration'
  // Add more list URLs here
];

async function fetchStarredRepos(listUrl) {
  const match = listUrl.match(/github\.com\/stars\/([^/]+)\/lists\/([^/]+)/);
  if (!match) {
    throw new Error(`Invalid URL: ${listUrl}`);
  }

  const [_, user, list] = match;
  const apiUrl = `https://github.com/stars/${user}/lists/${list}`;
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'update-libs-script',
  };

  const htmlResp = await fetch(apiUrl, { headers });
  const html = await htmlResp.text();

  const repoRegex = /href="\/([^/]+)\/([^"/]+)"/g;
  const repos = new Set();
  let matchRepo;
  while ((matchRepo = repoRegex.exec(html)) !== null) {
    const [_, owner, name] = matchRepo;
    repos.add(`${owner}/${name}`);
  }

  return Array.from(repos);
}

async function fetchRepoDetails(fullName) {
  const [owner, repo] = fullName.split('/');
  const resp = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'update-libs-script',
    },
  });

  if (!resp.ok) {
    console.error(`Failed to fetch ${fullName}:`, resp.statusText);
    return null;
  }

  const r = await resp.json();
  return {
    name: r.name,
    owner: r.owner.login,
    description: r.description,
    url: r.html_url,
    language: r.language,
    stars: r.stargazers_count,
    updated_at: r.updated_at,
  };
}

async function main() {
  const allRepos = new Set();
  for (const url of listUrls) {
    const repos = await fetchStarredRepos(url);
    repos.forEach(repo => allRepos.add(repo));
  }

  const details = [];
  for (const fullName of allRepos) {
    const info = await fetchRepoDetails(fullName);
    if (info) {
      details.push(info);
    }
  }

  const output = {
    fetched_at: new Date().toISOString(),
    count: details.length,
    devLibraries: details,
  };

  const filePath = path.join('dev-libraries.json');
  fs.writeFileSync(filePath, JSON.stringify(output, null, 2));
  console.log(`Saved ${details.length} libraries to ${filePath}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
