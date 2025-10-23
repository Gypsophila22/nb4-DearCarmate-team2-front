import classNames from 'classnames/bind'
import styles from './ContractDocumentDownloadForm.module.scss'
import { DocumentType } from '@shared/types'
import FieldLabel from '@ui/shared/input/FieldLabel/FieldLabel'
import Button from '@ui/shared/button/Button'
import { useState } from 'react'
import Icon from '@ui/shared/icon/Icon'

const cx = classNames.bind(styles)

type ContractDocumentDownloadFormProps = {
  documents: DocumentType[]
  onClose: () => void
  onDownload: (documents: DocumentType[]) => Promise<void>
}

const ContractDocumentDownloadForm = ({ documents, onClose, onDownload }: ContractDocumentDownloadFormProps) => {
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentType[]>([])

  const handleSelectFile = (document: DocumentType) => {
    setSelectedDocuments((prevDocuments) => [...prevDocuments, document])
  }

  const handleCancelSelectFile = (document: DocumentType) => {
    setSelectedDocuments((prevDocuments) => prevDocuments.filter((prevDocument) => prevDocument.id !== document.id))
  }

  return (
    <div className={cx('container')}>
      <FieldLabel label='계약서 목록' />
      <div className={cx('items')}>
        {documents.map((document) => {
          const selected = selectedDocuments.some((selectedDocument) => selectedDocument.id === document.id)
          return (
            <div key={document.id} className={cx('item')}>
              <button type='button' onClick={() => selected ? handleCancelSelectFile(document) : handleSelectFile(document)}>
                <Icon name={selected ? 'checkbox-active' : 'checkbox-inactive'} width={24} height={24} />
              </button>
              <div>{document.fileName}</div>
            </div>
          )
        })}
      </div>
      <div className={cx('buttonContainer')}>
        <Button onClick={onClose} type='button' size='small' theme='gray'>취소</Button>
        <Button onClick={() => onDownload(selectedDocuments)} size='small' theme='outline'>선택 다운로드</Button>
        <Button onClick={() => onDownload(documents)} size='small' theme='red'>일괄 다운로드</Button>
      </div>
    </div>
  )
}

export default ContractDocumentDownloadForm
