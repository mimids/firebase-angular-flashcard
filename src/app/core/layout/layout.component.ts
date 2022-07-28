import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Account } from '../models/user.model';
import { ThemeService } from '../../services/theme.service';
import { UserService } from '../../services/user.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

export interface Destination {
  name: string;
  path: string;

  icon: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('appTitleElement') appTitleElement?: ElementRef<HTMLElement>;
  @ViewChild('appDescriptionElement') appDescriptionElement?: ElementRef<
    HTMLElement
  >;
  @ViewChild('sidenav') 
  sidenav!: MatSidenav;
  
  appTitle = '';
  appDescription = '';
  destinations: Destination[] = [];
  unknownUserDestination:Destination[] = [];
  account: Account | undefined;
  readonly appVersion = environment.version;
  readonly isUnknownUserAllowedToNavigate = true;
  private readonly isDestroyed$ = new Subject<boolean>();

  isNotLarge$: Observable<boolean> = this.breakpointObserver
  .observe([Breakpoints.Large, Breakpoints.XLarge])
  .pipe(
    map(result => !result.matches)
  );
  isLarge$: Observable<boolean> = this.breakpointObserver
  .observe([Breakpoints.Medium,Breakpoints.Large, Breakpoints.XLarge])
  .pipe(
    map(result => result.matches)
  )


  constructor(
    private readonly metaService: Meta,
    private readonly themeService: ThemeService,
    private readonly titleService: Title,
    private readonly userService: UserService,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.themeService.init();

    this.unknownUserDestination = [
      {
        name: $localize`:@@login:Login`,
        path: 'auth/login',
        icon: 'person',
      },
      {
        name: $localize`:@@compte:Create Account`,
        path: 'auth/compte',
        icon: 'person_add',
      },
    ]
    this.destinations = [
      {
        name: $localize`:@@home:Home`,
        path: 'home',
        icon: 'home',
      },
      {
        name: $localize`:@@flashcard:Flash Card`,
        path: 'flashcard',
        icon: 'book',
      },

      {
        name: $localize`:@@admin:Add Category`,
        path: 'admin/category',
        icon: 'toc',
      },
      {
        name: $localize`:@@admin:Edit Flash Card`,
        path: 'admin/flashcard',
        icon: 'adb',
      },

      {
        name: $localize`:@@admin:Add Vocabulary`,
        path: 'admin/vocabulary',
        icon: 'add_to_photos',
      },

      {
        name: $localize`:@@flashcard:Vocabulary List`,
        path: 'list',
        icon: 'list',
      },
    ];

  }

  ngOnInit(): Subscription {
    return this.userService.account$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
        (res) => (this.account = res),
        (err) => (this.account = undefined),
      );
  }

  ngAfterViewChecked(): void {
    this.setMeta();
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  trackByIndex(index: number): number {
    return index;
  }

    listItemClick() {
    if (this.sidenav.mode == 'over' && this.sidenav.opened) {
      this.sidenav.close();
    }
  }

  private setMeta(): void {
    this.appTitle = this.appTitleElement?.nativeElement?.textContent as string;
    this.titleService.setTitle(this.appTitle);

    this.appDescription = this.appDescriptionElement?.nativeElement
      ?.textContent as string;
    this.metaService.updateTag({
      name: 'description',
      content: this.appDescription,
    });
  }
}
