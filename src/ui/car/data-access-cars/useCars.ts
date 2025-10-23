import { CARS_PAGE_SIZE } from '@ui/shared/pagination/constants'
import { CarStatusParam, SearchByCar } from '@shared/types'
import { useQuery } from '@tanstack/react-query'
import { getCars } from '@shared/api'

const useCars = ({
  page,
  searchBy,
  keyword,
  status,
}: {
  page: number
  searchBy: SearchByCar
  keyword: string
  status: CarStatusParam
}) => {
  const query = useQuery({
    queryKey: ['cars', { page, searchBy, keyword, status }],
    queryFn: async () =>
      await getCars({
        page,
        pageSize: CARS_PAGE_SIZE,
        searchBy,
        keyword,
        status,
      }),
    throwOnError: true,
  })

  return query
}

export default useCars
