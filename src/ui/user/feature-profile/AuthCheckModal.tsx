/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/semi */
import classNames from "classnames/bind";
import styles from "./AuthCheckModal.module.scss";
import FieldLabel from "@ui/shared/input/FieldLabel/FieldLabel";
import Button from "@ui/shared/button/Button";
import PasswordFieldConnect from "@ui/shared/form-field/PasswordFieldConnect";
import FormModal from "@ui/shared/modal/form-modal/FormModal";
import { forwardRef, KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";

const cx = classNames.bind(styles);

type AuthCheckModalProps = {
  fieldName: string;
  onClose: () => void;
  /** 프로필 수정: 기본 submit / 탈퇴: confirm */
  mode?: "submit" | "confirm";
  /**
   * confirm 모드 전용: 성공 시 true/void, 실패 시 false 또는 에러 메시지(string) 반환
   */
  onConfirm?: (password: string) => Promise<boolean | string | void> | boolean | string | void;

  /** ❗실패 시 외부(전역) 모달로 메시지 띄우고 싶을 때 사용 */
  onErrorMessage?: (msg: string) => void;
};

const AuthCheckModal = forwardRef<HTMLDialogElement, AuthCheckModalProps>(
  ({ fieldName, onClose, mode = "submit", onConfirm, onErrorMessage }, ref) => {
    const { getValues } = useFormContext();

    const handleConfirmClick = async () => {
      const pwd = String(getValues(fieldName) ?? "");

      if (mode === "confirm" && onConfirm) {
        try {
          const result = await onConfirm(pwd);

          if (result === true || result === undefined) {
            // 성공 → 닫기
            onClose();
          } else {
            // 실패 → 이 모달 닫고, 외부 모달로 메시지 노출
            const msg = typeof result === "string" ? result : "비밀번호가 올바르지 않습니다.";
            onClose();
            onErrorMessage?.(msg);
          }
        } catch {
          onClose();
          onErrorMessage?.("비밀번호가 올바르지 않습니다.");
        }
        return;
      }

      // submit 모드: 부모 폼 제출 트리거 (프로필 수정)
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
      if (mode === "confirm" && e.key === "Enter") {
        e.preventDefault(); // 부모 form submit 방지
      }
    };

    return (
      <dialog className={cx("dialog")} ref={ref} onKeyDown={handleKeyDown}>
        <div className={cx("contentWrapper")}>
          <FormModal title="회원 정보 확인">
            <div className={cx("formContainer")}>
              <div className={cx("password")}>
                <FieldLabel label="비밀번호" />
                <PasswordFieldConnect
                  name={fieldName}
                  autoComplete="current-password"
                  placeholder="본인 인증을 위해 비밀번호를 한 번 더 입력해 주세요"
                />
              </div>
              <div className={cx("buttonContainer")}>
                <Button type="button" size="small" theme="gray" onClick={onClose}>
                  취소
                </Button>

                {mode === "submit" ? (
                  <Button type="submit" size="small" theme="red">
                    제출
                  </Button>
                ) : (
                  <Button type="button" size="small" theme="red" onClick={handleConfirmClick}>
                    확인
                  </Button>
                )}
              </div>
            </div>
          </FormModal>
        </div>
      </dialog>
    );
  },
);

AuthCheckModal.displayName = "AuthCheckModal";
export default AuthCheckModal;
