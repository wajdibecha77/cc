import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "interPipe",
    pure: false,
})
export class InterventionPipe implements PipeTransform {
    transform(items: any, filter: any): any {
        console.log(filter, items);
        if (items && items.length > 0) {
            return items.filter((item) => {
                return (
                    item.name
                        .toLowerCase()
                        .includes(filter.name.toLowerCase()) &&
                    item.lieu
                        .toLowerCase()
                        .includes(filter.lieu.toLowerCase()) &&
                    item.etat
                        .toLowerCase()
                        .includes(filter.etat.toLowerCase()) &&
                    item.createdBy.name
                        .toLowerCase()
                        .includes(filter.createdBy.toLowerCase())
                );
            });
        }
    }
}
