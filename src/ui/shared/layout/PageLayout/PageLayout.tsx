import classNames from 'classnames/bind'
import styles from './PageLayout.module.scss'
import { PropsWithChildren } from 'react'

const cx = classNames.bind(styles)

type PageLayoutProps = {
  title: string
  titleMarginBottom?: string
  pageMarginBottom?: string
}

const PageLayout = ({ children, title, titleMarginBottom, pageMarginBottom }: PropsWithChildren<PageLayoutProps>) => {
  return (
    <div className={cx('container')} style={{ marginBottom: pageMarginBottom }}>
      <h1 className={cx('title')} style={{ marginBottom: titleMarginBottom }}>{title}</h1>
      {children}
    </div>
  )
}

export default PageLayout
