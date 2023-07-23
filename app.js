const express = require('express');
const path = require('path');
const expressHbs = require("express-handlebars");
const hbs = require('hbs');
const app = express();

const PORT = 3000;

app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "hbs",
        partialsDir: ['views/sections', 'views/global']
    }
));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/sections');
hbs.registerPartials(__dirname + '/views/global');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        mainTitle: 'Nomad Force',
        isVideoSection: true,
        pageLinks: ['home', 'studio', 'portfolio', 'events', 'contacts'],
    });
});

app.get('/news', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/news-detail.html'));
});

app.get('/about/:testId', (req, res) => {
    res.send('testId: ' + req.params['testId']);
});

app.post('/', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }

    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const checkbox1 = req.body.checkbox1;
    const checkbox2 = req.body.checkbox2;
    const checkbox3 = req.body.checkbox3;
    console.log('===== req.body =====', req.body);
    res.send(`Name: ${name}; \n Email: ${email} \n Message: ${message} \n Checkbox1: ${checkbox1} \n Checkbox2: ${checkbox2} \n Checkbox3: ${checkbox3}`);
})

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}`);
});
