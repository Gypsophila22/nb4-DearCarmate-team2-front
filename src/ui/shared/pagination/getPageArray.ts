import { PAGES_PER_PAGINATION } from './constants'

const getPageArray = (page: number, totalPage: number, pagesPerPagination: number = PAGES_PER_PAGINATION) => {
  const paginationNum = Math.ceil(page / pagesPerPagination)
  const shownStart = (paginationNum - 1) * pagesPerPagination + 1
  const shownEnd = Math.min(totalPage, paginationNum * pagesPerPagination)

  return Array.from(
    { length: shownEnd - shownStart + 1 },
    (_, i) => i + shownStart,
  )
}

export default getPageArray
