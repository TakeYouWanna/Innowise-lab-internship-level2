import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/store';
import { logOutUser } from 'src/app/store/user/actions';
import { selectUserUid } from 'src/app/store/user/selectors';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  public uid$: Observable<string> = this.store$.pipe(select(selectUserUid));

  constructor(private store$: Store<State>, private router: Router) {}

  public logOut(): void {
    this.store$.dispatch(logOutUser());
    this.uid$.subscribe((uid) => {
      if (!uid) {
        this.router.navigate(['']);
      }
    });
  }
}
