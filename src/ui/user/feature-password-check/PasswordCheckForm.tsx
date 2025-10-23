import classNames from 'classnames/bind'
import styles from './PasswordCheckForm.module.scss'
import { FormProvider, useForm } from 'react-hook-form'
import { PasswordCheckFormInput } from '@shared/types'
import FieldLabel from '@ui/shared/input/FieldLabel/FieldLabel'
import Button from '@ui/shared/button/Button'
import PasswordFieldConnect from '@ui/shared/form-field/PasswordFieldConnect'

const cx = classNames.bind(styles)

type PasswordCheckFormProps = {
  onSubmit: (data: PasswordCheckFormInput) => void
}

const PasswordCheckForm = ({ onSubmit }: PasswordCheckFormProps) => {
  const methods = useForm<PasswordCheckFormInput>()
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form className={cx('container')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('input')}>
          <FieldLabel label='비밀번호' />
          <PasswordFieldConnect
            name='password'
            autoComplete='current-password'
            rules={{
              required: '필수 입력사항입니다',
            }}
          />
        </div>
        <Button type='submit' size='large' theme='red'>확인</Button>
      </form>
    </FormProvider>
  )
}

export default PasswordCheckForm
