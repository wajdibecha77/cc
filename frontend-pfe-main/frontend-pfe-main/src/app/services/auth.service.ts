import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    public base_Url = "http://localhost:5000";

    constructor(private http: HttpClient) {}

    public forgotPassword(email: string) {
        return this.http.post(this.base_Url + "/auth/forgot-password", {
            email,
        });
    }

    public verifyResetCode(email: string, code: string) {
        return this.http.post(this.base_Url + "/auth/verify-reset-code", {
            email,
            code,
        });
    }

    public resetPassword(email: string, code: string, newPassword: string) {
        return this.http.post(this.base_Url + "/auth/reset-password", {
            email,
            code,
            newPassword,
        });
    }
}
