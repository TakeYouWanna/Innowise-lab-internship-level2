import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Criterion } from '../../interfaces/criteria.interface';
import { PictureList } from '../../interfaces/picture-list.interface';
import { Picture } from '../../interfaces/picture.interface';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private collectionRef: CollectionReference<unknown>;

  constructor(private angularFirestore: AngularFirestore) {
    this.collectionRef = this.angularFirestore.collection('Images').ref;
  }

  public addNewPicture(
    imageSrc: string,
    author: string
  ): Observable<DocumentReference<unknown>> {
    const data = {
      imageSrc,
      author,
      date: new Date(),
    };
    return from(this.collectionRef.add(data));
  }

  public removePicture(id: string): Observable<void> {
    return from(this.collectionRef.doc(id).delete());
  }

  public getPictures(criterion: Criterion): Observable<PictureList> {
    return from(this.returnRequestByCriterion(criterion)).pipe(
      map((response) =>
        response.docs.reduce((acc, val) => {
          const { imageSrc, author } = val.data() as Picture;
          acc[val.id] = { imageSrc, author };
          return acc;
        }, {} as PictureList)
      )
    );
  }

  private returnRequestByCriterion(
    criterion: Criterion
  ): Promise<QuerySnapshot<unknown>> {
    switch (criterion.type) {
      case 'author':
        return this.collectionRef
          .where('author', '==', criterion.value)
          .limit(criterion.limit)
          .get();
      default:
        return this.collectionRef
          .orderBy('date', 'desc')
          .limit(criterion.limit)
          .get();
    }
  }
}
