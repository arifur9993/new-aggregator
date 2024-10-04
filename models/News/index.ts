import { MODELS } from "@/config/api.config"
import { Model, model, models } from "mongoose"
import { mongoose } from "@/config/db-connector"

export interface NewsDocument extends Document {
  _id: string
  title: string
  description: string
  topics: string[]
  pubDate: Date
  link: string
  source: string
  namedEntities: string[]
}

const schema = new mongoose.Schema<NewsDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    topics: { type: [String], required: true },
    pubDate: { type: Date, required: true },
    link: { type: String, required: true, unique: true },
    source: { type: String, required: true },
    namedEntities: { type: [Array], default: [] },
  },
  { timestamps: true }
)

export const NewsModel =
  (models[MODELS.NEWS.name] as Model<NewsDocument>) || model<NewsDocument>(MODELS.NEWS.name, schema)
