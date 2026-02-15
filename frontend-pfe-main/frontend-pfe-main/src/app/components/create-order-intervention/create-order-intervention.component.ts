import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { Order } from "src/app/models/order";
import { OrdersService } from "src/app/services/orders.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-create-order-intervention",
    templateUrl: "./create-order-intervention.component.html",
    styleUrls: ["./create-order-intervention.component.scss"],
})
export class CreateOrderInterventionComponent implements OnInit {
    public order: Order;
    public successMsg: String = "";
    public errorMsg: String = "";
    public fournisseurs: any;

    constructor(
        private userService: UserService,
        private OrderService: OrdersService,
        private notifier: NotifierService,
        private router: ActivatedRoute
    ) {
        this.order = new Order();
    }

    ngOnInit(): void {
        this.router.params.subscribe((params) => {
            this.order.interventionId = params["id"];
        });
        this.userService.getAllFournisseurs().subscribe((res: any) => {
            this.fournisseurs = res.data;
        });
    }

    createOrder() {
        console.log("this.order.interventionId", this.order.interventionId);
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
