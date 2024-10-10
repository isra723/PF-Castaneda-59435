import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../features/dashboard/users/models';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: User, transform?:string): string {

    return value.firstName + ' ' + value.lastName;

  }

}
