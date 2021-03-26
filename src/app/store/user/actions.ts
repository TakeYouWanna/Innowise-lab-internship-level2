import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/shared/interfaces/api-error.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UserActionsType } from './constant';

export const loadUser = createAction(
  UserActionsType.loadUser,
  props<{ email: string; password: string }>()
);

export const loadUserSuccess = createAction(
  UserActionsType.loadUserSuccess,
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  UserActionsType.loadUserFailure,
  props<{ error: ApiError }>()
);

export const createUser = createAction(
  UserActionsType.createUser,
  props<{ email: string; password: string; name: string }>()
);

export const createUserSuccess = createAction(
  UserActionsType.createUserSuccess,
  props<{ uid: string; email: string; password: string; name: string }>()
);

export const createUserFailure = createAction(
  UserActionsType.createUserFailure,
  props<{ error: ApiError }>()
);

export const initializeUser = createAction(UserActionsType.initializeUser);

export const logOutUser = createAction(UserActionsType.logoutUser);
