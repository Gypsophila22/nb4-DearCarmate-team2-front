/* eslint-disable @typescript-eslint/semi */
/* eslint-disable react/function-component-definition */
import { useState } from 'react';
import { useRouter } from 'next/router';
import useUserStore from '@/zustand/useUserStore';
import { useDeleteMe } from '@ui/user/data-access-profile/useDeleteMe';
// 프로젝트 공용 컴포넌트로 교체
import Button from '@ui/shared/button/Button';
import ConfirmDeleteModal from '@ui/shared/modal/confirm-delete-modal/ConfirmDeleteModal';
import useConfirmDeleteModal from '@ui/shared/modal/confirm-delete-modal/useConfirmDeleteModal';

import classNames from 'classnames/bind';
import styles from './ProfileForm.module.scss';

import AuthCheckModal from './AuthCheckModal';
import { useRef } from 'react';
const cx = classNames.bind(styles);

export default function DeleteAccountSection() {
  const router = useRouter();
  const user = useUserStore.use.user();
  const logout = useUserStore.use.logout?.() ?? (() => {});
  const { mutate } = useDeleteMe();
  const { openConfirmDeleteModal, closeConfirmDeleteModal } =
    useConfirmDeleteModal();
  const authCheckDialogRef = useRef<HTMLDialogElement>(null);

  // 2단계: 비번 확인 성공 시 실제 탈퇴
  const handlePasswordChecked = async ({
    encryptedCurrentPassword,
  }: {
    encryptedCurrentPassword: string;
  }) => {
    await mutate({ password: encryptedCurrentPassword }); // 백엔드 요구에 따라 raw/암호문 중 사용
    logout();
    router.replace('/signin');
  };

  // 1단계: “삭제하시겠습니까?” → 확인 누르면 비번모달 열기
  const handleClickDelete = () => {
    // 1) confirm modal에서 확인 -> 비번 모달 열기
    openConfirmDeleteModal({
      onSubmit: () => {
        closeConfirmDeleteModal();

        // (선택) 혹시 화면 뒤쪽에 띄워둔 글로벌 에러/토스트가 있다면 여기서 지우기
        // toast.dismiss?.()

        authCheckDialogRef.current?.showModal();
      },
      deleteType: '계정',
      itemName: user?.name || user?.email || '내 계정',
    });
  };

  return (
    <section className={styles.deleteSection}>
      <Button
        theme="red"
        className={styles.deleteBtn}
        onClick={handleClickDelete}
      >
        회원 탈퇴
      </Button>
      <p className={styles.deleteDesc}>
        탈퇴 시 계정 및 관련 데이터가 삭제되며 복구할 수 없습니다.
      </p>

      <AuthCheckModal
        ref={authCheckDialogRef}
        fieldName="currentPassword"
        onClose={() => authCheckDialogRef.current?.close()}
        onSuccess={handlePasswordChecked} // ✅ 체인 완료
      />
    </section>
  );
}
