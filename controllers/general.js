// contains home and contact-us routes

const express = require("express");
const router = express.Router();

// use router instead of app
// in the end, export the route
// no access to app object here
// with express, SHOULD ONLY HAVE ONE APP OBJECT THAT IS
// MANAGING ALL THE HTTP REQUESTS COMING INTO THE SERVER

// routes

// home route
router.get("/", function (req, res) {
  // remember that home handlebars is inside the general folder
  // otherwise an error would occur
  console.log(process.env.SEND_GRID_API_KEY);
  res.render("general/home", {
    title: "Home Page",
  });
});

// contact us route
router.get("/contact-us", function (req, res) {
  res.render("general/contactUs", {
    title: "Contact Page",
  });
});

// when submit the contact us form
router.post("/contact-us", (req, res) => {

   // use destructuring to unpack req.body
   const { firstName, lastName, email, message } = req.body; 

    // test to see if form submit is working
    console.log(req.body);

  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  const sgMail = require("@sendgrid/mail");
  // paste key below
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  const msg = {
    to: "jmanalac3165@gmail.com",
    // for from, put the person's email
    from: `${email}`,
    subject: "Contact Us Form Submit",
    html: 
    `Visitor's Full Name : ${firstName} ${lastName} <br>
    Visitor's Email Address : ${email} <br>
    Visitor's message : ${message} <br>`,
  };
  // this send method receives msg object 
  // this is an async operation
  // means we don't know how long this will take to execute
  // by default, JS is non blocking - means that for async operations,
  // after this executes, want to redirect if it is successful.
  // But if it fails, we want to use a promise
  // .then and .catch is how we handle the async operation
  // This is called a promise - promises are objects that can
  // resolve or reject after an async oepration is performed
  // ie I promise to do this when the async operation succeeds
  // or I promise to reject and throw an error if it does not 
  // succeed. 
  /**
   * .then will call the function that is put in ONLY if it succeeds.
   * Eg if pass an inaccurate API key, the send will send a promise
   * rejecting. It will enter the catch block and send an error. 
   * If see .then and .catch, it is always used in async operations.
   * If it fails, we want to print out to the console what the error is.
   * 
   */
  sgMail.send(msg)
    .then(() => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(`Error ${err}`);
    });
});

module.exports = router;
