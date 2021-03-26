import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/shared/interfaces/api-error.interface';
import { Criterion } from 'src/app/shared/interfaces/criteria.interface';
import { PictureList } from 'src/app/shared/interfaces/picture-list.interface';
import { PictureListActionsType } from './constant';

export const loadPictures = createAction(
  PictureListActionsType.loadPictures,
  props<{ criterion: Criterion }>()
);

export const loadPicturesSuccess = createAction(
  PictureListActionsType.loadPicturesSuccess,
  props<{ newPictureList: PictureList }>()
);

export const loadPicturesFailure = createAction(
  PictureListActionsType.loadPicturesFailure,
  props<{ error: ApiError }>()
);

export const addPicture = createAction(
  PictureListActionsType.addPicture,
  props<{ pictureSrc: string }>()
);

export const addPictureSuccess = createAction(
  PictureListActionsType.addPictureSuccess,
  props<{ message: string }>()
);

export const addPictureFailure = createAction(
  PictureListActionsType.addPictureFailure,
  props<{ error: ApiError }>()
);

export const removePicture = createAction(
  PictureListActionsType.removePicture,
  props<{ pictureId: string }>()
);

export const removePictureSuccess = createAction(
  PictureListActionsType.removePictureSuccess,
  props<{ message: string }>()
);

export const removePictureFailure = createAction(
  PictureListActionsType.removePictureFailure,
  props<{ error: ApiError }>()
);

export const clearAllPicture = createAction(
  PictureListActionsType.clearAllPicture
);
