import path from "node:path";

const RESOURCE_PATH = process.env.RESOURCE_PATH || "resources";
const STATIC_RESOURCE_PATH = path.join(RESOURCE_PATH, "static");

// Read RSS feed URLs from an environment variable, default to a predefined list if not set
const rssFeedUrls = process.env.RSS_FEED_URLS
  // Split by comma and trim whitespace
  ? process.env.RSS_FEED_URLS.split(",").map(url => url.trim()) 
  : [
    // BBC News
    "https://feeds.bbci.co.uk/news/rss.xml", 
    // The Guardian - World News
    "https://www.theguardian.com/world/rss", 
  ];

export const CONSTANTS = {
  rssFeedUrls: rssFeedUrls,
  ORDER: {
    asc: 1,
    desc: -1,
  },
} as const;
