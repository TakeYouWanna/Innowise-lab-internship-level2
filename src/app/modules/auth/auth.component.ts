import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserUid } from 'src/app/store/user/selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public uid$: Observable<string> = this.store$.pipe(select(selectUserUid));

  constructor(private store$: Store, private router: Router) {}

  public ngOnInit(): void {
    this.uid$.subscribe((uid) => {
      if (uid) {
        this.router.navigate(['']);
      }
    });
  }
}
