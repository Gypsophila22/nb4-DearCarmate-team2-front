const convertPageParamToNumber = (pageParam: string | string[] | undefined) => {
  const pageElement = Array.isArray(pageParam) ? pageParam[0] : pageParam
  return (Number.isNaN(Number(pageElement)) || Number(pageElement) < 1)
    ? 1
    : Math.floor(Number(pageElement))
}

export default convertPageParamToNumber
