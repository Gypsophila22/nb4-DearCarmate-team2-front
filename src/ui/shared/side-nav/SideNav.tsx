import classNames from 'classnames/bind'
import styles from './SideNav.module.scss'
import { SIDE_NAV_MENUS_ADMIN, SIDE_NAV_MENUS_USER } from './constants'
import Link from 'next/link'
import Icon from '@ui/shared/icon/Icon'
import { useRouter } from 'next/router'
import LogoutButton from './LogoutButton'
import useUserStore from '@zustand/useUserStore'

const cx = classNames.bind(styles)

type SideNavProps = {

}

const SideNav = ({ }: SideNavProps) => {
  const router = useRouter()
  const { isAdmin } = useUserStore.use.user()

  return (
    <aside className={cx('container')}>
      <ul className={cx('menuContainer')}>
        {(isAdmin ? SIDE_NAV_MENUS_ADMIN : SIDE_NAV_MENUS_USER).map((menu) => {
          const active = router.asPath.split('?')[0] === menu.url
          return (
            <Link key={menu.url} href={menu.url}>
              {/* 참고: 페이지가 404여도 asPath는 브라우저의 path 그대로 나타내기 때문에 pathname이 아닌 asPath 사용함 */}
              <li className={cx('menu', { active })}>
                <Icon name={active ? menu.icon.active : menu.icon.inactive} width={16} height={16} />
                <span>{menu.text}</span>
              </li>
            </Link>
          )
        })}
      </ul>
      <LogoutButton />
    </aside>
  )
}

export default SideNav
