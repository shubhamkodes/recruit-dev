import Image from "next/image";
import { ChangeEvent } from "react";

interface VerifyEmailScreenProps {
  email: string;
  otp: string;
  setOtp: (otp: string) => void;
  verifyOtp: () => void;
  error: string | null;
}

const VerifyEmailScreen: React.FC<VerifyEmailScreenProps> = ({
  email,
  otp,
  setOtp,
  verifyOtp,
  error,
}) => {
  const handleChange = (element: ChangeEvent<HTMLInputElement>, index: number) => {
    if (isNaN(Number(element.target.value))) return;
    const newOtp = otp.split('');
    newOtp[index] = element.target.value;
    setOtp(newOtp.join(''));
    // Move to the next input box if it exists
    if (
      element.target.nextSibling &&
      (element.target.nextSibling as HTMLInputElement).focus
    ) {
      (element.target.nextSibling as HTMLInputElement).focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  ">
      <div className="p-14 rounded-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <Image
            src="/dashboard/mail_fill.svg"
            alt="Mail Icon"
            width={100}
            height={100}
          />
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">
          Verify your company mail
        </h1>
        <p className="text-center text-gray-600 mb-6">
          One time pass send to your mail ID on{" "}
          <span className="font-bold">{email}</span>
        </p>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="otp"
          >
            One Time Password (OTP)
          </label>
          <div className="flex justify-between">
            {new Array(6).fill(0).map((_, index) => (
              <input
                key={index}
                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl"
                type="text"
                name="otp"
                maxLength={1}
                value={otp[index] || ''}
                onChange={(e) => handleChange(e, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
        </div>
        <p className="text-right text-gray-600 mb-4">Valid in 05:00 Min</p>
        {error && (
          <p className="text-red-500 text-xs mt-1 pb-4 text-center">{error}</p>
        )}
        <button
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600 transition duration-300"
          onClick={verifyOtp}
        >
          Verify now
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailScreen;