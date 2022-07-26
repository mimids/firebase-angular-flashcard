import {   ChangeDetectionStrategy,ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/interfaces/card';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from '../../services/snackbar.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {

  public createForm: FormGroup;
  public datas: Array<Card> = [];
  private subscription: Subscription | null = null;

  constructor(
    private api:ApiService,
    private fb: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly snackbarService: SnackbarService
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
    
    });
  }

  async ngOnInit() {
  //   this.api.ListCards(undefined, 10).then((event) => {
  //     this.datas = event.items as Card[];
  //     this.changeDetectorRef.detectChanges();
  //   });

  //   this.subscription = <Subscription>(
  //     this.api.OnCreateVocabularyListener.subscribe((event: any) => {
  //       const newData = event.value.data.OnCreateVocabulary;
  //       this.datas = [newData, ...this.datas];
  //     })
  //   );
  }

  public onCreate(data: Card) {
    // this.api
    //   .CreateCard(data)
    //   .then((event) => {
    //     console.log('item created!');
    //     this.snackbarService.open('item created!', 'accent'),
    //     this.changeDetectorRef.detectChanges();
    //       this.createForm.reset();
    //   })
    //   .catch((e) => {
    //     this.snackbarService.open('error creating data...', 'warn'),
    //     console.log('error creating data...', e);
    //   });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = null;
  }

}
