import { useQuery } from '@tanstack/react-query'
import { getCarModels } from '@shared/api'

const useCarModels = () => {
  const query = useQuery({
    queryKey: ['carModels'],
    queryFn: async () => {
      const response = await getCarModels()
      return response.data
    },
    throwOnError: true,
  })

  return query
}

export default useCarModels
