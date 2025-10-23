import classNames from 'classnames/bind'
import styles from './ContractDocument.module.scss'
import { useFormContext } from 'react-hook-form'
import { useRef, useState } from 'react'
import Button from '@ui/shared/button/Button'
import uploadFile from './uploadFile'
import { AxiosErrorData, ContractDocumentEditFormInput, DocumentType } from '@shared/types'
import Icon from '@ui/shared/icon/Icon'
import { AxiosError } from 'axios'
import GlobalLoading from '@ui/shared/global-loading/GlobalLoading'

const cx = classNames.bind(styles)

type ContractDocumentEditFieldProps = {
  initialDocuments: DocumentType[]
}

const ContractDocumentEditField = ({ initialDocuments }: ContractDocumentEditFieldProps) => {
  const { setValue, watch } = useFormContext<ContractDocumentEditFormInput>()
  const contractDocuments = watch('contractDocuments')

  const [isLoading, setIsLoading] = useState(false)

  const [previewFiles, setPreviewFiles] = useState<DocumentType[]>(initialDocuments)

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
    <div className={cx('container')}>
      <div className={cx('previewFilesContainer')}>
        {previewFiles.map(({ id, fileName }) => (
          <div key={id} className={cx('item')}>
            <button type='button' onClick={() => handleRemoveFile(id)}>
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
      {isLoading && (
        <GlobalLoading hasBackDrop />
      )}
    </div>
  )
}

export default ContractDocumentEditField
