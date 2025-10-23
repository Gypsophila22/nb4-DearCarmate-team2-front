import Head from 'next/head'
import SignInUpPageLayout from '@ui/shared/layout/SignInUpPageLayout/SignInUpPageLayout'
import SignUpForm from '@ui/auth/feature-auth/SignUpForm'
import getPageTitle from '@ui/shared/util-util/getPageTitle'

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('회원가입')}</title>
      </Head>
      <SignInUpPageLayout>
        <SignUpForm />
      </SignInUpPageLayout>
    </>
  )
}

export default SignUpPage
