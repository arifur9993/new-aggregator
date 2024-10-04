import cron from 'node-cron';
import { fetchWithRetry } from "@/utils/fetch-with-retry";

let task: cron.ScheduledTask | null = null;

// Schedule function to fire API at given schedule
export function startSchedule(schedule: string) {
  if (task) {
    task.stop(); // Stop any existing task before starting a new one
  }
  console.log('Fetching news... in ' + `${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/feed`);

  task = cron.schedule(schedule, async () => {
    console.log('Fetching news... in ' + `${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/feed`);
    await fetchWithRetry(`${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/feed`);
  });

  console.log(`Task scheduled to run at: ${schedule}`);
}

// Stop the current task
export function stopSchedule() {
  if (task) {
    task.stop();
    task = null;
    console.log('Scheduled task stopped.');
  } else {
    console.log('No scheduled task found to stop.');
  }
}