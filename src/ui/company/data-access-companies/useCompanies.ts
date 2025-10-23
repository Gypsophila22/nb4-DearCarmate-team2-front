import { useQuery } from '@tanstack/react-query'
import { COMPANIES_PAGE_SIZE } from '@ui/shared/pagination/constants'
import { SearchByCompany } from '@shared/types'
import { getCompanies } from '@shared/api'

const useCompanies = ({
  page,
  searchBy,
  keyword,
}: {
  page: number
  searchBy: SearchByCompany
  keyword: string
}) => {
  const query = useQuery({
    queryKey: ['companies', { page, searchBy, keyword }],
    queryFn: async () =>
      await getCompanies({
        page,
        pageSize: COMPANIES_PAGE_SIZE,
        searchBy,
        keyword,
      }),
    staleTime: 60 * 1000 * 10, // 10 minutes
    throwOnError: true,
  })

  return query
}

export default useCompanies
