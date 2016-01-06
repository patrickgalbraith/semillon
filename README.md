# semillon

Modern WordPress theme using:

- WordPress Rest API (v2)
- React
- Redux
- React-router
- Server side rendering
- Webpack, incl. hot reloading
- Redux devtools
- and more...

![Screenshot](http://i.imgur.com/GHabSbP.png)

## Building & Running

Install dependencies:
```sh
$ npm install
```

Create .env file (make sure you update it with your settings):
```sh
$ cp .env.example .env
```

Start the development server:
```sh
$ npm start
```

Build sass files *(requires sass cli)*:
```sh
$ npm run sass
```

Watch sass files for changes *(requires sass cli)*:
```sh
$ npm run sass-watch
```