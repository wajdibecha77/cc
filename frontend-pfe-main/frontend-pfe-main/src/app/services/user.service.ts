import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class UserService {
    public base_Url = "http://localhost:5000";
    public isConnected: boolean = false;
    constructor(private http: HttpClient) {}

    public login(email: any, password: any) {
        return this.http.post(this.base_Url + "/users/login", {
            email: email,
            password: password,
        });
    }

    public forgotPassword(email: string) {
        return this.http.post(this.base_Url + "/users/forgot-password", {
            email,
        });
    }

    public getConnectedUser() {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            "x-auth-token": token ? token : "",
        });
        if (token) {
            this.isConnected = true;
        }
        return this.http.get(this.base_Url + "/users/me", { headers });
    }

    public updateUser(id, account) {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            "x-auth-token": token ? token : "",
        });

        return this.http.put(this.base_Url + "/users/update/" + id, account, {
            headers,
        });
    }

    public createUser(account) {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            "x-auth-token": token ? token : "",
        });

        return this.http.post(this.base_Url + "/users/createuser", account, {
            headers,
        });
    }

    public createFournisseur(account) {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            "x-auth-token": token ? token : "",
        });

        return this.http.post(
            this.base_Url + "/users/createFournisseur",
            account,
            {
                headers,
            }
        );
    }

    public getAllUsers() {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            "x-auth-token": token ? token : "",
        });

        return this.http.get(this.base_Url + "/users", {
            headers,
        });
    }

    public getAllFournisseurs() {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            "x-auth-token": token ? token : "",
        });

        return this.http.get(this.base_Url + "/users/getAllFournisseurs", {
            headers,
        });
    }

    public getFournisseurById(id) {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            "x-auth-token": token ? token : "",
        });

        return this.http.get(this.base_Url + `/users/getFournisseur/${id}`, {
            headers,
        });
    }

    public updateFournisseur(id, fournisseur) {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            "x-auth-token": token ? token : "",
        });

        return this.http.put(
            this.base_Url + `/users/updateFournisseur/${id}`,
            fournisseur,
            { headers }
        );
    }

    public deleteFournisseur(id) {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            "x-auth-token": token ? token : "",
        });

        return this.http.delete(this.base_Url + `/users/deleteFournisseur/${id}`, {
            headers,
        });
    }

    public deleteUser(id) {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            "x-auth-token": token ? token : "",
        });
        return this.http.delete(
            this.base_Url + `/users/delete/${id}`,

            { headers }
        );
    }
}
