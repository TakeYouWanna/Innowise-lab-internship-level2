import { createReducer, on } from '@ngrx/store';
import { loadUserSuccess, logOutUser } from './actions';

export interface UserState {
  uid: string;
  email: string;
}

const userInitialState: UserState = {
  uid: '',
  email: '',
};

export const userReducer = createReducer(
  userInitialState,
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    uid: user.uid,
    email: user.email,
  })),
  on(logOutUser, (state) => ({ ...state, uid: '', email: '' }))
);
