import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { InterventionService } from "src/app/services/intervention.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-listing-interventions",
    templateUrl: "./listing-interventions.component.html",
    styleUrls: ["./listing-interventions.component.scss"],
})
export class ListingInterventionsComponent implements OnInit {
    public interventions: any;
    public users: User[];
    public intervention;
    public affectedUser: any;
    public total = 0;
    public filter;
    constructor(
        private interService: InterventionService,
        private userService: UserService
    ) {
        this.filter = {
            name: "",
            createdBy: "",
            lieu: "",
            etat: "",
        };
    }

    getInterventions() {
        this.interService.getAllInterventions().subscribe((res: any) => {
            console.log(res);
            this.total = res.length;
            this.interventions = res.reverse();
        });
    }

    ngOnInit(): void {
        this.userService.getAllUsers().subscribe((res: any) => {
            this.users = res.data.reverse();
        });
        this.getInterventions();
    }
    setIntervention(inter) {
        console.log("here", inter);
        this.intervention = inter;
    }

    setAffectedUser(user) {
        this.affectedUser = user;
    }

    affectedToUser(intervention) {
        this.interService
            .updateInterventionStatus(intervention._id, {
                affectedBy: this.affectedUser._id,
            })
            .subscribe((res: any) => {
                window.location.reload();
            });
    }

    supprimerIntervention(id) {
        this.interService.deleteIntervention(id).subscribe((res) => {
            this.getInterventions();
        });
    }
}
