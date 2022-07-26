import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vocabulary } from 'src/app/interfaces/card';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-flashcard-contents',
  templateUrl: './flashcard-contents.component.html',
  styleUrls: ['./flashcard-contents.component.scss']
})
export class FlashcardContentsComponent implements OnInit {

  @Input()
  card!: Vocabulary;
@Output() answer = new EventEmitter;

  showAnswer = false;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private api: ApiService,

  ) { }

  ngOnInit(): void {
    // console.log('detail', this.card);
    
  }

  flip(){
    this.showAnswer= !this.showAnswer;

  }
  setAnswer(isRight : boolean){

    this.answer.emit({ card : this.card, isRight : isRight})

    // this.api
    // .UpdateCard( this.card.id as string)
    
  }

}
