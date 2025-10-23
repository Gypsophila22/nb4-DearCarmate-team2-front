import PageLayout from '@ui/shared/layout/PageLayout/PageLayout'
import getPageTitle from '@ui/shared/util-util/getPageTitle'
import ProfileForm from '@ui/user/feature-profile/ProfileForm'
import Head from 'next/head'

type AccountPageProps = {

}

const AccountPage = ({ }: AccountPageProps) => {

  return (
    <>
      <Head>
        <title>{getPageTitle('개인정보 수정')}</title>
      </Head>
      <PageLayout title='개인정보 수정'>
        <ProfileForm />
      </PageLayout>
    </>
  )
}

export default AccountPage
