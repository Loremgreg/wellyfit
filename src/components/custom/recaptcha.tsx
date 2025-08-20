import ReCAPTCHA from "react-google-recaptcha";
import { forwardRef } from "react";

interface RecaptchaProps {
  onChange: (token: string | null) => void;
}

const Recaptcha = forwardRef<ReCAPTCHA, RecaptchaProps>(({ onChange }, ref) => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  console.log("reCAPTCHA siteKey:", siteKey);
  
  return (
    <ReCAPTCHA
      ref={ref}
      sitekey={siteKey}
      onChange={onChange}
    />
  );
});

export default Recaptcha;