import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure:false
})
export class SearchPipe implements PipeTransform {

  transform(list: any,key:string,value:string ): any[] {
    if(!list.length){
      return [];
    }
    if(value.trim() == ''){
      return [...list];
    }
    return list.filter(obj=>{
      return obj[key].toLowerCase().includes(value.toLowerCase());
    });
  }

}
