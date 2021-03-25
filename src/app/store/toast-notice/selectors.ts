import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectToastNoticeFeature = createFeatureSelector<{
  message: string;
  messageType: string;
}>('toastNotice');

export const selectToastNotice = createSelector(
  selectToastNoticeFeature,
  (state) => state
);
