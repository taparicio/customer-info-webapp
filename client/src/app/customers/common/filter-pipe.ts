// FiterPipe.ts
// Filters items given in a search bar as typed

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string, filters: string[]): any[] {
        if (!items) {
            return [];
        }

        if (!searchText) {
            return items;
        }

        searchText = searchText.toLowerCase();

        const filteredItems = [];

        items.forEach(item => {
            filters.forEach(filter => {
                if (item[filter] !== null && item[filter].toLowerCase().includes(searchText)) {
                    if (!filteredItems.some((listItem) => listItem._id === item._id)) {
                        filteredItems.push(item);
                    }
                }
            });
        });
        return filteredItems;
    }
}
