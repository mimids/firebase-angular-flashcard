import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlashCard } from 'src/app/interfaces/card';

@Component({
  selector: 'app-flashcard-contents',
  templateUrl: './flashcard-contents.component.html',
  styleUrls: ['./flashcard-contents.component.scss']
})
export class FlashcardContentsComponent implements OnInit {

  @Input()
  card!: FlashCard;
@Output() answer = new EventEmitter;

  showAnswer = false;

  constructor(

  ) { }

  ngOnInit(): void {
    // console.log('detail', this.card);
    
  }

  flip(){
    this.showAnswer= !this.showAnswer;

  }
  setAnswer(isRight : boolean){

    this.answer.emit({ id : this.card.id, isRight : isRight})

    // this.api
    // .UpdateCard( this.card.id as string)
    
  }

}
