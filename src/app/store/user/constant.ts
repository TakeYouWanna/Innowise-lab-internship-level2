export const enum UserActionsType {
  loadUser = '[Auth/ API] user loading',
  loadUserSuccess = '[Auth/ API] user loaded successfully',
  loadUserFailure = '[Auth/ API] user loading failed',

  createUser = '[Auth/ API] user creating',
  createUserSuccess = '[Auth / API] user created successfully',
  createUserFailure = '[Auth / API] user creating failed',

  logoutUser = '[Auth/ API] user logout',

  initializeUser = '[Auth/ API] user initialized',
}
