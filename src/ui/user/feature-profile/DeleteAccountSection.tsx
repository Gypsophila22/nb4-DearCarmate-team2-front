/* eslint-disable react/function-component-definition */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/semi */
import { useRef } from 'react';
import { useRouter } from 'next/router';
import AuthCheckModal from './AuthCheckModal';
import useConfirmDeleteModal from '@ui/shared/modal/confirm-delete-modal/useConfirmDeleteModal';
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal';
import { useDeleteMe } from '@ui/user/data-access-profile/useDeleteMe';
import useUserStore from '@zustand/useUserStore';
import { clearAuth } from '@shared/auth';

export default function DeleteAccountSection() {
  const router = useRouter();
  const user = useUserStore.use.user();
  const { mutate } = useDeleteMe();
  const { openConfirmDeleteModal, closeConfirmDeleteModal } =
    useConfirmDeleteModal();
  const { openConfirmModal } = useConfirmModal();

  const authCheckDialogRef = useRef<HTMLDialogElement>(null);

  const handlePasswordConfirm = async (password: string) => {
    try {
      await mutate({ password });
      setTimeout(() => {
        openConfirmModal({
          text: '탈퇴가 완료되었습니다.',
          onCloseSuccess: () => {
            const resetUser = useUserStore.getState().resetUser;
            clearAuth?.(); // 쿠키/헤더/리프레시 차단 정리
            resetUser?.(); // zustand 유저 상태 초기화
            router.replace('/signin');
          },
        });
      }, 0);
      return true; // 성공 → AuthCheckModal 닫힘
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        '비밀번호가 올바르지 않습니다.';
      // 실패 → 문자열 반환해서 AuthCheckModal에서 onErrorMessage로 전달
      return msg;
    }
  };

  const handleClickDelete = () => {
    openConfirmDeleteModal({
      onSubmit: () => {
        closeConfirmDeleteModal();
        authCheckDialogRef.current?.showModal();
      },
      deleteType: '계정',
      itemName: user?.name || user?.email || '내 계정',
    });
  };

  return (
    <section>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleClickDelete();
        }}
      >
        회원 탈퇴
      </button>

      <AuthCheckModal
        ref={authCheckDialogRef}
        fieldName="currentPassword"
        mode="confirm"
        onConfirm={handlePasswordConfirm}
        // ❗여기서 공용 확인 모달 열기
        onErrorMessage={(msg) => {
          // 모달 전환 타이밍 겹침 방지
          setTimeout(() => {
            openConfirmModal({
              text:
                typeof msg === 'string'
                  ? msg
                  : '현재 비밀번호가 맞지 않습니다.',
              // onCloseSuccess?: 필요하면 여기서 추가
            });
          }, 0);
        }}
        onClose={() => authCheckDialogRef.current?.close()}
      />
    </section>
  );
}
