const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const lighthouse = require('lighthouse');
const puppeteer = require('puppeteer');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next(); });
    app.get('/', (req, res) => {
        (async () => {
        try{
          const browser = await puppeteer.launch({ headless: true });
        
          const runnerResult = await lighthouse('https://blogvault.net/', {
          port: (new URL(browser.wsEndpoint())).port,
          output: 'json',
          logLevel: 'info'}); 
          const result= runnerResult.report;
          res.send(result);
          
        }
        catch(e){
          console.log(e);
        }
        })();	
    })
      
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})  