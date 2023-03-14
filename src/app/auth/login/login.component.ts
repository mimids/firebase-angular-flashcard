import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { SnackbarService } from '../../services/snackbar.service';
import { AuthError } from '../auth.model';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { ApiService } from 'src/app/services/api.service';
import { Account, UserI } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  @Output() readonly errorHappens = new EventEmitter<string>();
  formGroup: FormGroup;
  isLoading = false;
  isPasswordHidden = true;
  errorMessage = '';
  private readonly isDestroyed$ = new Subject<boolean>();
  account: Account | undefined;

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private authFire:Auth,
    private userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
  ) {
    this.formGroup = this.createFormGroup('change');

    
  }

  ngOnInit(): Subscription {
    return this.userService.account$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        (res) => {this.account = res;
          if(this.account){
          this.router.navigate(['/home']);}},
        (err) => (this.account = undefined),
      );
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  onSubmit(): void {
    this.isLoading = true;
    this.formGroup.disable();
    this.isPasswordHidden = true;
    this.auth.user.email = this.f.identifier?.value as string;
    this.auth.user.password = this.f.password?.value as string;

    signInWithEmailAndPassword(this.authFire, this.auth.user.email, this.auth.user.password)
      .then(retour => {
        console.log('retour login',retour);
        this.auth.user.uid = retour.user.uid;
        this.isLoading = false;
        this.userService.update(this.auth.user, retour.user.uid);
        this.router.navigate(['/home']);
        this.changeDetectorRef.detectChanges();

        // this.api.getFireUser(this.auth.user.uid)
          // .then(u => this.auth.user = u.data() as UserI)
          // .catch(er => console.log(er));

      }).catch(err => {
        console.log(err);
        this.isLoading = false;
        // if (err.code.indexof('wrong-password')) alert("il y a unse erreur dans le mot de pass")
        this.errorHappens.emit((err as Error).message);
        this.errorMessage = (err as Error).message;
      })
  }


  private createFormGroup(
    updateOn: 'submit' | 'change',
    previousValue?: { [key: string]: unknown },
  ): FormGroup {
    // tslint:disable
    const formGroup = this.formBuilder.group(
      {
        identifier: [undefined, [Validators.required, Validators.email]],
        password: [undefined, [Validators.required]],
      },
      {
        updateOn,
        validators: this.mustNotBeRejectedValidator(),
      },
    );
    if (previousValue !== undefined) {
      formGroup.setValue(previousValue);
    }

    return formGroup;
  }

  private mustNotBeRejectedValidator(): () => void {
    return () => {
      if (this.errorMessage === AuthError.InvalidEmail) {
        this.f.identifier.setErrors({ mustNotBeRejected: true });
      } else if (this.errorMessage === AuthError.InvalidPassword) {
        this.f.password.setErrors({ mustNotBeRejected: true });
      } else if (this.errorMessage !== '') {
        this.snackbarService.open(this.errorMessage, 'warn');
      }
      this.errorMessage = '';
    };
  }
}
