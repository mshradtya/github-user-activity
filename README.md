# GitHub Activity CLI

A simple command-line tool to fetch and display recent public activity of any GitHub user.

📌 This project is part of the [GitHub CLI challenge on roadmap.sh](https://roadmap.sh/projects/github-user-activity)

## Features

- Get recent GitHub activity of any user
- Supports common event types like Push, Issues, Watch (Star), Fork, and Create
- Human-readable messages (e.g. "Pushed 3 commits to repo-name")
- Clean CLI interface with input prompt
- Gracefully handles users with no events or invalid usernames

## Requirements

- Node.js 18+ (for native fetch support)

## How to Run

```bash
node index.js
```
