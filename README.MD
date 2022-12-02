<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://static.wixstatic.com/media/a12f79_5679180fc2d247f790e539db6c942641~mv2.png/v1/fill/w_440,h_80,al_c,lg_1,q_85,enc_auto/logolarge.png" width="120" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>



</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is patients details import microservice architecture based project.

## Import service

Import service read the csv file and send data  to patients service via NATS service.

## Patients service

 Patients service receive the csv data from import service and do the validation checking if data is valid  those saved on the postgres database via typeORM

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```



## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Chathuranga Bandara](https://github.com/chathunb)
- Website - [https://github.com/chathunb](https://github.com/chathunb/)
- Twitter - [@chathunbandara](https://twitter.com/chathunbandara)

## License

  Nest is [MIT licensed](LICENSE).
