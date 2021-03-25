import { createReducer, on } from '@ngrx/store';
import { removeMessage, setMessage } from './actions';

export interface ToastNoticeState {
  message: string;
  messageType: string;
}

const toastNoticeInitializeState: ToastNoticeState = {
  message: '',
  messageType: '',
};

export const toastNoticeReducer = createReducer(
  toastNoticeInitializeState,
  on(setMessage, (state, { message, messageType }) => ({
    ...state,
    message,
    messageType,
  })),
  on(removeMessage, (state) => ({ ...state, message: '', messageType: '' }))
);
