import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/shared/interfaces/user.interface';
import { loadUserSuccess, logOutUser } from './user.actions';

const userInitialState: User = {
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
