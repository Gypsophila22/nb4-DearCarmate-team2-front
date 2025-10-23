/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/semi */
import classNames from 'classnames/bind';
import styles from './AuthCheckModal.module.scss';
import FieldLabel from '@ui/shared/input/FieldLabel/FieldLabel';
import Button from '@ui/shared/button/Button';
import PasswordFieldConnect from '@ui/shared/form-field/PasswordFieldConnect';
import FormModal from '@ui/shared/modal/form-modal/FormModal';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useCheckPassword from '@ui/user/data-access-password-check/useCheckPassword';
import type { PasswordCheckFormInput } from '@shared/types';

const cx = classNames.bind(styles);

type AuthCheckModalProps = {
  fieldName: string;
  onClose: () => void;
  /** 비번 검증 성공 시 콜백 */
  onSuccess?: (payload: { encryptedCurrentPassword: string }) => void;
  /** (선택) 모달 열기 직전 초기화 용도 */
  onWillOpen?: () => void;
};

const AuthCheckModal = forwardRef<HTMLDialogElement, AuthCheckModalProps>(
  ({ fieldName, onClose, onSuccess, onWillOpen }, ref) => {
    const innerRef = useRef<HTMLDialogElement | null>(null);
    // ref가 HTMLDialogElement로 넘어오므로, 내부에서도 동일 참조
    useEffect(() => {
      if (typeof ref === 'function') ref(innerRef.current as HTMLDialogElement);
      else if (ref) (ref as any).current = innerRef.current;
    }, [ref]);

    const { getValues, trigger, setValue, control } = useFormContext();
    const { mutateAsync: checkPassword, isPending } = useCheckPassword();
    const [error, setError] = useState<string | null>(null);

    // 1) 입력이 바뀌면 에러 제거
    const pwd = useWatch({ control, name: fieldName });
    useEffect(() => {
      if (error) setError(null);
    }, [pwd, error]); // 사용자가 타이핑 시작하면 에러 숨김

    // 2) 모달 닫힐 때 에러/필드 초기화
    useEffect(() => {
      const dlg = innerRef.current;
      if (!dlg) return;
      const handleClose = () => {
        setError(null);
        setValue(fieldName as any, '');
      };
      dlg.addEventListener('close', handleClose);
      dlg.addEventListener('cancel', handleClose);
      return () => {
        dlg.removeEventListener('close', handleClose);
        dlg.removeEventListener('cancel', handleClose);
      };
    }, [setValue, fieldName]);

    // 3) 부모가 showModal() 호출하기 직전에 초기화할 수 있게(선택)
    useEffect(() => {
      if (!innerRef.current) return;
      const dlg = innerRef.current;
      const observer = new MutationObserver(() => {
        if (dlg.open) {
          // 열릴 때마다 초기화
          onWillOpen?.();
          setError(null);
          // 기존 값이 남아있다면 비우기
          setValue(fieldName as any, '');
        }
      });
      observer.observe(dlg, { attributes: true, attributeFilter: ['open'] });
      return () => observer.disconnect();
    }, [onWillOpen, setValue, fieldName]);

    const handleSubmitClick = async () => {
      setError(null);
      const ok = await trigger(fieldName as any);
      if (!ok) return;
      const currentPassword = getValues(fieldName);
      const payload: PasswordCheckFormInput = { password: currentPassword };
      try {
        const res = await checkPassword(payload);
        onSuccess?.({ encryptedCurrentPassword: res.encryptedCurrentPassword });
        onClose(); // 닫으면 close 이벤트로 필드/에러도 초기화됨
      } catch (e: any) {
        setError(e?.response?.data?.message ?? '비밀번호가 올바르지 않습니다.');
      }
    };

    return (
      <dialog className={cx('dialog')} ref={innerRef}>
        <div className={cx('contentWrapper')}>
          <FormModal title="회원 정보 확인">
            <div className={cx('formContainer')}>
              <div className={cx('password')}>
                <FieldLabel label="비밀번호" />
                <PasswordFieldConnect
                  name={fieldName}
                  autoComplete="current-password"
                  placeholder="본인 인증을 위해 비밀번호를 한 번 더 입력해 주세요"
                />
                {error && <p className={cx('error')}>{error}</p>}
              </div>
              <div className={cx('buttonContainer')}>
                <Button
                  onClick={onClose}
                  type="button"
                  size="small"
                  theme="gray"
                  disabled={isPending}
                >
                  취소
                </Button>
                <Button
                  type="button"
                  size="small"
                  theme="red"
                  onClick={handleSubmitClick}
                  disabled={isPending}
                >
                  {isPending ? '확인중…' : '제출'}
                </Button>
              </div>
            </div>
          </FormModal>
        </div>
      </dialog>
    );
  }
);

AuthCheckModal.displayName = 'AuthCheckModal';
export default AuthCheckModal;
