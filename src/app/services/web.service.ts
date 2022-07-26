import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Card } from '../interfaces/card';
import { Answer } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private BASE_URL = 'http://localhost:3000';
  cards:Array<any> = [];
  error:any = null;
  answers:Array<any>=[];



  constructor(private http: HttpClient) {
    this.getCards()
  }

  getCards() {
    this.http.get<Card[]>(`${this.BASE_URL}/cards`)
    .subscribe(data =>{
      this.cards = data;
      console.log('cards', data)
      this.answers = [];
    },error =>{
      this.error= error;
      this.error(error);
    }
    )

  }

  saveAnswer(answer: any){
    this.answers = [...this.answers, answer]
  }

  get allCardsAnswered(){
    return this.answers.length === this.cards.length;
  }

  saveAllAnswersToServer(){
    return this.http.post<Answer[]>(`${this.BASE_URL}/cards`,this.answers);
  }

  reset(){
    return this.http.post<{ reset : true }>(`${this.BASE_URL}/cards/reset`,{ reset : true});
  

  }
}
