const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

var request = require("request"); 


const client = require('jsreport') 
app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/report.html')); 
});
app.get('/report', (req, res, next) => {
    request({
        uri: "http://localhost:3000",
      }, function(error, response, body) {
        
       //   console.log(body);
        client.render({
            template: { content: body.toString(), 
              recipe: 'chrome-pdf', 
              engine: 'jsrender',
            chrome: { 
              landscape: true,
              //displayHeaderFooter: true,
              format: 'A4',
              headerTemplate: 'header',
              footerTemplate: 'footer',
              marginTop: '40px',
              marginBottom: '40px',
              marginLeft: '10px',
              marginRight: '10px',
              printBackground:true,
            } }
          }).then((response) => {
            // write report buffer to a file
            fs.writeFileSync('Report.pdf', response.content)   
            res.sendFile(path.join(__dirname+'/Report.pdf')); 
            // fs.unlink('report.pdf', (err) => {
            //   if (err) throw err;
            //   console.log('report.pdf was deleted');
            // });
          })
            .catch(next)
      });
    
    
  }); 
  app.use('/', router);
  app.listen(process.env.port || 3000);
  
  console.log('Running at Port 3000');

