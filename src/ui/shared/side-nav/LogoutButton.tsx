import classNames from 'classnames/bind'
import styles from './LogoutButton.module.scss'
import { useRouter } from 'next/router'
import useUserStore from '@zustand/useUserStore'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { clearTokenCookies } from '@shared/auth'
import { setAuthorization } from '@shared/axios'

const cx = classNames.bind(styles)

const LogoutButton = () => {
  const router = useRouter()
  const resetUser = useUserStore.use.resetUser()
  const queryClient = useQueryClient()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleClickLogoutButton = async () => {
    setIsLoggingOut(true)
    clearTokenCookies()
    queryClient.clear()
    setAuthorization('')
    // 참고: 페이지 이동이 완료된 후 resetUser 호출
    await router.push('/signin')
    resetUser()
    setIsLoggingOut(false)
  }

  return (
    <button
      disabled={isLoggingOut}
      onClick={handleClickLogoutButton}
      className={cx('button')}
    >
      로그아웃
    </button>
  )
}

export default LogoutButton
