import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/shared/interfaces/user.interface';

const selectUserFeature = createFeatureSelector<User>('user');

export const selectUserEmail = createSelector(
  selectUserFeature,
  (state: User): string => state.email
);

export const selectUserUid = createSelector(
  selectUserFeature,
  (state: User): string => state.uid
);
