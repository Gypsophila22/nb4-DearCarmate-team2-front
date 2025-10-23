import classNames from 'classnames/bind'
import styles from './AuthCheckModal.module.scss'
import FieldLabel from '@ui/shared/input/FieldLabel/FieldLabel'
import Button from '@ui/shared/button/Button'
import PasswordFieldConnect from '@ui/shared/form-field/PasswordFieldConnect'
import FormModal from '@ui/shared/modal/form-modal/FormModal'
import { forwardRef } from 'react'

const cx = classNames.bind(styles)

type AuthCheckModalProps = {
  fieldName: string
  onClose: () => void
}

const AuthCheckModal = forwardRef<HTMLDialogElement, AuthCheckModalProps>(({ fieldName, onClose }, ref) => {
  return (
    <dialog className={cx('dialog')} ref={ref}>
      <div className={cx('contentWrapper')}>
        <FormModal
          title='회원 정보 확인'
        >
          <div className={cx('formContainer')}>
            <div className={cx('password')}>
              <FieldLabel label='비밀번호' />
              <PasswordFieldConnect
                name={fieldName}
                autoComplete='current-password'
                placeholder='본인 인증을 위해 비밀번호를 한 번 더 입력해 주세요'
              />
            </div>
            <div className={cx('buttonContainer')}>
              <Button onClick={onClose} type='button' size='small' theme='gray'>취소</Button>
              <Button type='submit' size='small' theme='red'>제출</Button>
            </div>
          </div>
        </FormModal>
      </div>
    </dialog>

  )
})

AuthCheckModal.displayName = 'AuthCheckModal'

export default AuthCheckModal
