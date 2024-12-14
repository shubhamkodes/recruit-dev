import { AuthResponse } from "../model/AuthResponse";
import ApiService from "../service/ApiService";

class AuthRepository {
  async login(company_email: string, password: string): Promise<AuthResponse> {
    console.log('Calling API with:', { company_email, password });
    const endpoint = '/api/token'; 

    try {
      const response = await ApiService.post<AuthResponse>(endpoint, {
        company_email,
        password,
      });
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error during login API call:', error);
      throw error;
    }
  }
}

export default new AuthRepository();
