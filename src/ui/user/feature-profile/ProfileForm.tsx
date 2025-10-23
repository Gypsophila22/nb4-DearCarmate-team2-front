import classNames from 'classnames/bind'
import styles from './ProfileForm.module.scss'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { ProfileFormInput } from '@shared/types'
import FieldLabel from '@ui/shared/input/FieldLabel/FieldLabel'
import Button from '@ui/shared/button/Button'
import PasswordFieldConnect from '@ui/shared/form-field/PasswordFieldConnect'
import { PASSWORD_VALIDATION_REGEXP, PHONE_NUMBER_VALIDATION_REGEXP } from '@ui/shared/util-constants/constants'
import useUserStore from '@zustand/useUserStore'
import { useEffect, useRef } from 'react'
import TextField from '@ui/shared/input/TextField/TextField'
import TextFieldConnect from '@ui/shared/form-field/TextFieldConnect'
import ImageUploadConnect from '@ui/shared/form-field/ImageUploadConnect/ImageUploadConnect'
import useEditUser from '../data-access-profile/useEditUser'
import AuthCheckModal from './AuthCheckModal'

const cx = classNames.bind(styles)

type ProfileFormProps = {
}

const ProfileForm = ({ }: ProfileFormProps) => {
  const methods = useForm<ProfileFormInput>()
  const { handleSubmit, setValue, trigger } = methods

  const { mutate: editUser } = useEditUser()
  const user = useUserStore.use.user()

  const authCheckDialogRef = useRef<HTMLDialogElement>(null)

  const handleEditUser: SubmitHandler<ProfileFormInput> = async (data) => {
    authCheckDialogRef.current?.close()
    const editedUserData = {
      ...data,
      password: data.password ? data.password : undefined,
      passwordConfirmation: data.passwordConfirmation ? data.passwordConfirmation : undefined,
    }
    editUser(editedUserData)
    setValue('currentPassword', '')
    setValue('password', '')
    setValue('passwordConfirmation', '')
  }

  const handleClickCompletedButton = async () => {
    const isValid = await trigger()
    if (!isValid) return
    authCheckDialogRef.current?.showModal()
  }

  useEffect(() => {
    setValue('imageUrl', user.imageUrl)
    setValue('employeeNumber', user.employeeNumber)
    setValue('phoneNumber', user.phoneNumber)
  }, [setValue, user.imageUrl, user.employeeNumber, user.phoneNumber])

  return (
    <FormProvider {...methods}>
      <form className={cx('container')} onSubmit={handleSubmit(handleEditUser)}>
        <div className={cx('inputs')}>
          <div>
            <FieldLabel label='프로필 이미지' />
            <ImageUploadConnect name='imageUrl' />
          </div>
          <div>
            <FieldLabel label='이름' />
            <TextField
              name='name'
              value={user.name}
              disabled
            />
          </div>
          <div>
            <FieldLabel label='이메일' />
            <TextField
              name='email'
              value={user.email}
              disabled
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
            <FieldLabel label='새 비밀번호' />
            <PasswordFieldConnect
              name='password'
              autoComplete='new-password'
              rules={{
                pattern: {
                  value: PASSWORD_VALIDATION_REGEXP,
                  message: '영문, 숫자 조합 8~16자리로 입력해주세요',
                },
              }}
            />
          </div>
          <div>
            <FieldLabel label='새 비밀번호 확인' />
            <PasswordFieldConnect
              name='passwordConfirmation'
              autoComplete='new-password'
              placeholder='새 비밀번호를 한번 더 입력해 주세요'
              rules={{
                validate: value => value === methods.getValues('password') || '비밀번호가 일치하지 않습니다',
              }}
            />
          </div>
        </div>
        <Button
          type='button'
          size='large'
          theme='red'
          onClick={(e) => {
            e.preventDefault()
            handleClickCompletedButton()
          }}
        >확인
        </Button>
        <AuthCheckModal
          ref={authCheckDialogRef}
          fieldName='currentPassword'
          onClose={() => { authCheckDialogRef.current?.close() }}
        />
      </form>
    </FormProvider>
  )
}

export default ProfileForm
