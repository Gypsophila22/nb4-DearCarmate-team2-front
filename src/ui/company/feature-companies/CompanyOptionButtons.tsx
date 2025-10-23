import classNames from 'classnames/bind'
import styles from './CompanyOptionButtons.module.scss'
import Icon from '@ui/shared/icon/Icon'
import { CompanyFormInput, CompanyType } from '@shared/types'
import useFormModal from '@ui/shared/modal/form-modal/useFormModal'
import useConfirmDeleteModal from '@ui/shared/modal/confirm-delete-modal/useConfirmDeleteModal'
import CompanyForm from '../feature-company-form/CompanyForm'
import useEditCompany from '../data-access-company-form/useEditCompany'
import useDeleteCompany from '../data-access-company-form/useDeleteCompany'

const cx = classNames.bind(styles)

type CompanyOptionButtonsProps = {
  company: CompanyType
}

const CompanyOptionButtons = ({ company }: CompanyOptionButtonsProps) => {
  const { closeFormModal, openFormModal } = useFormModal()
  const { openConfirmDeleteModal } = useConfirmDeleteModal()
  const { mutate: editCompany } = useEditCompany()
  const { mutate: deleteCompany } = useDeleteCompany()

  const { id, companyCode, companyName } = company

  const handleEditCompany = (data: CompanyFormInput) => {
    editCompany({ data, id })
    closeFormModal()
  }

  return (
    <div className={cx('container')}>
      <button
        className={cx('button')}
        onClick={() => {
          openFormModal({
            title: '기업 수정',
            form: <CompanyForm defaultValues={{ companyName, companyCode }} onSubmit={handleEditCompany} onCancel={closeFormModal} />,
          })
        }}
      >
        <Icon name='edit' width={24} height={24} />
      </button>
      <button
        className={cx('button')}
        onClick={() => {
          openConfirmDeleteModal({
            deleteType: '기업',
            itemName: `${companyName} 기업`,
            onSubmit: () => deleteCompany(id),
          })
        }}
      >
        <Icon name='delete' width={24} height={24} />
      </button>
    </div>
  )
}

export default CompanyOptionButtons
