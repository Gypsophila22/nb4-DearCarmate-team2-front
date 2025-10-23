import classNames from 'classnames/bind'
import styles from './ContractPriceEditForm.module.scss'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { ContractType } from '@shared/types'
import FieldLabel from '@ui/shared/input/FieldLabel/FieldLabel'
import Button from '@ui/shared/button/Button'
import TextField from '@ui/shared/input/TextField/TextField'

const cx = classNames.bind(styles)

type ContractPriceEditFormProps = {
  onSubmit: (data: Pick<ContractType, 'contractPrice'>) => void
  onCancel: () => void
  defaultContractPrice?: number
}

const ContractPriceEditForm = ({ onSubmit, onCancel, defaultContractPrice }: ContractPriceEditFormProps) => {
  const methods = useForm<Pick<ContractType, 'contractPrice'>>({ defaultValues: { 'contractPrice': defaultContractPrice } })
  const { setValue, handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form className={cx('container')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('input')}>
          <FieldLabel label='가격' required />
          <Controller
            name='contractPrice'
            defaultValue=""
            rules={{
              required: '필수 입력사항입니다.',
              validate: value => parseInt(value, 10) >= 0 || '유효하지 않은 값입니다.',
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type='number'
                placeholder='가격을 입력해 주세요'
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10)
                  setValue('contractPrice', isNaN(value) ? 0 : value)
                }}
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </div>
        <div className={cx('buttonContainer')}>
          <Button onClick={onCancel} type='button' size='small' theme='gray'>취소</Button>
          <Button type='submit' size='small' theme='red'>수정</Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ContractPriceEditForm
