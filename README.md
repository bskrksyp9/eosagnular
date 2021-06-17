# Learning Angular 6 with Eosjs

Trying to document what steps are taken to get an Angular 6 project running together with Eosjs.

## Credits and external resources

* EOS: https://github.com/EOSIO/eos
* Angular: https://angular.io/
* Eosjs: https://github.com/EOSIO/eosjs
* EOSTracker using Angular 5 with Eosjs: https://github.com/EOSEssentials/EOSTracker
* A workaround for require stream in Angular 6: https://gist.github.com/niespodd/1fa82da6f8c901d1c33d2fcbb762947d

## Prerequisites:

Install Eos as described here: https://github.com/EOSIO/eos/wiki/Local-Environment#2-building-eosio

I start it in a screen as follows:
```sh
screen -S nodeos -m /usr/local/bin/nodeos -e -p eosio \
	--plugin eosio::chain_api_plugin \
	--plugin eosio::history_api_plugin \
	--http-server-address 0.0.0.0:8888 \
	--access-control-allow-origin "*"
```

Note the last `--access-control-allow-origin "*"` which is necessary for the browser to fetch data from an alternate origin than the site itself.

Install nodejs/npm from https://nodejs.org/en/download/

Install angular globally with:
```sh
sudo npm install -g @angular/cli
```

## Create a new project and install dependencies

```sh
ng new angular6-eosjs
```

Enter project dir and install eosjs:
```sh
cd angular6-eosjs
npm install eosjs
```

## Create workaround for missing stream

Create postinstall patch for enabling `require('stream')` which is no longer available in Angular 6 and is still necessary for cipher-base and hash-base.

See file `/patch.js` and addition of `postinstall` in `/packages.json`.

Following applies the patch:
```sh
npm install
```

## Configure environment

Add a blockchainUrl to the `environments/environment.ts`.

## Create EosService

Use ng generate service for this:
```sh
ng g s services/eos
```

Modify `services/eos.service.ts` so it imports eosjs and the environment and exposes a class variable called eos that's populated by its constructor through eosjs using the environment blockchainUrl.

## Create info component and use the EosService in it

Create an `info` component:
```sh
ng g c info
```

Show it from the `app.component.html` with `<app-info></app-info>` and modify the `info.component.html` a bit.

Edit `info.component`, import EosService from `../services/eos.service`, intialize eosService from its constructor and fill `this.data` in `ngOnInit`.

Display the `{{data}}` in `info.component.html` through one-way data-binding.

Add dependency for `angular2-prettyjson` and use it to pipe the data through in `info.component`.
```sh
npm install angular2-prettyjson --save
```

