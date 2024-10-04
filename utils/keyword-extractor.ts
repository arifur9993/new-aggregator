import keywordExtractor from "keyword-extractor"

export const extractTopics = (description: string) => {
  const extractionResult = keywordExtractor.extract(description, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: false,
  })

  return extractionResult.slice(0, 7) // Extract top 5 keywords as "topics"
}
