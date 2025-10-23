const convertKeywordParamToString = (keywordParam: string | string[] | undefined): string => {
  return Array.isArray(keywordParam) ? keywordParam[0] : (keywordParam || '')
}

export default convertKeywordParamToString
