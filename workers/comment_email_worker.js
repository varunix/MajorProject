const queue = require('../configs/kue');
const commentMailer = require('../mailers/comments_mailer');

queue.process('emails', (job, done)=>{
    console.log('emails worker is processing a job', job.data);
    commentMailer.newComment(job.data);
    done();
});