import { Component, OnInit } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { User } from "src/app/models/user";
import { ServiceUserService } from "src/app/services/service-user.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-create-user",
    templateUrl: "./create-user.component.html",
    styleUrls: ["./create-user.component.scss"],
})
export class CreateUserComponent implements OnInit {
    public user: User;
    public successMsg: String = "";
    public errorMsg: String = "";
    public services: any;
    constructor(
        private userService: UserService,
        private serviceProvider: ServiceUserService,
        private notifier: NotifierService
    ) {
        this.user = new User();
    }

    ngOnInit(): void {
        this.serviceProvider.getAllServices().subscribe((res: any) => {
            this.services = res.data;
        });
    }

    createUser() {
        this.userService.createUser(this.user).subscribe(
            (res: any) => {
                this.successMsg = "User added successfully!";
                setTimeout(() => {
                    window.location.href = "/users";
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
