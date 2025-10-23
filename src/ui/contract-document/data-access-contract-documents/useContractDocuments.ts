import { getContractDocuments } from '@shared/api'
import {
  SearchByContractDocument,
} from '@shared/types'
import { useQuery } from '@tanstack/react-query'
import { CONTRACT_DOCUMENTS_PAGE_SIZE } from '@ui/shared/pagination/constants'

const useContractDocuments = ({
  page,
  searchBy,
  keyword,
}: {
  page: number
  searchBy: SearchByContractDocument
  keyword: string
}) => {
  const query = useQuery({
    queryKey: ['contractDocuments', { page, searchBy, keyword }],
    // 참고: 현재 resolutionDate가 struct와 다르게 nullable 하기 때문에 테스트로 확인 가능
    queryFn: async () =>
      await getContractDocuments({
        page,
        pageSize: CONTRACT_DOCUMENTS_PAGE_SIZE,
        searchBy,
        keyword,
      }),
    throwOnError: true,
  })

  return query
}

export default useContractDocuments
