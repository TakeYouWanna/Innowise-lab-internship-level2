import { createReducer, on } from '@ngrx/store';
import { PictureList } from 'src/app/shared/interfaces/picture-list.interface';
import { clearAllPicture, loadPicturesSuccess } from './actions';

export interface PictureListState {
  pictureList: PictureList;
}

const pictureListInitialState: PictureListState = {
  pictureList: {},
};

export const pictureListReducer = createReducer(
  pictureListInitialState,
  on(loadPicturesSuccess, (state, { newPictureList }) => ({
    ...state,
    pictureList: newPictureList,
  })),
  on(clearAllPicture, (state) => ({ ...state, pictureList: {} }))
);
