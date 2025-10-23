import Button from '@ui/shared/button/Button'
import ErrorPageLayout from '@ui/shared/layout/ErrorPageLayout/ErrorPageLayout'
import getPageTitle from '@ui/shared/util-util/getPageTitle'
import Head from 'next/head'
import { useRouter } from 'next/router'

type NotFoundPageProps = {

}

const NotFoundPage = ({ }: NotFoundPageProps) => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{getPageTitle('Page Not Found')}</title>
      </Head>
      <ErrorPageLayout
        statusCode={404}
        title='찾을 수 없는 페이지입니다.'
        message='요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.'
        leftButton={<Button size='large' theme='red' onClick={() => router.back()}>뒤로 가기</Button>}
        rightButton={<Button size='large' theme='outline' onClick={() => router.push('/')}>홈으로 가기</Button>}
      />
    </>
  )
}

export default NotFoundPage
