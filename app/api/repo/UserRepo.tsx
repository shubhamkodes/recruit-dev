import ApiService from "../service/ApiService";
import { User } from "../model/CommonUser";
import { ResponseData, Users } from "../model/Users";
import {
  VerificationRequest,
  VerificationResponse,
} from "../model/AggregatorResponse";

class UserRepository {
  async loginViaOtpSend(email: string): Promise<any> {
    try {
      const response = await ApiService.post("/send-otp", { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
 
  async loginViaOtpVerify(email: string, otp: number): Promise<any> {
    try {
      const response = await ApiService.post("/verify-otp", { email, otp });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async signUp(user: User): Promise<any> {
    try {
      const response = await ApiService.post("/users", user);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async login(company_email: string, password: string): Promise<any> {
    try {
      const response = await ApiService.post("/token/", {
        company_email,
        password,
      });
      if (typeof response.data === "string" && !response.data.endsWith("/")) {
        response.data += "/";
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendOtp(email: string): Promise<any> {
    try {
      const response = await ApiService.post("/send-password-reset-otp", {
        email,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(
    email: string,
    otp: number,
    newPassword: string
  ): Promise<any> {
    try {
      const response = await ApiService.post("/reset-password", {
        email,
        otp,
        new_password: newPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // link aggregator

  async sendOTP(user: Users): Promise<ResponseData> {
    try {
      const response = await ApiService.post<ResponseData>("/link-agg", user);
      return response.data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  }

  async verifyOTP(data: VerificationRequest): Promise<VerificationResponse> {
    try {
      const response = await ApiService.post<VerificationResponse>(
        "/verify-agg-otp",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  }
  
}

export default new UserRepository();
