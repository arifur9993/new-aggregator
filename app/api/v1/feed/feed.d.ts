type Feed = {
  items: Item[]
  image: Image
  title: string
  description: string
  pubDate: string
  link: string
  language: string
  copyright: string
}

interface Item {
  creator: string
  date: string
  title: string
  link: string
  pubDate: string
  "dc:creator": string
  "dc:date": string
  content: string
  contentSnippet: string
  guid: string
  categories: Category[]
  isoDate: string
}

interface Category {
  _: string
  $: GeneratedType
}

interface GeneratedType {
  domain: string
}

interface Image {
  link: string
  url: string
  title: string
}
