import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
    public email: string = "";

    constructor(
        private userService: UserService,
        private notifier: NotifierService,
        private router: Router
    ) {}

    ngOnInit() {}

    handleResetPassword() {
        this.userService.forgotPassword(this.email).subscribe(
            (res: any) => {
                this.notifier.show({
                    type: "success",
                    message:
                        res?.message ||
                        "Un email de reinitialisation a ete envoye.",
                    id: "THAT_NOTIFICATION_ID",
                });
                setTimeout(() => {
                    this.router.navigateByUrl("/auth/signin");
                }, 1500);
            },
            (err) => {
                this.notifier.show({
                    type: "error",
                    message:
                        err?.error?.message ||
                        "Impossible d'envoyer l'email de reinitialisation.",
                    id: "THAT_NOTIFICATION_ID",
                });
            }
        );
    }
}
