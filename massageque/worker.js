const { Worker } = require("bullmq");

const sendEmail = (ms) => new Promise((res) => setTimeout(res, ms * 1000));

const worker = new Worker(
  "email-queue", 
  async (job) => {
    console.log(`Message rec id: ${job.id}`);
    console.log("Processing message");
    console.log(`Sending email to ${job.data.email}`);
    
    await sendEmail(5); // 5 second delay simulation
    
    return { sent: true, recipient: job.data.email };
  }, 
  {
    connection: {
      host: "127.0.0.1",
      port: 6379
    }
  }
);

// Listen for completion
worker.on('completed', (job) => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});