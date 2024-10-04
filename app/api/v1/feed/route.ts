import { fetchWithRetry } from "@/utils/fetch-with-retry"
import { responseHandler } from "@/utils/response-handler"
import _ from "lodash"
import { NewsModel } from "@/models/News"
import { extractTopics, extractNamedEntities } from "@/utils/openai-extractor"
import { CONSTANTS } from "@/config/constants"

export async function GET() {
  let fetchedArticles = []

  try {
    for (const url of CONSTANTS.rssFeedUrls) {
      try {
        const feed = (await fetchWithRetry(url)) as Feed;
        const source = new URL(url).hostname;

        console.log("feed >>> ", feed);
        // write to file (feed.json in the root directory)
        // fs.writeFileSync("feed.json", JSON.stringify(feed, null, 2))

        // Use Promise.all to wait for all topics and named entities to be extracted
        const articles = await Promise.all(feed.items.map(async (item) => {
          const description = item.contentSnippet || item.content;

          // Await the results of the asynchronous functions
          const topics = await extractTopics(description);
          const namedEntities = await extractNamedEntities(description);

          return {
            title: item.title,
            description,
            topics,
            pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
            link: item.link,
            source,
            namedEntities,
          };
        }));

        console.log("articles >>> ", articles);

        fetchedArticles.push(...articles);
      } catch (error) {
        console.error(`Error fetching feed from '${url}':`, (error as Error).message);
        // Continue with the next URL in case of failure
        continue;
      }
    }

    // Save new articles (you may want to prevent duplicates based on the link)
    await NewsModel.insertMany(fetchedArticles, { ordered: false }).catch((err) => {
      // Handle duplicate error, e.g., "E11000 duplicate key error"
      if (err.code !== 11000) throw err
    })

    return responseHandler({
      status: 200,
      message: `Fetched and saved ${fetchedArticles.length} articles successfully with no duplicates`,
    })
  } catch (error) {
    return responseHandler({
      status: 500,
      error: "Internal Server Error",
      message: (error as Error).message,
      stack: (error as Error).stack,
    })
  }
}
