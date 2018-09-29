import {Pipe, PipeTransform} from "@angular/core";
import * as _ from 'underscore/underscore'

@Pipe({name: 'order'})
export class OrderByPipe implements PipeTransform{
  transform(array, input) {
    return _.sortBy(array,input)
  }

}
