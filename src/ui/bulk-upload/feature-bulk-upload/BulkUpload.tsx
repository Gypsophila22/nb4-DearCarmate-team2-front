import { useState } from 'react'
import { AxiosError } from 'axios'
import classNames from 'classnames/bind'
import Image from 'next/image'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import GlobalLoading from '@ui/shared/global-loading/GlobalLoading'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosErrorData } from '@shared/types'
import { bulkUploadCars, bulkUploadCustomers } from '@shared/api'
import styles from './BulkUpload.module.scss'

const cx = classNames.bind(styles)

const BulkUpload = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const boxLeftPercentage = (selectedTabIndex / 2) * 100
  const { openConfirmModal } = useConfirmModal()
  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = useState(false)

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return
      setIsLoading(true)
      const formData = new FormData()
      formData.append('file', file)
      const bulkUpload =
        selectedTabIndex === 0 ? bulkUploadCustomers : bulkUploadCars
      await bulkUpload(formData)
      openConfirmModal({ text: '파일 업로드에 성공했습니다.' })
      queryClient.invalidateQueries({
        queryKey: selectedTabIndex === 0 ? ['customers'] : ['cars'],
      })
    } catch (error) {
      const text =
        (error as AxiosError<AxiosErrorData>)?.response?.data?.message ||
        '파일 업로드에 실패했습니다.'
      openConfirmModal({ text })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cx('container')}>
      <div className={cx('tabContainer')}>
        <button
          type="button"
          onClick={() => setSelectedTabIndex(0)}
          className={cx('tab', { active: selectedTabIndex === 0 })}
        >
          고객 데이터
        </button>
        <button
          type="button"
          onClick={() => setSelectedTabIndex(1)}
          className={cx('tab', { active: selectedTabIndex === 1 })}
        >
          차량 데이터
        </button>
        <div className={cx('box')} style={{ left: `${boxLeftPercentage}%` }} />
      </div>
      <div className={cx('body')}>
        <label className={cx('input')}>
          <input type="file" accept=".csv" hidden onChange={handleUploadFile} />
          <div className={cx('content')}>
            <Image
              src="/images/upload.png"
              width={60}
              height={60}
              alt="업로드 아이콘 이미지"
            />
            <div className={cx('text')}>CSV 파일을 업로드할 수 있습니다.</div>
          </div>
        </label>
      </div>
      {isLoading && <GlobalLoading hasBackDrop />}
    </div>
  )
}

export default BulkUpload
