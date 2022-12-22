const nodeMailer = require('../configs/nodemailer');

exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'varunchaubey4@gmail.com',
        to: comment.user.email,
        subject: "New Comment published!",
        html: htmlString
    }, (err, info) => {
        if(err) {
            console.log('Error in sending mail', err);
            return;
        }
        
        return;
    });
}