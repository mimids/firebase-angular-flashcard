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
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { ApiError } from '../../core/models/error.model';
import { SnackbarService } from '../../services/snackbar.service';
import { mustMatchValidator } from '../../shard/validators/must-murch.validator';
import { AuthError } from '../auth.model';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import {
  getStorage,
  ref,
  listAll
} from "firebase/storage";
import { getApp } from '@angular/fire/app';
import { getDownloadURL, list } from '@angular/fire/storage';



@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

  @Output() readonly errorHappens = new EventEmitter<string>();
  formGroup: FormGroup;
  isLoading = false;
  isPasswordHidden = true;
  errorMessage = '';
  imgUrls: string[] = [];
  defaultavatar='0-1.png'
  private readonly isDestroyed$ = new Subject<boolean>();

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  constructor(
    public auth: AuthService,
    private authFire: Auth,
    private apiService: ApiService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    private readonly dialog: MatDialog,
    private userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.formGroup = this.createFormGroup('change');
    for(let i=1; i<=100; i++){
      this.imgUrls.push('0-'+i+'.png');
    }
  }


  ngOnInit(): void {

  //       const storage = getStorage();
  //   const storageRef = ref(storage, 'avatar');
  // list(storageRef, { maxResults: 10 })
  //     .then((res) => {
  //       res.items.forEach(async (itemRef) => {
  //         await getDownloadURL(ref(storage, itemRef.fullPath))
  //           .then(url => {
  //             this.imgUrls.push(url);
  //           })
  //           .catch(err => console.log(err))
  //         });
  //         console.log('this.imgUrls',this.imgUrls);
  //         this.changeDetectorRef.detectChanges();
        
  //     })
    
    // getDownloadURL(storageRef)
    // .then(url => {
    //   console.log('url',url);

    //   this.imgUrl = url;
    //   this.changeDetectorRef.detectChanges();
    // })
    // .catch(err => console.log(err))

  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  onSubmit(): void {
    this.formGroup.disable();
    this.isPasswordHidden = true;
    this.auth.user.firstName = this.f.firstName?.value as string;
    this.auth.user.lastName = this.f.lastName?.value as string;
    this.auth.user.email = this.f.email?.value as string;
    this.auth.user.password = this.f.password?.value as string;
    this.auth.user.avatar = this.f.avatar?.value as string;


    createUserWithEmailAndPassword(this.authFire, this.auth.user.email, this.auth.user.password)
      .then(u => {
        console.log(u);
        this.auth.user.uid = u.user.uid;
        this.apiService.setFireUsers(this.auth.user);
        this.userService.update(this.auth.user, u.user.uid);
        this.router.navigate(['/home']);
      }).catch(err => {
        console.log(err.code, err.messager);
        this.errorHappens.emit((err as ApiError).message);
        this.errorMessage = (err as ApiError).message;
        this.isLoading = false;
      })
  }



  onCloseDialog(): Promise<boolean> {
    this.dialog.closeAll();

    return this.router.navigate(['home']);
  }

  private createFormGroup(
    updateOn: 'submit' | 'change',
    previousValue?: { [key: string]: unknown },
  ): FormGroup {
    const formGroup = this.formBuilder.group(
      {
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [Validators.required, Validators.pattern(/^.{8,255}$/)],
        ],
        confirmPassword: [null, [Validators.required]],
        avatar: [null, [Validators.required]],
      },
      {
        updateOn,
        validators: [
          mustMatchValidator('password', 'confirmPassword'),
          this.mustNotBeRejectedValidator(),
        ],
      },
      // tslint:enable
    );

    if (previousValue !== undefined) {
      formGroup.setValue(previousValue);
    }

    return formGroup;
  }

  private mustNotBeRejectedValidator(): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      if (this.errorMessage === AuthError.EmailExists) {
        formGroup.controls.email.setErrors({ mustNotBeRejected: true });
      } else if (this.errorMessage !== '') {
        this.snackbarService.open(this.errorMessage, 'warn');
      }
      this.errorMessage = '';
    };
  }
}
function getFileList() {
  throw new Error('Function not implemented.');
}

