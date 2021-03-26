import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/shared/interfaces/user.interface';
import { FirestoreService } from 'src/app/shared/services/firebase/firestore.service';
import { loadUser } from 'src/app/store/user/actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store<User>,
    private firestore: FirestoreService
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  public onSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.store$.dispatch(loadUser({ email, password }));
    this.loginForm.reset();
  }
}
