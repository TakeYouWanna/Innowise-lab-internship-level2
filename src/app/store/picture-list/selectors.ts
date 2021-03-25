import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PictureList } from 'src/app/shared/interfaces/picture-list.interface';

const selectPictureListFeature = createFeatureSelector<{
  pictureList: PictureList;
}>('pictureList');

export const selectPictureList = createSelector(
  selectPictureListFeature,
  (state: { pictureList: PictureList }): PictureList => state.pictureList
);
