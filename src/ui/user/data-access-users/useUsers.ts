import { useQuery } from '@tanstack/react-query'
import { getCompanyUsers } from '@shared/api'
import { USERS_PAGE_SIZE } from '@ui/shared/pagination/constants'
import { SearchByUser } from '@shared/types'

const useUsers = ({
  page,
  searchBy,
  keyword,
}: {
  page: number
  searchBy: SearchByUser
  keyword: string
}) => {
  const query = useQuery({
    queryKey: ['users', { page, searchBy, keyword }],
    queryFn: async () =>
      await getCompanyUsers({
        page,
        pageSize: USERS_PAGE_SIZE,
        searchBy,
        keyword,
      }),
    throwOnError: true,
  })

  return query
}

export default useUsers
