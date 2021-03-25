import { ActionReducerMap } from '@ngrx/store';
import { pictureListReducer, PictureListState } from './picture-list/reducer';
import { toastNoticeReducer, ToastNoticeState } from './toast-notice/reducer';
import { userReducer, UserState } from './user/reducer';

export interface State {
  user: UserState;
  toastNotice: ToastNoticeState;
  pictureList: PictureListState;
}

export const reducers: ActionReducerMap<State, any> = {
  user: userReducer,
  toastNotice: toastNoticeReducer,
  pictureList: pictureListReducer,
};
