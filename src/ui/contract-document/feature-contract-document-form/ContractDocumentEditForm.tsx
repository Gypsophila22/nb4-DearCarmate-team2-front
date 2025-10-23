import classNames from 'classnames/bind'
import styles from './ContractDocumentForm.module.scss'
import { FormProvider, useForm } from 'react-hook-form'
import { ContractDocumentEditFormInput, DocumentType } from '@shared/types'
import FieldLabel from '@ui/shared/input/FieldLabel/FieldLabel'
import Button from '@ui/shared/button/Button'
import ContractDocumentEditField from '@ui/shared/form-field/ContractDocument/ContractDocumentEditField'

const cx = classNames.bind(styles)

type ContractDocumentEditFormProps = {
  initialDocuments: DocumentType[]
  onClose: () => void
  onSubmit: (data: ContractDocumentEditFormInput) => void
}

const ContractDocumentEditForm = ({ initialDocuments, onClose, onSubmit }: ContractDocumentEditFormProps) => {
  const methods = useForm<ContractDocumentEditFormInput>({ defaultValues: { contractDocuments: initialDocuments } })
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form className={cx('container')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('inputs')}>
          <div className={cx('input')}>
            <FieldLabel label='계약서 목록' />
            <ContractDocumentEditField initialDocuments={initialDocuments} />
          </div>
        </div>
        <div className={cx('buttonContainer')}>
          <Button onClick={onClose} type='button' size='small' theme='gray'>취소</Button>
          <Button type='submit' size='small' theme='red'>수정</Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ContractDocumentEditForm
