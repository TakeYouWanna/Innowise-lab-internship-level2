import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createUser } from 'src/app/store/user/actions';
import { matchValues } from './validators/match-values.validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store$: Store) {}

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [
        null,
        [Validators.required, Validators.minLength(6), matchValues('password')],
      ],
    });
  }

  public onSubmit(): void {
    const { email, password, name } = this.registerForm.value;
    this.store$.dispatch(createUser({ email, password, name }));
    this.registerForm.reset();
  }
}
