//initalizing the node modules
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");
const { STATUS_CODES } = require("http");
const app = express();

//for accessing the files which are outside htmlpage stored in Static folder
app.use(express.static("public"));

//Setting up BodyParser
app.use(bodyParser.urlencoded({extended:true}));

//Sending Response to the user Request
app.get("/",function(req,res){
        res.sendFile(__dirname+"/signup.html");
});

//App.post Request getting Input of user
app.post("/",function(req,res){
  try {
    // Code that may throw an error
  
        //Getting Input data from the user using body-parser
        res.sendFile(__dirname+"/success.html");
        const fname = req.body.fname;
        const lname = req.body.lname;
        const email = req.body.email;
        
        const data={
         members:[
           {
            email_address: email,
            status:"subscribed",
            merge_fields: {
              FNAME: fname,
              LNAME: lname,
             },
           },
         ],
       }   
       const jsonData = JSON.stringify(data); 
       
       const url="https://us21.api.mailchimp.com/3.0/lists/5a4391de0c";
       const option = {
        method: "POST",
        auth: "arjunsingh:3c38f357783d6c30f0e1ac3f662a851a-us21",
       }
       
      const request = https.request(url,option,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
        
       })
       request.write(jsonData);
       request.end();
      } catch (error) {
        console.error(error.code); // Access the error code
        console.error(error.message); // Access the error message
      }

    });

//Listning On Port 3000
app.listen(process.env.PORT || 3000,function(req,res){
        console.log("Server Running at Port 3000 ..........");
});