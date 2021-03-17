import { createReducer, on } from '@ngrx/store';
import { ToastNotice } from 'src/app/shared/interfaces/toast-notice.interface';
import { removeMessage, setMessage } from './toast-notice.actions';

const toastNoticeInitializeState: ToastNotice = {
  message: '',
};

export const toastNoticeReducer = createReducer(
  toastNoticeInitializeState,
  on(setMessage, (state, { error }) => ({
    ...state,
    message: error.message,
  })),
  on(removeMessage, (state) => ({ ...state, message: '' }))
);
