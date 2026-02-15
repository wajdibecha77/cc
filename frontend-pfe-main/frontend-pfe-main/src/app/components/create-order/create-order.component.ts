import { Component, OnInit } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { Order } from "src/app/models/order";
import { OrdersService } from "src/app/services/orders.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-create-order",
    templateUrl: "./create-order.component.html",
    styleUrls: ["./create-order.component.scss"],
})
export class CreateOrderComponent implements OnInit {
    public order: Order;
    public successMsg: String = "";
    public errorMsg: String = "";
    public fournisseurs: any;
    constructor(
        private userService: UserService,
        private OrderService: OrdersService,
        private notifier: NotifierService
    ) {
        this.order = new Order();
    }

    ngOnInit(): void {
        this.userService.getAllFournisseurs().subscribe((res: any) => {
            this.fournisseurs = res.data;
        });
    }

    createOrder() {
        this.OrderService.createOrder(this.order).subscribe(
            (res: any) => {
                this.successMsg = "Order added successfully!";
                setTimeout(() => {
                    window.location.href = "/commandes";
                }, 2000);
            },
            (err) => {
                console.log("err", err);
                this.notifier.show({
                    type: "error",

                    message: "Tous les champs sont Obligatoire SVP!",
                    id: "THAT_NOTIFICATION_ID", // Again, this is optional
                });
            }
        );
    }
}
