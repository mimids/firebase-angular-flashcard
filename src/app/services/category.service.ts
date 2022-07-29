import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
categoryList : string[]=[];

  constructor() { }
}
