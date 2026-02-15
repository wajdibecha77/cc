import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Intervention } from "src/app/models/intervention";
import { InterventionService } from "src/app/services/intervention.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-intervention-details",
    templateUrl: "./intervention-details.component.html",
    styleUrls: ["./intervention-details.component.scss"],
})
export class InterventionDetailsComponent implements OnInit {
    public intervention: any;
    public users: any;
    public me: any;
    public id: string;
    public affectedUser: any;
    constructor(
        private interventionService: InterventionService,
        private userService: UserService,
        private router: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.userService.getAllUsers().subscribe((res: any) => {
            this.users = res.data;
        });
        this.userService.getConnectedUser().subscribe((res: any) => {
            this.me = res.data;
        });
        this.router.params.subscribe((params) => {
            this.id = params["id"];
        });
        this.interventionService
            .getInterventionById(this.id)
            .subscribe((res) => {
                this.intervention = res;
            });
    }

    setAffectedUser(user) {
        this.affectedUser = user;
    }

    affectedToUser(intervention) {
        this.interventionService
            .updateInterventionStatus(intervention._id, {
                affectedBy: this.affectedUser._id,
            })
            .subscribe((res: any) => {
                window.location.reload();
            });
    }

    affectedToMe(intervention) {
        this.interventionService
            .updateInterventionStatus(intervention._id, {
                affectedBy: this.me._id,
            })
            .subscribe((res: any) => {
                window.location.reload();
            });
    }

    interventionDone(intervention) {
        this.interventionService
            .updateInterventionStatus(intervention._id, {
                etat: "TERMINEE",
            })
            .subscribe((res: any) => {
                window.location.reload();
            });
    }

    interventionExit(intervention) {
        this.interventionService
            .updateInterventionStatus(intervention._id, {
                fermer: 1,
            })
            .subscribe((res: any) => {
                window.location.reload();
            });
    }

    supprimerIntervention(id) {
        this.interventionService.deleteIntervention(id).subscribe((res) => {
            window.location.href = "/interventions";
        });
    }

    updateOrderIntervention(id) {
        let params = {
            interventionId: id,
        };
        this.interventionService
            .updateInterventionOrder(params, id)
            .subscribe((res) => {
                window.location.reload();
            });
    }
}
