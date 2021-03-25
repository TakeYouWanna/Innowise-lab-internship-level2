import { createAction, props } from '@ngrx/store';
import { toastNoticeActionsType } from './constant';

export const setMessage = createAction(
  toastNoticeActionsType.setMessage,
  props<{ message: string; messageType: string }>()
);

export const removeMessage = createAction(toastNoticeActionsType.removeMessage);
