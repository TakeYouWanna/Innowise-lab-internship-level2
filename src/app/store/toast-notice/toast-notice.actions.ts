import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/shared/interfaces/api-error.interface';
import { toastNoticeActionsType } from './constants/toast-notice.constant';

export const setMessage = createAction(
  toastNoticeActionsType.setMessage,
  props<{ error: ApiError }>()
);

export const removeMessage = createAction(toastNoticeActionsType.removeMessage);
