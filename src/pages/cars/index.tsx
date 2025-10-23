import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import classNames from 'classnames/bind'
import styles from './index.module.scss'
import convertKeywordParamToString from '@ui/shared/util-util/convertKeywordParamToString'
import convertPageParamToNumber from '@ui/shared/util-util/convertPageParamToNumber'
import PageLayout from '@ui/shared/layout/PageLayout/PageLayout'
import { CarStatusParam, SearchByCar } from '@shared/types'
import CarsInfo from '@ui/car/feature-cars-info/CarsInfo'
import SearchBar from '@ui/shared/search-bar/SearchBar'
import { SEARCH_BY_CAR_FILTERS } from '@ui/shared/dropdown/constants'
import Button from '@ui/shared/button/Button'
import { useRouter } from 'next/router'
import CarRegisterButton from '@ui/car/feature-cars/CarRegisterButton'
import CarFilterDropdown from '@ui/car/feature-cars/CarFilterDropdown'
import Head from 'next/head'
import getPageTitle from '@ui/shared/util-util/getPageTitle'

const cx = classNames.bind(styles)

type CarsInfoPageProps = {
  searchBy: SearchByCar
  keyword: string
  page: number
  status: CarStatusParam
}

const CarsInfoPage = ({ searchBy, keyword, page, status }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{getPageTitle('차량 정보')}</title>
      </Head>
      <PageLayout title='차량 정보'>
        <div className={cx('header')}>
          <div className={cx('left')}>
            <CarFilterDropdown initialStatus={status} />
            <SearchBar
              initialSearchBy={searchBy}
              initialKeyword={keyword}
              searchByFilters={SEARCH_BY_CAR_FILTERS}
              otherParams={[{ name: 'page', value: 1 }, { name: 'status', value: status }]}
            />
          </div>
          <div className={cx('buttonContainer')}>
            <CarRegisterButton />
            <Button
              onClick={() => router.push('/bulk-upload')}
              size='small'
              theme='red'
            >대용량 등록
            </Button>
          </div>
        </div>
        <CarsInfo
          searchBy={searchBy}
          keyword={keyword}
          page={page}
          status={status}
        />
      </PageLayout>
    </>
  )
}

export const getServerSideProps = (async ({ query }) => {
  const {
    searchBy: searchByParam,
    keyword: keywordParam,
    page: pageParam,
    status: statusParam,
  } = query
  const searchBy = SearchByCar[searchByParam as keyof typeof SearchByCar] || SearchByCar['carNumber']
  const keyword = convertKeywordParamToString(keywordParam)
  const page = convertPageParamToNumber(pageParam)
  const status = CarStatusParam[statusParam as keyof typeof CarStatusParam] || CarStatusParam['total']
  return {
    props: {
      searchBy,
      keyword,
      page,
      status,
    },
  }
}) satisfies GetServerSideProps<CarsInfoPageProps>

export default CarsInfoPage
