# Environment build

For this project, `create-react-app` boilerplate code will be used. While there are many options available to use React library, `create-react-app` provides the best features for development out of the box, and also provides a wide range of options that can be customized. 

## Things already included in create-react-App

1. Dev setup consisting of a basic project with `package.json` file containing scripts to run your project.
2. Default template, containing a sample `App.jsx` component.
3. Sample `App.css` file and a provision to add cascading style sheets out of the box to style your web application.
4. Setup for create a production build.
5. Development setup for the application including hot reloading.
6. Sample `App.test.js` file containing unit test, and provision to add tests using `jest` and `react testing library`.

## Things that can be easily customizable
Create react app also doesn't impose any mandatory usage of its build setup. At any point of time one can `eject` and add your own custom webpack configuration to build and serve your application.
Some of the things that can be configured on top of base `create-react-app` are:

- Routing (Add `react-router` to enable front end routing to your pages)
- Redux ( Add `redux` and `react-redux` and enable state management in your application)
- Advanced preprocessors such as [Sass](https://sass-lang.com/), [Less](http://lesscss.org/), [PostCss](https://postcss.org/) can be configured and used in the applicaton.
- Bundle analysis can be done by adding `source-map-explorer` and configuring it in the build scripts.

## Basic Setup

You can either clone this repository and read through the tutorials to understand the concepts. However, it is recommended to start from scratch:

- Create a newfolder for your app and run `yarn init`. Provide the basic required information.
- Go to the root of your project directory and run `npx create-react-app client`. This will create a `client` folder within your application and add all the necessary setup required for the react app.
- Go to the `/client` directory and Run `yarn start`. This will bring up your application in the port 3000. The initial app should look like this:

<img src="https://i.imgur.com/iraKP0b.png" width="300px />


