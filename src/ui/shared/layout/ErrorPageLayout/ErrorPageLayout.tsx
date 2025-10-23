import classNames from 'classnames/bind'
import styles from './ErrorPageLayout.module.scss'

const cx = classNames.bind(styles)

type ErrorPageLayoutProps = {
  statusCode: number | string
  title?: string
  message?: string
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode
}

const ErrorPageLayout = ({ statusCode, message, title, leftButton, rightButton }: ErrorPageLayoutProps) => {
  return (
    <div className={cx('pageWrapper')}>
      <div className={cx('contentContainer')}>
        <h1 className={cx('statusCode')}>{statusCode}</h1>
        <div className={cx('description')}>
          {title && <p className={cx('title')}>{title}</p>}
          <p className={cx('message')}>{message || '알 수 없는 에러가 발생했습니다.'}</p>
        </div>
        <div className={cx('buttonContainer')}>
          <div className={cx('buttonWrapper')}>
            {leftButton}
          </div>
          <div className={cx('buttonWrapper')}>
            {rightButton}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPageLayout
