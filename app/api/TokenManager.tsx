class TokenManager {
  private static accessToken: string | null = null;
  private static refreshToken: string | null = null;

  /**
   * Save tokens to memory and optionally persist to localStorage.
   */
  static setTokens(access: string, refresh: string, persist: boolean = true): void {
    this.accessToken = access;
    this.refreshToken = refresh;

    if (persist) {
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
    }
  }

  /**
   * Retrieve the access token from memory or localStorage.
   */
  static getAccessToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('accessToken');
    }
    return this.accessToken;
  }

  /**
   * Retrieve the refresh token from memory or localStorage.
   */
  static getRefreshToken(): string | null {
    if (!this.refreshToken) {
      this.refreshToken = localStorage.getItem('refreshToken');
    }
    return this.refreshToken;
  }

  /**
   * Clear tokens from memory and localStorage.
   */
  static clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  /**
   * Check if an access token is available and valid.
   */
  static hasValidAccessToken(): boolean {
    const token = this.getAccessToken();
    return !!token; // Add additional validation logic here if needed (e.g., JWT expiration).
  }
}

export default TokenManager;
