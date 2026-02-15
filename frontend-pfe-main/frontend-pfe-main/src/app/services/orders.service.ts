import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class OrdersService {
    public base_Url = "http://localhost:5000";
    public isConnected: boolean = false;
    constructor(private http: HttpClient) {}

    public createOrder(account) {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            "x-auth-token": token ? token : "",
        });

        return this.http.post(this.base_Url + "/orders", account, {
            headers,
        });
    }

    public updateOrderStatus(order, id) {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            "x-auth-token": token ? token : "",
        });

        return this.http.put(this.base_Url + "/orders/" + id, order, {
            headers,
        });
    }

    public getAllOrders() {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders({
            "x-auth-token": token ? token : "",
        });

        return this.http.get(this.base_Url + "/orders/all", {
            headers,
        });
    }
}
