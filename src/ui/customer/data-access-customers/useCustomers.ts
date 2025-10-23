import { useQuery } from '@tanstack/react-query'
import { getCustomers } from '@shared/api'
import { CUSTOMERS_PAGE_SIZE } from '@ui/shared/pagination/constants'
import { SearchByCustomer } from '@shared/types'

const useCustomers = ({
  page,
  searchBy,
  keyword,
}: {
  page: number
  searchBy: SearchByCustomer
  keyword: string
}) => {
  const query = useQuery({
    queryKey: ['customers', { page, searchBy, keyword }],
    queryFn: async () =>
      await getCustomers({
        page,
        pageSize: CUSTOMERS_PAGE_SIZE,
        searchBy,
        keyword,
      }),
    staleTime: 60 * 1000 * 3, // 3 minutes
    throwOnError: true,
  })

  return query
}

export default useCustomers
