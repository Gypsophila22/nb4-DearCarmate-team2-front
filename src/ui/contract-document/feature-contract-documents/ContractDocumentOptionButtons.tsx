import classNames from 'classnames/bind'
import Icon from '@ui/shared/icon/Icon'
import {
  ContractDocumentEditFormInput,
  ContractDocumentType,
  DocumentType,
} from '@shared/types'
import useFormModal from '@ui/shared/modal/form-modal/useFormModal'
import { downloadContractDocument } from '@shared/api'
import ContractDocumentEditForm from '../feature-contract-document-form/ContractDocumentEditForm'
import useEditContractDocument from '../data-access-contract-document-form/useEditContractDocument'
import ContractDocumentDownloadForm from '../feature-contract-document-form/ContractDocumentDownloadForm'
import styles from './ContractDocumentOptionButtons.module.scss'

const cx = classNames.bind(styles)

type ContractDocumentOptionButtonsProps = {
  contractDocument: ContractDocumentType
}

const ContractDocumentOptionButtons = ({
  contractDocument,
}: ContractDocumentOptionButtonsProps) => {
  const { closeFormModal, openFormModal } = useFormModal()
  const { mutate: editContractDocument } = useEditContractDocument()

  const { id, documents } = contractDocument

  const handleEditContractDocument = (data: ContractDocumentEditFormInput) => {
    editContractDocument({ id, data })
    closeFormModal()
  }

  const downloadDocument = async (d: DocumentType) => {
    const response = await downloadContractDocument(d.id)
    const url = window.URL.createObjectURL(new Blob([response]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', d.fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadContractDocument = async (documents: DocumentType[]) => {
    Promise.all(documents.map(downloadDocument))
    closeFormModal()
  }

  return (
    <div className={cx('container')}>
      <button
        className={cx('button')}
        onClick={() => {
          openFormModal({
            title: '계약서 다운로드',
            form: (
              <ContractDocumentDownloadForm
                documents={documents}
                onClose={closeFormModal}
                onDownload={handleDownloadContractDocument}
              />
            ),
          })
        }}
      >
        <Icon name="download" width={24} height={24} />
      </button>
      <button
        className={cx('button')}
        onClick={() => {
          openFormModal({
            title: '계약서 수정',
            form: (
              <ContractDocumentEditForm
                initialDocuments={documents}
                onClose={closeFormModal}
                onSubmit={handleEditContractDocument}
              />
            ),
          })
        }}
      >
        <Icon name="edit" width={24} height={24} />
      </button>
    </div>
  )
}

export default ContractDocumentOptionButtons
