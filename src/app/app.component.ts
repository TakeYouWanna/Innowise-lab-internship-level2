import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from './shared/interfaces/user.interface';
import { initializeUser, loadUserSuccess } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'Innowise-lab-internship-level2';

  constructor(private store$: Store<User>) {
    this.store$.dispatch(initializeUser());
  }

  public ngOnInit(): void {}
}
