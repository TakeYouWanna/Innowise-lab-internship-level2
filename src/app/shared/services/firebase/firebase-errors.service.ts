import { Injectable } from '@angular/core';
import { ApiError } from 'src/app/shared/interfaces/api-error.interface';

@Injectable({ providedIn: 'root' })
export class FirebaseErrorsService {
  public getMessageFromError(error: ApiError): string {
    switch (error.message) {
      case "Invalid Query. A non-empty array is required for 'in' filters.":
        return 'Ops... Nothing found =(';

      default:
        return error.message;
    }
  }
}
