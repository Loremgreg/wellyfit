import ReCAPTCHA from "react-google-recaptcha";
import { forwardRef } from "react";

interface RecaptchaProps {
  onChange: (token: string | null) => void;
}

const Recaptcha = forwardRef<ReCAPTCHA, RecaptchaProps>(({ onChange }, ref) => {
  return (
    <ReCAPTCHA
      ref={ref}
      sitekey="6LeIxAcpAAAAAJa_d4V2k_2v_5_1_1_1_1_1_1_1_1_1_1"
      onChange={onChange}
    />
  );
});

export default Recaptcha;