import ReCAPTCHA from "react-google-recaptcha";
import { forwardRef } from "react";

interface RecaptchaProps {
  onChange: (token: string | null) => void;
}

const Recaptcha = forwardRef<ReCAPTCHA, RecaptchaProps>(({ onChange }, ref) => {
  return (
    <ReCAPTCHA
      ref={ref}
      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      onChange={onChange}
    />
  );
});

export default Recaptcha;