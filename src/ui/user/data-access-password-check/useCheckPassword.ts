/* eslint-disable @typescript-eslint/semi */
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal';
import { deleteMe } from '@shared/api';
import { AxiosErrorData, PasswordCheckFormInput } from '@shared/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useCheckPassword = () => {
  const { openConfirmModal } = useConfirmModal();

  const mutation = useMutation<
    { message: string },
    AxiosError<AxiosErrorData>,
    PasswordCheckFormInput,
    unknown
  >({
    mutationFn: async ({ password }) => {
      // 회원탈퇴 API가 비밀번호를 body로 받도록 되어 있으니 이걸 사용
      return await deleteMe(password);
    },
    onSuccess: () => {},
    onError: (error) => {
      const text =
        error?.response?.data?.message || '회원 정보 확인에 실패했습니다.';
      openConfirmModal({
        text,
      });
    },
  });

  return mutation;
};

export default useCheckPassword;
