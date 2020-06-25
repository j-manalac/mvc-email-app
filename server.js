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
var exphbs  = require('express-handlebars');

const app = express();

 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Web serving is running on port ${PORT}`);
})

/**
 * In .gitignore, put node_modules/ to ignore all the node modules and the recursive
 * directory
 * 
 */