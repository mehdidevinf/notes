import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mergeRows'
})
export class MergeRowsPipe implements PipeTransform {
  transform(items: any[]): any[] {
    const mergedItems = [];
    let previousItem = null;

    for (const item of items) {
      if (!previousItem || previousItem.intitule !== item.intitule) {
        mergedItems.push(item);
      } else {
        const mergedItem = { ...previousItem };
        mergedItem.libelle_evaluation = `${mergedItem.libelle_evaluation}, ${item.libelle_evaluation}`;
        mergedItem.coeffession += item.coeffession;
        mergedItem.total += item.total;
        mergedItems.pop();
        mergedItems.push(mergedItem);
      }
      previousItem = item;
    }

    return mergedItems;
  }
}
