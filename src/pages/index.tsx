import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import classNames from 'classnames/bind'
import styles from './index.module.scss'
import convertKeywordParamToString from '@ui/shared/util-util/convertKeywordParamToString'
import PageLayout from '@ui/shared/layout/PageLayout/PageLayout'
import { SearchByContract } from '@shared/types'
import SearchBar from '@ui/shared/search-bar/SearchBar'
import { SEARCH_BY_CONTRACT_FILTERS } from '@ui/shared/dropdown/constants'
import ContractRegisterButton from '@ui/contract/feature-contracts/ContractRegisterButton'
import ContractsBoard from '@ui/contract/feature-contracts-board/ContractsBoard'
import Head from 'next/head'
import getPageTitle from '@ui/shared/util-util/getPageTitle'

const cx = classNames.bind(styles)

type ContractsBoardPageProps = {
  searchBy: SearchByContract
  keyword: string
}

const ContractsBoardPage = ({ searchBy, keyword }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  return (
    <>
      <Head>
        <title>{getPageTitle('계약 보드')}</title>
      </Head>
      <PageLayout title='계약 보드' pageMarginBottom='0px'>
        <div className={cx('header')}>
          <SearchBar
            initialSearchBy={searchBy}
            initialKeyword={keyword}
            searchByFilters={SEARCH_BY_CONTRACT_FILTERS}
          />
          <ContractRegisterButton />
        </div>
        <ContractsBoard searchBy={searchBy} keyword={keyword} />
      </PageLayout>
    </>
  )
}

export const getServerSideProps = (async ({ query }) => {
  const {
    searchBy: searchByParam,
    keyword: keywordParam,
  } = query
  const searchBy = SearchByContract[searchByParam as keyof typeof SearchByContract] || SearchByContract['customerName']
  const keyword = convertKeywordParamToString(keywordParam)
  return {
    props: {
      searchBy,
      keyword,
    },
  }
}) satisfies GetServerSideProps<ContractsBoardPageProps>

export default ContractsBoardPage
