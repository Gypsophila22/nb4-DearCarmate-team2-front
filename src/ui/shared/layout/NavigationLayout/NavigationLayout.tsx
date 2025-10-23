import classNames from 'classnames/bind'
import styles from './NavigationLayout.module.scss'
import GNB from '@ui/shared/gnb/GNB'
import SideNav from '../../side-nav/SideNav'

const cx = classNames.bind(styles)

type NavigationLayoutProps = {
  children: React.ReactNode
}

const NavigationLayout = ({ children }: NavigationLayoutProps) => {
  return (
    <>
      <GNB />
      <div className={cx('container')}>
        <SideNav />
        <div className={cx('contentWrapper')}>
          {children}
        </div>
      </div>
    </>
  )
}

export default NavigationLayout
