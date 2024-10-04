import rssParser from "rss-parser"
const rss = new rssParser()

export const fetchWithRetry: any = async (url: string, retries = 3, timeout = 5000) => {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const feed = await rss.parseURL(url)
    clearTimeout(id)
    return feed
  } catch (error) {
    if (retries === 0) {
      throw new Error(`Failed to fetch ${url}: ${(error as Error).message}`)
    }
    console.log(`Retrying ${url}, attempts left: ${retries}`)
    return fetchWithRetry(url, retries - 1, timeout) // Retry
  }
}
