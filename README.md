<p align="center">
  <img width="35%" src=".github/logo.svg" alt="nextlevelweek" title="nextlevelweek"></a>
</p>

<h3 align="center">NLW#4 | Nodejs</h3>

<div align="center">

![languages-count](https://img.shields.io/github/languages/count/caioagiani/nodejs-nlw4)
![languages-top](https://img.shields.io/github/languages/top/caioagiani/nodejs-nlw4)
![repo-size](https://img.shields.io/github/repo-size/caioagiani/nodejs-nlw4)
![last-commit](https://img.shields.io/github/last-commit/caioagiani/nodejs-nlw4)

  <p>Project developed during the Nodejs trail in the 4th edition of Next Level Week provided by [Rocketseat].</p>
</div>

<div align="center">
  <img align="center" alt="" title="preview" src="screenshot.png" width="80%">
</div>

## Technologies used

![Express](https://img.shields.io/badge/-Express-000000?style=flat&logo=express&color=gray&logoColor=000000)
![TypeScript](https://img.shields.io/badge/-TypeScript-2F74C0?style=flat&logo=typescript&color=gray&logoColor=2F74C0)
![NodeJS](https://img.shields.io/badge/-NodeJS-3E863D?style=flat&logo=node.js&color=gray&logoColor=3E863D)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-31648C?style=flat&logo=postgresql&color=gray&logoColor=31648C)
![Docker](https://img.shields.io/badge/-Docker-47b3f5?style=flat&logo=docker&color=gray&logoColor=47b3f5)
![TypeORM](https://img.shields.io/badge/-TypeORM-F9AB02?style=flat&logo=typeorm&color=gray&logoColor=F9AB02)
![Eslint](https://img.shields.io/badge/-Eslint-4930BD?style=flat&logo=eslint&color=gray&logoColor=4930BD)
![Prettier](https://img.shields.io/badge/-Prettier-F9AB02?style=flat&logo=prettier&color=gray&logoColor=F9AB02)
![jest](https://img.shields.io/badge/-jest-E0301E?style=flat&logo=jest&color=gray&logoColor=E0301E)

## Start application

```bash
# Clone this project
$ git clone git@github.com:caioagiani/nodejs-nlw4.git

# Open folder
$ cd nodejs-nlw4

# Set up variable environments
$ cp .env.example .env

# Install dependencies
$ yarn install

# Start database postgress with docker
$ yarn dev:db

# Create database table
$ yarn typeorm migration:run

# Run application
$ yarn dev
```

## Tests

```javascript
caio-agiani in nlw4 on -> master ❯ yarn dev:test
yarn run v1.22.5
$ NODE_ENV=test jest --setupFiles dotenv/config --detectOpenHandles --forceExit
 PASS  __tests__/Mail.test.ts (6.397 s)
 PASS  __tests__/Answer.test.ts
 PASS  __tests__/Nps.test.ts
 PASS  __tests__/Survey.test.ts
 PASS  __tests__/User.test.ts

Test Suites: 5 passed, 5 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        13.429 s
Ran all test suites.
Done in 15.43s.
```

## Contact

- [LinkedIn](https://www.linkedin.com/in/caioagiani/)
- caio.agiani14@gmail.com
