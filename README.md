## How to start development

This project uses Node Package Manager (NPM) and node to compile typescript, 
templates, and styling files to javascript, HTML, and CSS.
To use these, download and install [node](https://nodejs.org/en/download/).

### Install
Clone this repository and cd into the root directory of the mixabot app.

Install all of the package dependencies and make sure Ionic
is installed globally:

```bash
$ npm install
$ npm install -g ionic
```

### Setup typescript (optional)
If you want to run typescript files directly from the command line
[ts-node](https://github.com/TypeStrong/ts-node) becomes very useful:
```bash
$ npm install -g ts-node
$ npm install -g typescript
```

Then you can run any typescript script, for example:

```bash
$ ts-node server/script.ts
```

### Run the app
Restart the terminal OR make sure ionic is in your path environment
variable.

Now start the app to automatically launch it in a browser:

```bash
$ ionic serve
```


