import { useState } from 'react';
import UserRepo from '../repo/UserRepo';

export const useLoginViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserRepo.login(username, password);
      setLoading(false);
      return response;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  const sendOtp = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserRepo.sendOtp(email);
      setLoading(false);
      return response;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  const resetPassword = async (email: string, otp: number, newPassword: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserRepo.resetPassword(email, otp, newPassword);
      setLoading(false);
      return response;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  const loginViaOtpSend = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserRepo.loginViaOtpSend(email);
      setLoading(false);
      return response;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  const loginViaOtpVerify = async (email: string, otp: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserRepo.loginViaOtpVerify(email, otp);
      setLoading(false);
      return response;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return {
    loading,
    error,
    login,
    sendOtp,
    resetPassword,
    setLoading,
    loginViaOtpSend,
    loginViaOtpVerify,
  };
};
