import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import classNames from 'classnames/bind'
import styles from './index.module.scss'
import convertKeywordParamToString from '@ui/shared/util-util/convertKeywordParamToString'
import convertPageParamToNumber from '@ui/shared/util-util/convertPageParamToNumber'
import PageLayout from '@ui/shared/layout/PageLayout/PageLayout'
import { SearchByCustomer } from '@shared/types'
import SearchBar from '@ui/shared/search-bar/SearchBar'
import { SEARCH_BY_CUSTOMER_FILTERS } from '@ui/shared/dropdown/constants'
import Button from '@ui/shared/button/Button'
import { useRouter } from 'next/router'
import CustomersInfo from '@ui/customer/feature-customers-info/CustomersInfo'
import CustomerRegisterButton from '@ui/customer/feature-customers/CustomerRegisterButton'
import Head from 'next/head'
import getPageTitle from '@ui/shared/util-util/getPageTitle'

const cx = classNames.bind(styles)

type CustomersInfoPageProps = {
  searchBy: SearchByCustomer
  keyword: string
  page: number
}

const CustomersInfoPage = ({ searchBy, keyword, page }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{getPageTitle('고객 정보')}</title>
      </Head>
      <PageLayout title='고객 정보'>
        <div className={cx('header')}>
          <SearchBar
            initialSearchBy={searchBy}
            initialKeyword={keyword}
            searchByFilters={SEARCH_BY_CUSTOMER_FILTERS}
            otherParams={[{ name: 'page', value: 1 }]}
          />
          <div className={cx('buttonContainer')}>
            <CustomerRegisterButton />
            <Button
              onClick={() => router.push('/bulk-upload')}
              size='small'
              theme='red'
            >대용량 등록
            </Button>
          </div>
        </div>
        <CustomersInfo keyword={keyword} page={page} searchBy={searchBy} />
      </PageLayout>
    </>
  )
}

export const getServerSideProps = (async ({ query }) => {
  const {
    searchBy: searchByParam,
    keyword: keywordParam,
    page: pageParam,
  } = query
  const searchBy = SearchByCustomer[searchByParam as keyof typeof SearchByCustomer] || SearchByCustomer['name']
  const keyword = convertKeywordParamToString(keywordParam)
  const page = convertPageParamToNumber(pageParam)
  return {
    props: {
      searchBy,
      keyword,
      page,
    },
  }
}) satisfies GetServerSideProps<CustomersInfoPageProps>

export default CustomersInfoPage
