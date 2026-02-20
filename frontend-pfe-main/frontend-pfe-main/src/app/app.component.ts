import { Component, OnInit, OnDestroy } from "@angular/core";
import {
    Router,
    NavigationStart,
    NavigationCancel,
    NavigationEnd,
} from "@angular/router";
import {
    Location,
    LocationStrategy,
    PathLocationStrategy,
} from "@angular/common";
import { filter } from "rxjs/operators";
import { UserService } from "./services/user.service";
declare let $: any;

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    providers: [
        Location,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
    ],
})
export class AppComponent implements OnInit, OnDestroy {
    location: any;
    routerSubscription: any;
    public role = localStorage.getItem("role");

    public token?: any = localStorage.getItem("token");
    public isConnected: boolean = false;
    public successMsg: String = "";
    public errorMsg: String = "";
    public account: any;

    constructor(private router: Router, private userService: UserService) {}

    isAuthRoute(): boolean {
        const url = this.location || this.router.url || "";
        return (
            url === "/login" ||
            url.startsWith("/auth/") ||
            url.startsWith("/others/error-404") ||
            url === "/home"
        );
    }

    ngOnInit() {
        if (this.token) {
            this.isConnected = true;

            this.userService.getConnectedUser().subscribe((res: any) => {
                console.log(res);
                this.account = res.data;
                this.account.password = "";
            });
        }
        this.recallJsFuntions();
    }

    recallJsFuntions() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                $(".preloader").fadeIn("slow");
            }
        });
        this.routerSubscription = this.router.events
            .pipe(
                filter(
                    (event) =>
                        event instanceof NavigationEnd ||
                        event instanceof NavigationCancel
                )
            )
            .subscribe((event) => {
                $.getScript("../assets/js/custom.js");
                $(".preloader").fadeOut("slow");
                this.location = this.router.url;
                this.token = localStorage.getItem("token");
                this.role = localStorage.getItem("role");
                if (!this.token && !this.isAuthRoute()) {
                    this.router.navigateByUrl("/auth/signin");
                    return;
                }
                if (!(event instanceof NavigationEnd)) {
                    return;
                }
                window.scrollTo(0, 0);
            });
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }
}
