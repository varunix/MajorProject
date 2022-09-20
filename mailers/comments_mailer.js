const nodeMailer = require('../configs/nodemailer');

//this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside comment mailer');

    nodeMailer.transporter.sendMail({
        from: 'varunchaubey4@gmail.com',
        to: comment.user.email,
        subject: "New Comment published!",
        html: <h1>Yup, you're comment is now published!</h1>
    }, (err, info) => {
        if(err) {
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}