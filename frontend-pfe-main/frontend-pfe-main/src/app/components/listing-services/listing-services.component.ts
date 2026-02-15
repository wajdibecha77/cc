import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceUserService } from "src/app/services/service-user.service";

@Component({
    selector: "app-listing-services",
    templateUrl: "./listing-services.component.html",
    styleUrls: ["./listing-services.component.scss"],
})
export class ListingServicesComponent implements OnInit {
    public services: any;
    constructor(
        private serviceProvider: ServiceUserService,
        private router: Router
    ) {}

    public getServices() {
        this.serviceProvider.getAllServices().subscribe((res: any) => {
            this.services = res.data;
        });
    }
    ngOnInit(): void {
        this.serviceProvider.getAllServices().subscribe((res: any) => {
            this.services = res.data;
        });
    }
    deleteService(id) {
        this.serviceProvider.deleteService(id).subscribe((res) => {
            this.getServices();
        });
    }

    goToEditService(id) {
        this.router.navigate(["/create-service", id]);
    }
}
