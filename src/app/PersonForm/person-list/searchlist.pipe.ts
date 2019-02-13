import { Pipe, PipeTransform } from '@angular/core';
import {PersonModel} from '../person-service/person.modal';

@Pipe({
  name: 'searchlist'
})
export class SearchlistPipe implements PipeTransform {
  private counter=0;
  transform(users: any, searchTerm:any): PersonModel[] {
    this.counter++;
 
if(!searchTerm){
  // console.log('no search')
  return users; 
}

return users.filter(it=>{   
    const mobile_number1 = it.mobile_number1.toString().includes(searchTerm) 
    const firstName = it.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    return (mobile_number1+ firstName); 
  })
} 


}