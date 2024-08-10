import { useState } from 'react';
import UserRepo from '../repo/UserRepo';
import { ResponseData, Users } from '../model/Users';
import { VerificationRequest, VerificationResponse } from '../model/AggregatorResponse';

const useUserViewModel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aggregator, setAggregator] = useState('Naukri');
  const [otpResponse, setOtpResponse] = useState<ResponseData | null>(null);
  const [verificationResponse, setVerificationResponse] = useState<VerificationResponse | null>(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);

  const sendOtp = async () => {
    try {
      const user: Users = { email, password, aggregator };
      const response = await UserRepo.sendOTP(user);
      setOtpResponse(response);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setOtpResponse(null);
    }
  };

  const verifyOtp = async () => {
    try {
      const data: VerificationRequest = { email, otp, aggregator };
      const response = await UserRepo.verifyOTP(data);
      setVerificationResponse(response);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setVerificationResponse(null);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    aggregator,
    setAggregator,
    otp,
    setOtp,
    otpResponse,
    verificationResponse,
    error,
    sendOtp,
    verifyOtp,
  };
};

export default useUserViewModel;