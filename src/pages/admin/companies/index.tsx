import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import classNames from 'classnames/bind'
import styles from './index.module.scss'
import convertKeywordParamToString from '@ui/shared/util-util/convertKeywordParamToString'
import convertPageParamToNumber from '@ui/shared/util-util/convertPageParamToNumber'
import PageLayout from '@ui/shared/layout/PageLayout/PageLayout'
import { SearchByCompany } from '@shared/types'
import SearchBar from '@ui/shared/search-bar/SearchBar'
import { SEARCH_BY_COMPANY_FILTERS } from '@ui/shared/dropdown/constants'
import CompanyRegisterButton from '@ui/company/feature-companies/CompanyRegisterButton'
import CompanyList from '@ui/company/feature-companies/CompanyList'
import Head from 'next/head'
import getPageTitle from '@ui/shared/util-util/getPageTitle'

const cx = classNames.bind(styles)

type CompanyListPageProps = {
  searchBy: SearchByCompany
  keyword: string
  page: number
}

const CompanyListPage = ({ searchBy, keyword, page }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  return (
    <>
      <Head>
        <title>{getPageTitle('기업 목록')}</title>
      </Head>
      <PageLayout title='기업 목록'>
        <div className={cx('header')}>
          <SearchBar
            initialSearchBy={searchBy}
            initialKeyword={keyword}
            searchByFilters={SEARCH_BY_COMPANY_FILTERS}
            otherParams={[{ name: 'page', value: 1 }]}
          />
          <CompanyRegisterButton />
        </div>
        <CompanyList searchBy={searchBy} keyword={keyword} page={page} />
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
  const searchBy = SearchByCompany[searchByParam as keyof typeof SearchByCompany] || SearchByCompany['companyName']
  const keyword = convertKeywordParamToString(keywordParam)
  const page = convertPageParamToNumber(pageParam)
  return {
    props: {
      searchBy,
      keyword,
      page,
    },
  }
}) satisfies GetServerSideProps<CompanyListPageProps>

export default CompanyListPage
