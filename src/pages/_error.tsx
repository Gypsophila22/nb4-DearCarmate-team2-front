/* eslint-disable react/prop-types */
import Button from '@ui/shared/button/Button'
import ErrorPageLayout from '@ui/shared/layout/ErrorPageLayout/ErrorPageLayout'
import getPageTitle from '@ui/shared/util-util/getPageTitle'
import { AxiosErrorData } from '@shared/types'
import { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

type ErrorProps = {
  err: (Error & {
    statusCode?: number | undefined;
  }) | AxiosError<AxiosErrorData> | null | undefined
}

const Error: NextPage<ErrorProps> = ({ err }) => {
  const router = useRouter()

  let errorCode
  let errorMessage: string
  if (isAxiosError(err)) {
    const { status, data } = err.response as AxiosResponse
    errorCode = status
    errorMessage = data?.message || '알 수 없는 에러가 발생했습니다.'
  } else if (err) {
    errorCode = err.statusCode ?? 'Error'
    errorMessage = err.message
  } else {
    errorCode = 404
    errorMessage = '알 수 없는 에러가 발생했습니다.'
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('An Error Occurred')}</title>
      </Head>
      <ErrorPageLayout
        statusCode={errorCode}
        message={errorMessage}
        leftButton={<Button size='large' theme='red' onClick={() => router.reload()}>새로 고침</Button>}
        rightButton={<Button size='large' theme='outline' onClick={() => router.push('/')}>홈으로 가기</Button>}
      />
    </>
  )
}

Error.getInitialProps = ({ err }: NextPageContext) => {
  return { err }
}

export default Error
