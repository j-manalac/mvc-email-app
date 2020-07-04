/**
 * ----- What are Design Patterns? -----
 * Language independent
 * We focus in this course mostly on MVC
 * Model : contains data and database related logic. We will use MongoDB. 
 * View : what the user sees . Usually HTML, CSS, JavaScript
 * What the controller does depends on whether the view is static or dynamic.
 * EG: Facebook login page is static but the actual facebook feed is dynamic.
 * Facebook login page does not get anything from the database so controller does
 * not communicate with the model
 * Model gets data from database then sends it to the controller and controller gives
 * it to the view
 * Can allow up to three people to work on a program simultaneously - view, controller,
 * and model
 * EXPRESS IS THE CONTROLLER THAT WE HAVE BEEN USING SO FAR! But, we don't want
 * all routes in the entry point file. So, we will have a controller that has all
 * the routes. 
 * Eg: all products are managed inside the product controller
 * 
 * ------ Advantages of MVC ------ 
 * It is a design pattern
 * A developer can work parallel on different components of MVC
 * Decouple various components
 * It increases the code reusability
 * 
 * 
 * 
 * 
 */
const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
require('dotenv').config({path:"./config/keys.env"});
const app = express();

// handlebars middleware
// must come after express object
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false }));

// load static assets
app.use(express.static('public'));

// no longer need productModel here, need it in product.js
// load productModel
// const productModel = require('./models/product.js');
// const product = require("./models/product.js");

// load controllers
const generalController = require('./controllers/general');
const productController = require('./controllers/product');

// map each controller to the express object
app.use('/', generalController);
app.use('/product', productController);

// sets up server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Web serving is running on port ${PORT}`);
});

/**
 * In .gitignore, put node_modules/ to ignore all the node modules and the recursive
 * directory
 * How do you run the program without the node modules folder>
 * Do we have to install all the dependencies? 
 * That is option one but it is unrealistic. 
 * Imagine you had so many dependencies. 
 * Because the STANDARD IS TO NOT PUSH nodes_modules, don't want
 * to install manually.
 * Just type npm install
 * Node.js will go through all dependencies and install all depnendencies
 * for you
 * 
 * Views typically consist of HTML/CSS and JavaScript
 * Dynamic values are injected into your views by the controller.
 * We have been using Handlebars to handle our views.
 * 
 * Group all product views together 
 * Eg here, we are grouping all product related views into one
 * folder and general views into another. 
 * You don't have to do this but this will make it more organized.
 * 
 * ---- EXPRESS ROUTER ----
 * Built into express module
 * Allows you to create modular, mountable route handlers.
 * Means that it allows us to modularize our routes. 
 * Modularize means put your routes into different files. 
 * IN ORDER TO CREATE THE EXPRESS ROUTER, first call express
 * and create the router object using express.Router()
 * 
 * For middleware, when the user types something like 
 * localhost:3000/contact-us in the browser, app will look at
 * the controller for generalController first, then look for the 
 * route that matches the one the user put in. If there is no 
 * match in that controller, the app will look at the next controller.
 * If there is absolutely NO matches, it will just hang. 
 * 
 * ---- SENDGRID ----
 * SendGrid is a Twilio API that allows to send emails.
 * Instead of creating a server to send and create emails, we can
 * use an API.  
 * 
 * If someone fills out the contact-us form, we will send the email
 * to a designated email address of the company. Eg, for shotsbyjem,
 * every time someone fills out their information, it will send
 * an email to the designated email and see all the email addresses.
 * 
 * In this case, we will set up our personal email and send the 
 * information to our personal email. Collect all information to 
 * just one email. We can respond to the messages directly. 
 * 
 * HOW TO USE SENDGRID
 * Log into sendgrid
 * Go to account
 * Click email API -> Integration guide
 * Click Web API
 * Choose the language you want to use (preferably Node.js)
 * Create an API key - first, give it a name then click create
 * key. 
 * Then, install the sendgrid package:
 * npm i @sendgrid/mail
 * Copy all of the code from the website and put it into the
 * controller. 
 * Why put in the controller? Because the controller is 
 * responsible for sending the email. When submit the form,
 * the post request is sent, then we want to send the email.
 * Paste the key where it says setApiKey
 * Change to: to the email address you want to send the information
 * to.
 * Change the subject and text as required. 
 * html and text is the same, but for html, you can change it up
 * so you can include html in the message.
 * Prefer to use html over text.
 * 
 * To prevent uploading onto github or heroku sensitive information
 * like API keys and passwords, we use environment variables.
 * 
 * ---- Environment Variables ----
 * An environment variable is a variable whose value is set 
 * outside the program, typically through functinoality built into
 * the operating system or microservice. An environment
 * variable is made up a name/value pair, and any number may
 * be created and available for reference at a point in time.
 * The primary use case for environment variables is to limit
 * the need to modify and re-release an application due to changes 
 * in configuration data. 
 * Can create environment variables locally, on heroku, etc.
 * Environment variables exist outside the program at an
 * environment level. That way, we don't have to switch our code
 * depending on the environment it is. 
 * In a node app, we can't innately create environment variables.
 * To do this, we need to use a package called .env package. 
 * Installing this package allows us to create environment variables
 * within our node.js app. 
 * Make the environment variables inside the config folder, within
 * a .env file.
 * dotenv is a module that loads environment variables from a
 * .env file into process.env
 * Setting up dotenv:
 *  first, install package: npm i dotenv
 *  then, create a .env file in the root directory of your project.
 *   Add environment-specific variables on new lines in the form
 *   NAME = VALUE
 *  Finally, require the package in your entry point file
 *      require('dotenv').config((path: "./path"));
 * 
 */