import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ToastNotice } from 'src/app/shared/interfaces/toast-notice.interface';

const selectToastNoticeFeature = createFeatureSelector<ToastNotice>(
  'toastNotice'
);

export const selectToastNoticeMessage = createSelector(
  selectToastNoticeFeature,
  (state) => state.message
);
