import cron from "node-cron"

const API_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/feed`

/**
 * The cron job will automatically trigger on the /api/v1/feed endpoint every 5 minutes.
 * To modify the cron schedule, you can refer to https://crontab.guru/ for guidance on cron expressions.
 */

cron.schedule("*/5 * * * *", async () => {
  console.log("Fetching new articles from the API...")
  console.log("")
  console.log("######################################")
  console.log("#                                    #")
  console.log("#   Running scheduler every minute   #")
  console.log("#                                    #")
  console.log("######################################")
  console.log("")
  try {
    const response = await fetch(API_URL)
    // console.log(await response.json())
  } catch (error) {
    console.error("Error fetching articles: ", (error as Error).message)
  }
})
