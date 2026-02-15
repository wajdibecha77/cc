import { Component, OnInit } from "@angular/core";
import { OrdersService } from "src/app/services/orders.service";

@Component({
    selector: "app-listing-orders",
    templateUrl: "./listing-orders.component.html",
    styleUrls: ["./listing-orders.component.scss"],
})
export class ListingOrdersComponent implements OnInit {
    public orders: any[];
    public role = localStorage.getItem("role");
    constructor(private orderService: OrdersService) {}
    getOrders() {
        this.orderService.getAllOrders().subscribe((res: any) => {
            this.orders = res.data.reverse();
        });
    }
    ngOnInit(): void {
        this.getOrders();
    }

    updateOrderStat(stat, id) {
        let params = {
            status: stat,
        };
        this.orderService.updateOrderStatus(params, id).subscribe((res) => {
            this.getOrders();
        });
    }
}
