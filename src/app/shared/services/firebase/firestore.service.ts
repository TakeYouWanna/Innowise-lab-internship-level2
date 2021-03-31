import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Criterion } from '../../interfaces/criterion.interface';
import { PictureList } from '../../interfaces/picture-list.interface';
import { PictureData } from './interfaces/picture-data.interface';
import { UserData } from './interfaces/user-data.interface';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private collectionPicturesRef: CollectionReference<unknown>;

  private collectionUsersRef: CollectionReference<unknown>;

  constructor(private angularFirestore: AngularFirestore) {
    this.collectionPicturesRef = this.angularFirestore.collection(
      'Pictures'
    ).ref;
    this.collectionUsersRef = this.angularFirestore.collection('Users').ref;
  }

  public addNewPicture(
    pictureSrc: string,
    userId: string
  ): Observable<DocumentReference<unknown>> {
    const data = {
      pictureSrc,
      userId,
      dateAdded: new Date(),
    };
    return from(this.collectionPicturesRef.add(data));
  }

  public addNewUser(
    uid: string,
    name: string
  ): Observable<DocumentReference<unknown>> {
    const newUser = {
      uid,
      name,
    };
    return from(this.collectionUsersRef.add(newUser));
  }

  public removePicture(pictureId: string): Observable<void> {
    return from(this.collectionPicturesRef.doc(pictureId).delete());
  }

  public getPictures(criterion: Criterion): Observable<PictureList> {
    return this.returnRequestByCriterion(criterion).pipe(
      switchMap((picturesData) => {
        const usersId = [
          ...new Set(
            picturesData.docs.map(
              (pictureData) => (pictureData.data() as PictureData).userId
            )
          ),
        ];
        return from(
          this.collectionUsersRef.where('uid', 'in', usersId).get()
        ).pipe(
          map((usersData) => {
            return picturesData.docs.reduce((pictureList, picture) => {
              const { pictureSrc, userId } = picture.data() as PictureData;
              const { name } = usersData.docs
                .find((value) => {
                  return (value.data() as UserData).uid === userId;
                })
                .data() as UserData;
              pictureList[picture.id] = { pictureSrc, name };
              return pictureList;
            }, {} as PictureList);
          })
        );
      })
    );
  }

  private getUidByUsername(name: string): Observable<string> {
    return from(this.collectionUsersRef.where('name', '==', name).get()).pipe(
      map((userData) => {
        if (userData.size > 0) {
          return (userData.docs.pop().data() as UserData).uid;
        }
        return '';
      })
    );
  }

  private returnRequestByCriterion(
    criterion: Criterion
  ): Observable<QuerySnapshot<unknown>> {
    switch (criterion.type) {
      case 'uid':
        return from(
          this.collectionPicturesRef
            .where('userId', '==', criterion.value)
            .limit(criterion.limit)
            .get()
        );
      case 'author':
        return from(
          this.getUidByUsername(criterion.value).pipe(
            switchMap((uid) =>
              this.collectionPicturesRef
                .where('userId', '==', uid)
                .limit(criterion.limit)
                .get()
            )
          )
        );
      default:
        return from(
          this.collectionPicturesRef
            .orderBy('dateAdded', 'desc')
            .limit(criterion.limit)
            .get()
        );
    }
  }
}
