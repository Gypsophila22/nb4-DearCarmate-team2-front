import SignInForm from '@ui/auth/feature-auth/SignInForm'
import SignInUpPageLayout from '@ui/shared/layout/SignInUpPageLayout/SignInUpPageLayout'
import getPageTitle from '@ui/shared/util-util/getPageTitle'
import Head from 'next/head'

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('로그인')}</title>
      </Head>
      <SignInUpPageLayout>
        <SignInForm />
      </SignInUpPageLayout>
    </>
  )
}

export default SignInPage
