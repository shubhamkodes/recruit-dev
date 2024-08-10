import { useState } from 'react';
import UserRepo from '../repo/UserRepo';
import { User } from '../model/CommonUser';

export const AuthViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (user: User) => {
    setLoading(true);
    setError(null);
    try {
      await UserRepo.signUp(user);
      setLoading(false);
      return true;
    } catch (err) {
      setError("Failed signup");
      setLoading(false);
      return false;
    }
  };

  return {
    loading,
    error,
    signUp,
  };
};
