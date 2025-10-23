import { getCar, getCarsForContract } from '@shared/api'
import { useQuery } from '@tanstack/react-query'

const useCarsForContract = (carId?: number) => {
  const query = useQuery({
    queryKey: ['carsForContract', carId],
    queryFn: async () => {
      const [currentCar, possessionCarItems] = await Promise.all([
        carId ? getCar(carId) : null,
        getCarsForContract(),
      ])

      return currentCar ? [
        {
          id: currentCar.id,
          data: `${currentCar.model}(${currentCar.carNumber}) (현재 차량)`,
        },
        ...possessionCarItems,
      ] : possessionCarItems
    },
    throwOnError: true,
  })

  return query
}

export default useCarsForContract
