/* eslint-disable @typescript-eslint/semi */
/* eslint-disable react/function-component-definition */
import { useEffect } from 'react';
import { modalBus, ModalPayload } from './modalbus';
import useConfirmModal from './confirm-modal/useConfirmModal'; // 경로 프로젝트 기준

export default function ModalGateway() {
  const { openConfirmModal } = useConfirmModal();

  useEffect(() => {
    const unsubscribe = modalBus.subscribe((p: ModalPayload) => {
      openConfirmModal({
        text: p.text,
        onCloseSuccess: p.onCloseSuccess,
      });
    });
    return () => {
      unsubscribe();
    }; // ✅ void cleanup
  }, [openConfirmModal]);

  return null;
}
