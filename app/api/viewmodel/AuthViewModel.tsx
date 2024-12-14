import AuthRepository from '../repo/AuthRepo';
import TokenManager from '../TokenManager';

class AuthViewModel {
  async login(company_email: string, password: string): Promise<void> {
    try {
      const { access, refresh } = await AuthRepository.login(company_email, password);
      TokenManager.setTokens(access, refresh);
      console.log('Login successful, tokens saved.');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  getAccessToken(): string | null {
    return TokenManager.getAccessToken();
  }

  getRefreshToken(): string | null {
    return TokenManager.getRefreshToken();
  }

  logout(): void {
    TokenManager.clearTokens();
    console.log('Logged out, tokens cleared.');
  }
}

export default new AuthViewModel();
