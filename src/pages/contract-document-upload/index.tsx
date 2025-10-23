import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import classNames from 'classnames/bind'
import styles from './index.module.scss'
import convertKeywordParamToString from '@ui/shared/util-util/convertKeywordParamToString'
import convertPageParamToNumber from '@ui/shared/util-util/convertPageParamToNumber'
import PageLayout from '@ui/shared/layout/PageLayout/PageLayout'
import { SearchByContractDocument } from '@shared/types'
import SearchBar from '@ui/shared/search-bar/SearchBar'
import { SEARCH_BY_CONTRACT_DOCUMENTS_FILTERS } from '@ui/shared/dropdown/constants'
import ContractDocumentRegisterButton from '@ui/contract-document/feature-contract-documents/ContractDocumentRegisterButton'
import ContractDocumentList from '@ui/contract-document/feature-contract-documents/ContractDocumentList'
import Head from 'next/head'
import getPageTitle from '@ui/shared/util-util/getPageTitle'

const cx = classNames.bind(styles)

type ContractDocumentUploadPageProps = {
  searchBy: SearchByContractDocument
  keyword: string
  page: number
}

const ContractDocumentUploadPage = ({ searchBy, keyword, page }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  return (
    <>
      <Head>
        <title>{getPageTitle('계약서 업로드')}</title>
      </Head>
      <PageLayout title='계약서 업로드'>
        <div className={cx('header')}>
          <SearchBar
            initialSearchBy={searchBy}
            initialKeyword={keyword}
            searchByFilters={SEARCH_BY_CONTRACT_DOCUMENTS_FILTERS}
            otherParams={[{ name: 'page', value: 1 }]}
          />
          <ContractDocumentRegisterButton />
        </div>
        <ContractDocumentList searchBy={searchBy} keyword={keyword} page={page} />
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
  const searchBy = SearchByContractDocument[searchByParam as keyof typeof SearchByContractDocument] || SearchByContractDocument['contractName']
  const keyword = convertKeywordParamToString(keywordParam)
  const page = convertPageParamToNumber(pageParam)
  return {
    props: {
      searchBy,
      keyword,
      page,
    },
  }
}) satisfies GetServerSideProps<ContractDocumentUploadPageProps>

export default ContractDocumentUploadPage
