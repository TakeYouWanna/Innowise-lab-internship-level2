import { createAction, props } from '@ngrx/store';
import { ToastNoticeActionsType } from './constant';

export const setMessage = createAction(
  ToastNoticeActionsType.setMessage,
  props<{ message: string; messageType: string }>()
);

export const removeMessage = createAction(ToastNoticeActionsType.removeMessage);
