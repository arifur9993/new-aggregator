# News Aggregator

## Project Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/arifur9993/news-aggregator.git
   cd news-aggregator
   ```

2. **Install Dependencies**
   Use either npm or pnpm to install the required packages:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the Development Server**
   Start the development server with:
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

4. **Environment Variables Configuration**
   - Modify the following environment variables in your `.env` file:
     - **MONGODB_DB**: Set your MongoDB database name.
     - **MONGODB_URI**: Set the MongoDB connection URL.
     - **OPENAI_API_KEY**: Obtain your API key from OpenAI for topic extraction and named entity recognition. To generate an OpenAI key, visit [OpenAI's platform](https://platform.openai.com). Sign in to your account and navigate to the dashboard. Find the API key link in the left menu. You can use the default key or generate a new key for this project.
     - **RSS_FEED_URLS**: Add or remove RSS feed URLs in this field as a comma-separated string to allow the application to fetch news articles.

## Project Information

- This project provides APIs for parsing news from various RSS feeds.
- The application constructs RSS URLs, fetches news articles, and parses them for processing.
- For topic extraction and named entity recognition, the application utilizes OpenAI’s API to extract topics and names from the news content.
- The filtered news API offers a paginated list of all news articles. If no parameters are provided, it defaults to returning all articles. Users can filter news articles by providing `searchText` and `publicationDate` as URL parameters.



## Testing
- For testing on Postman, a file called 'news-agg-collection.json' is attached in the project root path for Postman API testing.