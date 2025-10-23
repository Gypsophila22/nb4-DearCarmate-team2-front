/* eslint-disable @typescript-eslint/semi */
export type ModalPayload = {
  text: string;
  onCloseSuccess?: () => void;
};

type Listener = (p: ModalPayload) => void;

const listeners = new Set<Listener>();

export const modalBus = {
  emit(payload: ModalPayload) {
    listeners.forEach((l) => l(payload));
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    }; // ✅ cleanup은 void
  },
};
