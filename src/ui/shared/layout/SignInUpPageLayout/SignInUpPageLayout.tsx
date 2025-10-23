import classNames from 'classnames/bind'
import styles from './SignInUpPageLayout.module.scss'
import { PropsWithChildren } from 'react'
import Image from 'next/image'

const cx = classNames.bind(styles)

type SignInUpPageLayoutProps = {

}

const SignInUpPageLayout = ({ children }: PropsWithChildren<SignInUpPageLayoutProps>) => {
  return (
    <div className={cx('pageWrapper')}>
      <div className={cx('contentContainer')}>
        <div className={cx('logoWrapper')}>
          <Image className={cx('logo')} src='/images/logo.png' width={325} height={80} alt='디어카메이트 로고' priority />
        </div>
        {children}
      </div>
    </div>
  )
}

export default SignInUpPageLayout
