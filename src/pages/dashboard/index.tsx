import PageLayout from '@ui/shared/layout/PageLayout/PageLayout'
import Dashboard from '@ui/dashboard/feature-dashboard/Dashboard'
import Head from 'next/head'
import getPageTitle from '@ui/shared/util-util/getPageTitle'

type DashboardPageProps = {
}

const DashboardPage = ({ }: DashboardPageProps) => {

  return (
    <>
      <Head>
        <title>{getPageTitle('대시 보드')}</title>
      </Head>
      <PageLayout title='대시 보드'>
        <Dashboard />
      </PageLayout>
    </>
  )
}

export default DashboardPage
