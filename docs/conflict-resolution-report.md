# Conflict Resolution Report

## 1) Conflict Scenario
The intentional merge conflict happened in README.md. The branches involved were feature/user-authentication and feature/api-endpoints. The authentication branch added a Feature Summary describing login validation, the authentication API route, and demo credential testing. The API endpoints branch added a Feature Summary describing route reorganization and feedback endpoint validation. Because both branches edited the same section of README.md, Git could not automatically decide which version to keep after the authentication PR was merged into main.

## 2) What You Saw
When I merged origin/main into feature/api-endpoints, Git marked README.md as conflicted. In VS Code, I saw the standard conflict markers: <<<<<<<, =======, and >>>>>>>. The top section showed one branch's version, and the lower section showed the incoming version from main. I captured this evidence in Figure 14 of my submission report.

## 3) Resolution Strategy
I resolved the conflict by keeping both ideas and rewriting the section into one combined Feature Summary. The final version explains authentication, database connection, and API endpoint work together. I removed all conflict marker lines and saved the file. Then I committed the resolution using the message: chore(merge): resolve README conflict between auth and api branches. After resolving it, I ran npm test, npm run lint, and npm run format:check to confirm the project still passed.

## 4) Prevention Methods
This conflict could be reduced in a real team by keeping documentation changes smaller, communicating before editing the same README section, and pulling or merging from main more frequently. Another prevention method is to split documentation by feature, such as using separate docs files for authentication, database, and API work instead of editing the same README lines in multiple branches.