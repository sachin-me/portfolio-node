const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

const baseDir = path.join(__dirname, 'userData');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  next();
});

app.get('/', (req, res) => {
  res.render('index.ejs');
})

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/project', (req, res) => {
  res.render('project');
})

app.get('/skill', (req, res) => {
  res.render('skill');
})

app.get('/contact', (req, res) => {
  res.render('contact');
})

app.post('/data', (req, res) => {

  res.send(req.body);

  var buffer = req.body;
  console.log(buffer);
  fs.open(`${baseDir}/${buffer.firstName + buffer.lastName}.json`, 'a+', (err, fileDes) => {
    if (err) throw err;
    fs.writeFile(fileDes, JSON.stringify(buffer), (err) => {
      if (err) throw err;
      fs.close(fileDes, (err) => {
        if (err) throw err;
        res.end(buffer);
      })
    })
  })
})

app.listen(4000, () => {
  console.log('Server is running on 4000');
});