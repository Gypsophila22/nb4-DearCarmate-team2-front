import classNames from 'classnames/bind'
import styles from './ImageUploadConnect.module.scss'
import { Controller, useFormContext } from 'react-hook-form'
import uploadImage from './uploadImage'
import Icon from '@ui/shared/icon/Icon'
import Image from 'next/image'
import { useState } from 'react'
import GlobalLoading from '@ui/shared/global-loading/GlobalLoading'
import { AxiosError } from 'axios'
import { AxiosErrorData } from '@shared/types'

const cx = classNames.bind(styles)

type ImageUploadConnectProps = {
  name: string
}

const ImageUploadConnect = ({ name }: ImageUploadConnectProps) => {
  const { setValue } = useFormContext()
  const [isLoading, setIsLoading] = useState(false)

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setIsLoading(true)
      const imageUrl = await uploadImage(file)
      if (imageUrl) setValue(name, imageUrl)
    } catch (error) {
      const text = (error as AxiosError<AxiosErrorData>)?.response?.data?.message || '파일 업로드에 실패했습니다. 다시 시도해주세요.'
      alert(text)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Controller
        name={name}
        render={({ field: { value } }) => (
          <div className={cx('container')}>
            <div className={cx('imageWrapper')}>
              <Image
                src={value || '/images/default-profile.svg'}
                width={140}
                height={140}
                alt='프로필 이미지'
                className={cx('image')}
              />
            </div>
            {/* TODO-2: label 태그 eslint 에러 해결 */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              <input
                type='file'
                accept="image/*"
                hidden
                onChange={handleUploadImage}
              />
              <div className={cx('editButton')}>
                <Icon
                  name='edit-button'
                  width={48}
                  height={48}
                />
              </div>
            </label>
          </div>
        )}
      />
      {isLoading && (
        <GlobalLoading hasBackDrop />
      )}
    </div>
  )
}

export default ImageUploadConnect
