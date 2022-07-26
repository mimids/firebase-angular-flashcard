import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { Account } from '../../../interfaces/user';
import { SnackbarService } from '../../../services/snackbar.service';
import { ThemeService } from '../../../services/theme.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-layout-setting',
  templateUrl: './layout-setting.component.html',
  styleUrls: ['./layout-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSettingComponent implements OnInit, OnDestroy {
  @Input() account?: Account;
  isDarkThemeToggled = false;
  isUsableWithoutApi = environment.apiUrl === '';
  private readonly isDestroyed$ = new Subject<boolean>();

  constructor(
    @Inject(LOCALE_ID) readonly localeId: string,
    private readonly themeService: ThemeService,
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.isDarkThemeToggled = this.themeService.isDarkToggled;
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

 

  onSignOut(): void {
    this.userService.delete();
    this.router.navigate(['/auth/login']);
  }

  onOpenDialog(templateRef: TemplateRef<Component>): void {
    this.dialog.open(templateRef);
  }

  onCloseDialog(): void {
    this.dialog.closeAll();
  }

  onToggleDarkTheme(): void {
    this.themeService.toggleDark();
    this.isDarkThemeToggled = this.themeService.isDarkToggled;
  }
}
