# Scribbletune playground with Vue

A [Vue.js](https://vuejs.org/) playground to experiment sound synthesis with [Tone.js (v14.7.7)](https://tonejs.github.io/docs/14.7.7/) & melody making with [scribbletune](https://scribbletune.com/)

You can check the [demo here](https://qchenevier.github.io/scribbletune-playground-vue/).

## Installation & Usage

- `git clone` the repo
- `npm install` to install the project dependencies
- `npm run dev` to start the app development server
- go to http://localhost:8080 to see the app

## Deployment

- `git clone` the repo
- `npm install` to install the project dependencies
- `npm run build` to start the app development server
- `bash deploy.sh` to deploy (before that, change the repo URL in the bash script to deploy on your own repo)

### Sources of inspiration

#### Beats

[@walmik](https://github.com/walmik) collection of [scribbletune examples](https://scribbletune.com/examples/), especially this article on [classic breakbeats](https://scribbletune.com/examples/breakbeats).

[Ethan Hein's blog](http://www.ethanhein.com/wp/) and its [breakbeats google sheet](https://docs.google.com/spreadsheets/d/19_3BxUMy3uy1Gb0V8Wc-TcG7q16Amfn6e8QVw4-HuD0/edit#gid=0).

#### Template

I found a minimalistic boilerplate to build a webpack + vue application (only html/JS/css, no scss, no pug) [here on freecodecamp](https://www.freecodecamp.org/news/how-to-create-a-vue-js-app-using-single-file-components-without-the-cli-7e73e5b8244f/)

The deployment script is inspired from the [github pages vue-cli documentation](https://cli.vuejs.org/guide/deployment.html#github-pages).
