import classNames from 'classnames/bind'
import styles from './ContractResolutionDateForm.module.scss'
import { ContractStatus } from '@shared/types'
import { FormProvider, useForm } from 'react-hook-form'
import FieldLabel from '@ui/shared/input/FieldLabel/FieldLabel'
import DatePickerConnect from '@ui/shared/form-field/DatePickerConnect'
import Button from '@ui/shared/button/Button'

const cx = classNames.bind(styles)

type ContractResolutionDateFormProps = {
  onSubmit: (data: { resolutionDate: string }) => void
  onCancel: () => void
  type: ContractStatus
}

const ContractResolutionDateForm = ({ onCancel, onSubmit, type }: ContractResolutionDateFormProps) => {
  const methods = useForm<{ resolutionDate: string }>()
  const { handleSubmit } = methods
  const typeText = type === ContractStatus.contractSuccessful ? '체결' : '종료'
  return (
    <FormProvider {...methods}>
      <form className={cx('container')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('input')}>
          <FieldLabel label={`계약 ${typeText}일`} required />
          <DatePickerConnect
            name='resolutionDate'
            placeholderText={`계약 ${typeText}일을 입력해주세요`}
            showTimeSelect
            rules={{
              required: '필수 입력사항입니다.',
            }}
          />
        </div>
        <div className={cx('buttonContainer')}>
          <Button onClick={onCancel} type='button' size='small' theme='gray'>취소</Button>
          <Button type='submit' size='small' theme='red'>등록</Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ContractResolutionDateForm
