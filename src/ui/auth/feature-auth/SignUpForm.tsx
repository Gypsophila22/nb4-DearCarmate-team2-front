import classNames from 'classnames/bind'
import styles from './SignUpForm.module.scss'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { SignUpFormInput } from '@shared/types'
import FieldLabel from '@ui/shared/input/FieldLabel/FieldLabel'
import TextFieldConnect from '@ui/shared/form-field/TextFieldConnect'
import PasswordFieldConnect from '@ui/shared/form-field/PasswordFieldConnect'
import Button from '@ui/shared/button/Button'
import { EMAIL_VALIDATION_REGEXP, PASSWORD_VALIDATION_REGEXP, PHONE_NUMBER_VALIDATION_REGEXP } from '@ui/shared/util-constants/constants'
import useSignUp from '../data-access-auth/useSignUp'

const cx = classNames.bind(styles)

type SignUpFormProps = {

}

const SignUpForm = ({ }: SignUpFormProps) => {
  const methods = useForm<SignUpFormInput>()
  const { mutate, isPending } = useSignUp()

  const handleSignUp: SubmitHandler<SignUpFormInput> = async (data) => {
    mutate(data)
  }

  return (
    <FormProvider {...methods}>
      <form className={cx('container')} onSubmit={methods.handleSubmit(handleSignUp)}>
        <div className={cx('inputs')}>
          <div>
            <FieldLabel label='이름' />
            <TextFieldConnect
              name='name'
              autoComplete='name'
              placeholder='이름을 입력해 주세요'
              rules={{
                validate: value => value.trim() !== '' || '필수 입력사항입니다.',
              }}
            />
          </div>
          <div>
            <FieldLabel label='이메일' />
            <TextFieldConnect
              name='email'
              autoComplete='email'
              placeholder='이메일을 입력해 주세요'
              rules={{
                required: '필수 입력사항입니다',
                pattern: {
                  value: EMAIL_VALIDATION_REGEXP,
                  message: '이메일 형식에 맞지 않습니다',
                },
              }}
            />
          </div>
          <div>
            <FieldLabel label='사원번호' />
            <TextFieldConnect
              name='employeeNumber'
              autoComplete='employee-number'
              placeholder='사원번호를 입력해 주세요'
              rules={{
                validate: value => value.trim() !== '' || '필수 입력사항입니다.',
              }}
            />
          </div>
          <div>
            <FieldLabel label='연락처' />
            <TextFieldConnect
              name='phoneNumber'
              autoComplete='tel'
              placeholder='연락처를 입력해 주세요'
              rules={{
                validate: value => value.trim() !== '' || '필수 입력사항입니다.',
                pattern: {
                  value: PHONE_NUMBER_VALIDATION_REGEXP,
                  message: '전화번호 형식에 맞지 않습니다(하이픈 포함 필요)',
                },
              }}
            />
          </div>
          <div>
            <FieldLabel label='비밀번호' />
            <PasswordFieldConnect
              name='password'
              autoComplete='new-password'
              rules={{
                required: '필수 입력사항입니다',
                pattern: {
                  value: PASSWORD_VALIDATION_REGEXP,
                  message: '영문, 숫자 조합 8~16자리로 입력해주세요',
                },
              }}
            />
          </div>
          <div>
            <FieldLabel label='비밀번호 확인' />
            <PasswordFieldConnect
              name='passwordConfirmation'
              autoComplete='new-password'
              placeholder='비밀번호를 한번 더 입력해 주세요'
              rules={{
                required: '필수 입력사항입니다',
                validate: value => value === methods.getValues('password') || '비밀번호가 일치하지 않습니다',
              }}
            />
          </div>
          <div>
            <FieldLabel label='기업명' />
            <TextFieldConnect
              name='companyName'
              placeholder='기업명을 입력해 주세요'
              rules={{
                validate: value => value.trim() !== '' || '필수 입력사항입니다.',
              }}
            />
          </div>
          <div>
            <FieldLabel label='기업 인증코드' />
            <TextFieldConnect
              name='companyCode'
              placeholder='기업 인증코드를 입력해 주세요'
              rules={{
                validate: value => value.trim() !== '' || '필수 입력사항입니다.',
              }}
            />
          </div>
        </div>
        <div className={cx('buttonContainer')}>
          <div className={cx('text')}>* 회사 신규 가입은 디어카메이트 담당자 문의 부탁드립니다.</div>
          <Button type='submit' size='large' theme='red' disabled={isPending}>회원가입</Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default SignUpForm
