import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FormNotificationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  type: 'personal-training' | 'wellness-massage';
  formData: any;
  captchaToken: string;
}

// Function to verify reCAPTCHA token with Google
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = Deno.env.get("RECAPTCHA_SECRET_KEY");
    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY not found in environment variables");
      return false;
    }

    const verificationURL = "https://www.google.com/recaptcha/api/siteverify";
    const response = await fetch(verificationURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const result = await response.json();
    console.log("reCAPTCHA verification result:", result);
    
    return result.success === true;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, type, formData, captchaToken }: FormNotificationRequest = await req.json();

    // Verify reCAPTCHA token first
    if (!captchaToken) {
      console.error("No reCAPTCHA token provided");
      return new Response(
        JSON.stringify({ error: "reCAPTCHA verification required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const isRecaptchaValid = await verifyRecaptcha(captchaToken);
    if (!isRecaptchaValid) {
      console.error("reCAPTCHA verification failed");
      return new Response(
        JSON.stringify({ error: "reCAPTCHA verification failed" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("reCAPTCHA verification successful");

    const isPersonalTraining = type === 'personal-training';
    const subject = isPersonalTraining 
      ? "Nouvelle demande Personal Training" 
      : "Nouvelle demande Wellness Massage";

    const serviceTitle = isPersonalTraining ? "Personal Training" : "Wellness Massage";

    // Préparer le contenu spécifique selon le type de formulaire
    let formDetails = '';
    if (isPersonalTraining) {
      formDetails = `
        <h3>Détails Personal Training :</h3>
        <ul>
          <li><strong>Objectifs :</strong> ${formData?.goals || 'Non spécifié'}</li>
          <li><strong>Background :</strong> ${formData?.background || 'Non spécifié'}</li>
          <li><strong>Routine d'activité :</strong> ${formData?.activity_routine || 'Non spécifiée'}</li>
          <li><strong>Référence :</strong> ${formData?.reference || 'Non spécifiée'}</li>
        </ul>
      `;
    } else {
      formDetails = `
        <h3>Détails Wellness Massage :</h3>
        <ul>
          <li><strong>Douleurs/Blessures :</strong> ${formData?.pain_injuries || 'Non spécifié'}</li>
          <li><strong>Disponibilité :</strong> ${formData?.availability || 'Non spécifiée'}</li>
          <li><strong>Référence :</strong> ${formData?.reference || 'Non spécifiée'}</li>
        </ul>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Gregory Bast Notifications <onboarding@resend.dev>",
      to: ["contact.gregory.bast@gmail.com"],
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb; margin-bottom: 20px;">Nouvelle demande ${serviceTitle}</h1>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Informations client :</h3>
            <ul>
              <li><strong>Nom :</strong> ${firstName} ${lastName}</li>
              <li><strong>Email :</strong> ${email}</li>
              <li><strong>Téléphone :</strong> ${phone || 'Non fourni'}</li>
            </ul>
            
            ${formDetails}
          </div>
          
          <p style="font-size: 12px; color: #6b7280;">
            Email généré automatiquement depuis le formulaire ${serviceTitle}.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);