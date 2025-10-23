import classNames from 'classnames/bind'
import styles from './ContractDocumentForm.module.scss'
import { FormProvider, useForm } from 'react-hook-form'
import { ContractDocumentRegisterFormInput } from '@shared/types'
import FieldLabel from '@ui/shared/input/FieldLabel/FieldLabel'
import Button from '@ui/shared/button/Button'
import DropdownConncet from '@ui/shared/form-field/DropdownConncet'
import useDrafts from '@ui/contract-document/data-access-drafts/useDrafts'
import ContractDocumentRegisterConnect from '@ui/shared/form-field/ContractDocument/ContractDocumentRegisterConnect'

const cx = classNames.bind(styles)

type ContractDocumentRegisterFormProps = {
  onClose: () => void
  onSubmit: (data: ContractDocumentRegisterFormInput) => void
}

const ContractDocumentRegisterForm = ({ onClose, onSubmit }: ContractDocumentRegisterFormProps) => {
  const methods = useForm<ContractDocumentRegisterFormInput>({ defaultValues: { contractDocuments: [] } })
  const { handleSubmit } = methods

  const { data: draftsData = [] } = useDrafts()

  return (
    <FormProvider {...methods}>
      <form className={cx('container')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('inputs')}>
          <div className={cx('input')}>
            <FieldLabel label='거래 선택' required />
            <DropdownConncet
              name='id'
              filters={draftsData.map(({ id, data }) => ({ text: data, data: id }))}
              label='거래 선택'
              rules={{
                required: '필수 입력사항입니다.',
              }}
              hasSearch
              searchInputPlaceholder='거래를 검색해주세요'
            />
          </div>
          <div className={cx('input')}>
            <FieldLabel label='계약서 목록' required />
            <ContractDocumentRegisterConnect />
          </div>
        </div>
        <div className={cx('buttonContainer')}>
          <Button onClick={onClose} type='button' size='small' theme='gray'>취소</Button>
          <Button type='submit' size='small' theme='red'>등록</Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ContractDocumentRegisterForm
