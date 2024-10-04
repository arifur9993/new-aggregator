import { CONSTANTS } from "@/config/constants"
import { NewsModel } from "@/models/News"
import { paginationHandler } from "@/utils/pagination-handler"
import { responseHandler } from "@/utils/response-handler"
import { responsePaginationHandler } from "@/utils/response-pagination-handler"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { skip, limit, page } = paginationHandler(request)
    const searchParams = request.nextUrl.searchParams

    // Get filter parameters
    const searchText = searchParams.get("searchText") || ""
    const publicationDate = searchParams.get("publicationDate") || ""
    const sort = searchParams.get("sort") || "created_at" // empty string if not provided
    const order = searchParams.get("order") || "desc" // empty string if not provided
    const orderStyle = order === "asc" ? CONSTANTS.ORDER.asc : CONSTANTS.ORDER.desc

    const query: Record<string, any> = { trashed_at: null }

    // * Apply keyword search if searchText is provided
    if (searchText) {
      query.$or = [
        { title: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
        { topics: { $elemMatch: { $regex: searchText, $options: "i" } } },
      ]
    }

    // * Apply publication date filter if publicationDate is provided
    if (publicationDate) {
      const parsedDate = new Date(publicationDate)
      if (isNaN(parsedDate.getTime())) {
        return responseHandler({
          status: 400,
          error: "Bad Request",
          message: "Invalid publication date",
        })
      }
      query.pubDate = { $gte: parsedDate } // Filter articles published on or after the provided date
    }

    console.log("query >>> ", query)

    const [articles, totalCount] = await Promise.all([
      NewsModel.aggregate([
        {
          $match: query,
        },
        {
          $sort: { [sort]: orderStyle }, // Sort by publication date (latest first)
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ]),
      NewsModel.countDocuments(query),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return responseHandler({
      status: 200,
      results: {
        articles,
        ...responsePaginationHandler({
          page,
          totalPages,
          totalCount,
        }),
      },
    })
  } catch (error) {
    console.error("Error retrieving news articles: ", error)
    return responseHandler({
      status: 500,
      message: "Error retrieving news articles",
      error: (error as Error).message,
      stack: (error as Error).stack,
    })
  }
}
