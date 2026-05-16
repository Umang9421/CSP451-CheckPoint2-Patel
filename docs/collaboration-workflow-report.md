# Collaboration Workflow Report

## 1) Issues Created
I created three GitHub issues to plan the CK2 feature work. Issue #1 covered the user authentication feature, including login validation, the POST /api/auth/login route, and an auth service. Issue #2 covered the database connection feature, including environment-based configuration, connect(), getClient(), and query(). Issue #3 covered the API endpoints feature, including splitting API route modules and adding feedback endpoints with validation.

## 2) PR Summary (3 PRs)
PR #4, "[Feature] User authentication," closed Issue #1. It added src/services/authService.js, src/routes/auth.js, mounted the auth route in src/app.js, and updated public/login.js to call the login API. PR #5, "[Feature] Database connection," closed Issue #2. It replaced the database stub with a memory-based connection layer and added documentation in docs/database-connection-notes.md. PR #6, "[Feature] API endpoints," closed Issue #3. It split the health route into its own module and added feedback GET/POST endpoints with validation.

## 3) Self-Review Evidence
I used the pull request workflow to review my own changes before merging. For the authentication PR, I added a critical self-review comment noting that the README needed demo login credentials so the tester could verify the route and UI without guessing. I addressed that comment with a follow-up documentation commit. I also checked the PR commits tab to confirm the branch had at least three focused commits. Before merging each PR, I ran npm test, npm run lint, and npm run format:check locally.

## 4) Merge Strategy
I used Squash and merge for the feature PRs. This kept main clean by creating one main-branch commit per feature while still preserving the detailed branch commits inside each PR. This strategy made the final commit history easier to read and reduced unnecessary merge commits.
