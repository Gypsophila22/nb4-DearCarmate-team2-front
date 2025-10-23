import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames/bind'
import useUserStore from '@zustand/useUserStore'
import { getUserInfo as getUserInfoAPI } from '@shared/api'
import styles from './GNB.module.scss'

const cx = classNames.bind(styles)

const GNB = () => {
  const user = useUserStore.use.user()
  const setUser = useUserStore.use.setUser()
  const {
    imageUrl,
    name,
    company: { companyName },
  } = user

  useEffect(() => {
    let isCancelled = false

    const getUserInfo = async () => {
      if (user.id !== -1) return
      const response = await getUserInfoAPI()
      if (!isCancelled) {
        setUser(response)
      }
    }
    getUserInfo()

    return () => {
      isCancelled = true
    }
  }, [setUser, user.id])

  return (
    <nav className={cx('container')}>
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="로고"
          width={130}
          height={32}
          priority
        />
      </Link>
      <Link href="/account" className={cx('profile')}>
        <Image
          src={imageUrl ?? '/images/default-profile.svg'}
          alt="프로필 이미지"
          width={36}
          height={36}
          className={cx('image')}
        />
        <div className={cx('text')}>
          <span className={cx('name')}>{name}</span>
          <span className={cx('company')}>{companyName}</span>
        </div>
      </Link>
    </nav>
  )
}

export default GNB
