import classNames from 'classnames/bind'
import styles from './ContractDocument.module.scss'
import { Controller, useFormContext } from 'react-hook-form'
import { useRef, useState } from 'react'
import GlobalLoading from '@ui/shared/global-loading/GlobalLoading'
import Button from '@ui/shared/button/Button'
import uploadFile from './uploadFile'
import { AxiosErrorData, ContractDocumentRegisterFormInput, DocumentType } from '@shared/types'
import Icon from '@ui/shared/icon/Icon'
import Hint from '@ui/shared/input/Hint/Hint'
import { AxiosError } from 'axios'

const cx = classNames.bind(styles)

type ContractDocumentRegisterConnectProps = {
}

const ContractDocumentRegisterConnect = ({ }: ContractDocumentRegisterConnectProps) => {
  const { setValue, watch } = useFormContext<ContractDocumentRegisterFormInput>()
  const contractDocuments = watch('contractDocuments')
  const [isLoading, setIsLoading] = useState(false)
  const [previewFiles, setPreviewFiles] = useState<DocumentType[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setIsLoading(true)
      const id = await uploadFile(file)
      setValue('contractDocuments', [...contractDocuments, { id, fileName: file.name }])
      setPreviewFiles([...previewFiles, { id, fileName: file.name }])
    } catch (error) {
      const text = (error as AxiosError<AxiosErrorData>)?.response?.data?.message || '파일 업로드에 실패했습니다. 다시 시도해주세요.'
      alert(text)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveFile = (id: number) => {
    setValue('contractDocuments', contractDocuments.filter((contractDocument) => contractDocument.id !== id))
    setPreviewFiles(previewFiles.filter((file) => file.id !== id))
  }

  return (
    <div>
      <Controller
        name='contractDocuments'
        rules={{
          validate: (value) => value.length > 0 || '계약서를 1개 이상 등록해주세요.',
        }}
        render={({ fieldState: { error } }) => (
          <div className={cx('container')}>
            <div className={cx('previewFilesContainer')}>
              {previewFiles.map(({ id, fileName }) => (
                <div key={id} className={cx('item')}>
                  <button onClick={() => handleRemoveFile(id)}>
                    <Icon name='checkbox-minus' width={24} height={24} />
                  </button>
                  <div>{fileName}</div>
                </div>
              ))}
            </div>
            <label>
              <input
                ref={inputRef}
                type='file'
                accept="*"
                hidden
                onChange={handleUploadFile}
              />
              <Button
                size='large'
                theme='outline'
                type='button'
                onClick={() => inputRef.current?.click()}
              >+ 파일 추가
              </Button>
            </label>
            {error?.message && (<Hint message={error.message} />)}
          </div>
        )}
      />
      {isLoading && (
        <GlobalLoading hasBackDrop />
      )}
    </div>
  )
}

export default ContractDocumentRegisterConnect
