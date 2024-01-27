// TABRIZ
const nodemailer = require('nodemailer');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Merhaba, Sunucu çalışıyor!');
})

app.post('/send-email', (req, res) => {
    const { email, name } = req.body;
    const html = `
        <h1>E-poçt göndərildi!</h1>
      
    `;
    
    const transporter = nodemailer.createTransport({
        host: 'mail.hasimovtabriz.com.tr',
        port: 465,
        secure: true,
        auth: {
            user: 'noreply@hasimovtabriz.com.tr',
            pass: '*********'
        }
    });
    
    const mailOptions = {
        from: 'Edumy <admin@hasimovtabriz.com.tr>',
        to: email,
        subject: 'Edumy University',
        html: html + name+"  " +" Qeydiyat uğurla tamamlandı!"
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('E-poçta göndərmə xətası:', error);
            res.status(500).send('E-poçta göndərmə xətası ');
        } else {
            console.log('E-poçt göndərildi');
            res.send('E-poçt göndərildi');
        }
    });
});


app.listen(3000, () => {
    console.log('server: http://localhost:3000');
});


