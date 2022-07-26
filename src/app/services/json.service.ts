import { Injectable } from '@angular/core';
import { Category, ParentCategory } from '../interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor() { }

  /** 
   * Parent category
  **/

  public addParentCateRowJson(data: ParentCategory[], dataAdd: ParentCategory): ParentCategory[] {

    data.push(dataAdd);

    return data;
  }

  public deleteParentCateRowJson(data: ParentCategory[], id: string): ParentCategory[] {

    return data.filter((list) => list.id !== id);
  }

  public modiNameParentCateRowJson(data: ParentCategory[], parent_id: string, parent_name: string): ParentCategory[] {

    data.forEach(elm => {
      Object.keys(elm).forEach((keys) => {
        if (elm.id === parent_id) { elm.name = parent_name }
      })
    })
    return data
  }

  /** 
   * Sub category
   **/

  public addSubCateRowJson(data: ParentCategory[], parent_id: string, sub_data: Category): ParentCategory[] {

    data.forEach(elm => {
      Object.keys(elm).forEach((keys) => {
        if (elm.id === parent_id) { elm.sub_cate.push(sub_data) }
      })
    })
    return data
  }
  public deleteSubCateRowJson(data: ParentCategory[], parent_id: string, subid: string): ParentCategory[] {

    data.forEach(elm => {
      Object.keys(elm).forEach((keys) => {
        if (elm.id === parent_id) {
          elm.sub_cate.filter((list) => list.id !== subid);
        }
      })
    })
    return data
  }

  public modiSubCateRowJson(data: ParentCategory[], parent_id: string, subname: string): ParentCategory[] {

    data.forEach(elm => {
      Object.keys(elm).forEach((keys) => {
        if (elm.id === parent_id) {
          elm.sub_cate.filter((list) => list.name !== subname);
        }
      })
    })
    return data
  }


}
