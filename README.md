# Express, PostgreSQL, VueJS starter

This is a simple starter template with express, PostgreSQL and VueJS.

## Technologies

#### Server-side

* [NodeJS](https://nodejs.org/en/) version 8.x.x
* [Yarn](https://yarnpkg.com/lang/en/)
* [ExpressJS](http://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/?&) with [Bookshelf](http://bookshelfjs.org/)
* [Helmet](https://github.com/helmetjs/helmet) to add security middlewares
* [Winston](https://github.com/winstonjs/winston) for logging
* [PassportJS](http://www.passportjs.org/) for authentication
* [Joi](https://github.com/hapijs/joi) for validation
* [I18n](https://github.com/mashpie/i18n-node) for translation
* [nconf](https://github.com/indexzero/nconf) to handle configuration
* [Mocha](https://mochajs.org/) + [Chai](http://chaijs.com/) + [chai-http](https://github.com/chaijs/chai-http) for testing

## Usage

Install the dependencies:

```
yarn
```

or

```
yarn install
```

To start the development server:

```
yarn dev
```

To lint the code:

```
yarn lint
```

To run the tests:

```
yarn test
```

or if you want to run only some tests:

```
yarn test:unit
```

## Directory structure

```
+---.vscode
+---config
+---errors
+---locales
+---log
+---migrations
+---models
+---routes
+---test
|   +---e2e
|   +---unit
|       +---models
+---utils
```

* **.vscode:** Visual Studio Code configurations
* **config:** App configuration, such as database, logging, authentication, etc
* **errors:** Custom exceptions
* **locales:** Translations

## Visual Studio Code

#### Configuration

I use a bunch of VSCode plugins in order to get eslint, autocompletion and so on:

* [Document This](https://marketplace.visualstudio.com/items?itemName=joelday.docthis) - Automatic JSDoc comments
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [gitignore](https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore) - Language support for `.gitignore` files
* [ES6 Code Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)
* [npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script) - NPM scripts in VSCode and packages validation
* [npm intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense) - Package autocomplete in import statements
* [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
* [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens) - Check for package updates directly in `package.json`

#### Debugging

You can debug the project directly in VSCode by going to the debug panel and clicking the play button. Of course, you need to stop the node server if you have it running outside of VSCode.
