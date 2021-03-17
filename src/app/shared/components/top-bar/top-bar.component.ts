import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logOutUser } from 'src/app/store/user/user.actions';
import { selectUserUid } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  public uid$: Observable<string> = this.store$.pipe(select(selectUserUid));

  constructor(private store$: Store) {}

  public logOut(): void {
    this.store$.dispatch(logOutUser());
  }
}
