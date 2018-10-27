const Nightmare = require('nightmare');

const confFile = require('./conf.json');

const nodemailer = require('nodemailer');

const nightmare = Nightmare({show: false});

const LOGIN_PAGE = 'https://stackoverflow.com/users/login';


function processResult(text) {
    if (confFile.email && confFile.email_password) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: confFile.email,
                pass: confFile.email_password
            }
        });

        var mailOptions = {
            from: confFile.email,
            to: confFile.email,
            subject: `Stackoverflow visiting report`,
            text: `Hello there. Your stat for now: ${text}`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                    console.log(error);
            } else {
                    console.log('Email sent: ' + info.response);
            }
        });
    }
}

function processError(errText) {
    if (confFile.email && confFile.email_password) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: confFile.email,
                pass: confFile.email_password
            }
        });

        var mailOptions = {
            from: confFile.email,
            to: confFile.email,
            subject: `Stackoverflow visiting report (Error)`,
            text: `Oopsie-woopsie. Something went wrong: ${errText}`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                    console.log(error);
            } else {
                    console.log('Email sent: ' + info.response);
            }
        });
    }
}

const m = confFile.so_email;
const p = confFile.so_password;

nightmare
    .goto(LOGIN_PAGE)
    .wait('#login-form')
    .type('#email', m)
    .type('#password', p)
    .click('#submit-button')
    .wait('a.my-profile')
    .click('a.my-profile')
    .wait('#top-cards')
    .evaluate(() => {
        const el = document.getElementsByClassName('grid--cell ml-auto fs-caption')[0].innerText;
        return el;
    })
    .end()
    .then(progressText => {
        processResult(progressText);
    })
    .catch(function (error) {
        processError(error);
    });