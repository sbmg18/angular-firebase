import { Recipe } from './../recipe.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string): any[] {
    if (filterString === '' || value.length === 0) {
      return value;
    }

    const resultArray = [];
    const filterStrRegExp = new RegExp(`^.*${filterString.toLowerCase()}.*$`, 'g');

    for (const item of value) {
      if (filterStrRegExp.test(item[propName].toLowerCase())) {
        resultArray.push(item);
      } else {
        resultArray.push(null);
      }
    }

    return resultArray;
    // return value.filter(item => filterStrRegExp.test(item[propName].toLowerCase()));
  }

}
