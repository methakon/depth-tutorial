const { Queue } = require("bullmq");

// Configure connection to your Docker Redis
const connection = {
  host: '127.0.0.1',
  port: 6379
};

// Initialize the queue
const notificationQueue = new Queue("email-queue", { connection });

async function init() {
  const res = await notificationQueue.add("email to piyush", {
    email: "piyushgarg.dev",
    subject: "Welcome Mess",
    body: "Hey Piyush, Welcome",
  });

  console.log("Job added to queue:", res.id);
  
  // Optional: Close connection so the script finishes immediately
  await notificationQueue.close();
}

init();