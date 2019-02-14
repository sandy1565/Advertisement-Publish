import { Pipe, PipeTransform } from '@angular/core';
import {AdvtModel} from '../services/advtDetails.model';

@Pipe({
  name: 'searchAdvtDetails'
})
export class SearchAdvtDetailsPipe implements PipeTransform {
  private counter=0;
  transform(users: any, searchTerm:any): AdvtModel[] {
    this.counter++;

if(!searchTerm){
  console.log('no search')
  return users; 
}

return users.filter(it=>{   
    const clientName = it.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    return ( clientName); 
  })
} 



}
