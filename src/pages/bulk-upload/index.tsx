import BulkUpload from '@ui/bulk-upload/feature-bulk-upload/BulkUpload'
import PageLayout from '@ui/shared/layout/PageLayout/PageLayout'
import getPageTitle from '@ui/shared/util-util/getPageTitle'
import Head from 'next/head'

type BulkUploadPageProps = {

}

const BulkUploadPage = ({ }: BulkUploadPageProps) => {

  return (
    <>
      <Head>
        <title>{getPageTitle('대용량 업로드')}</title>
      </Head>
      <PageLayout title='대용량 업로드'>
        <BulkUpload />
      </PageLayout>
    </>
  )
}

export default BulkUploadPage
