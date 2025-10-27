/* eslint-disable @typescript-eslint/semi */
import { modalBus } from "./modal/modalbus";

export const notify = {
  error(text: string, onCloseSuccess?: () => void) {
    modalBus.emit({ text, onCloseSuccess });
  },
  success(text: string, onCloseSuccess?: () => void) {
    modalBus.emit({ text, onCloseSuccess });
  },
};

export default notify;
