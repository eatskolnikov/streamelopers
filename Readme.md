# Streamelopers
About
==============

[Streamelopers](http://stream.torib.io) is a project made to support the Dominican software development community

Setup and installation
==============

Install nodejs
--------------
[Here](https://goo.gl/YcOsZP) you can check how to do so. There's an issue when installing Node in Ubuntu, check it out how to solve it [here](https://goo.gl/uSfZXo)

Open the command line and update npm
--------------
	npm install npm -g

Install bower
--------------
	npm install -g bower

**Before proceeding make sure you are in the project's root folder within the terminal**

Install npm packages
--------------
	npm install

Install bower packages
--------------
	bower install

Building
--------------
	grunt build

You can run the build task with this. It will validate js files and create a build folder where it will copy all the css, js, images and html minified.

Watching
--------------
	grunt watch

Watches any changes made to code files inside the src/ folder. If the watcher sees a change it starts the building process

Running
--------------
	npm start

Executes the "node server.js"  command and serve the content of the ./build directory via the port 8000 , accesible via http://localhost:8000
