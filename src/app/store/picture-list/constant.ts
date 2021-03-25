export const enum PictureListActionsType {
  loadPictures = '[Firestore / API] pictures loading...',
  loadPicturesSuccess = '[Firestore /API] pictures loaded successfully',
  loadPicturesFailure = '[Firestore / API] picture loading error',

  removePicture = '[Firestore / API] picture removing...',
  removePictureSuccess = '[Firestore / API] picture removed successfully',
  removePictureFailure = '[Firestore / API] picture removing error',

  addPicture = '[Firestore / API] picture adding...',
  addPictureSuccess = '[Firestore / API] picture added successfully',
  addPictureFailure = '[Firestore / API] error adding image',

  clearAllPicture = '[Picture List] Pictures cleared',
}
