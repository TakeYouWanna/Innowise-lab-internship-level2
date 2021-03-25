import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/shared/interfaces/api-error.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { userActionsType } from './constant';

export const loadUser = createAction(
  userActionsType.loadUser,
  props<{ email: string; password: string }>()
);

export const createUser = createAction(
  userActionsType.createUser,
  props<{ email: string; password: string }>()
);

export const loadUserSuccess = createAction(
  userActionsType.loadUserSuccess,
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  userActionsType.loadUserFailure,
  props<{ error: ApiError }>()
);

export const initializeUser = createAction(userActionsType.initializeUser);

export const logOutUser = createAction(userActionsType.logoutUser);
