import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  type: 'personal-training' | 'wellness-massage';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, type }: EmailRequest = await req.json();

    const isPersonalTraining = type === 'personal-training';
    const subject = isPersonalTraining 
      ? "Bestätigung Ihrer Personal Training Anfrage" 
      : "Bestätigung Ihrer Wellness Massage Anfrage";

    const serviceTitle = isPersonalTraining ? "Personal Training" : "Wellness Massage";

    const emailResponse = await resend.emails.send({
      from: "Personal Training & Wellness <onboarding@resend.dev>",
      to: [email],
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb; margin-bottom: 20px;">Vielen Dank für Ihre Anfrage!</h1>
          
          <p>Liebe/r ${firstName} ${lastName},</p>
          
          <p>vielen Dank für Ihr Interesse an unserem <strong>${serviceTitle}</strong> Service. Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen melden.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Was passiert als nächstes?</h3>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Wir prüfen Ihre Anfrage sorgfältig</li>
              <li>Sie erhalten innerhalb von 24 Stunden eine persönliche Antwort</li>
              <li>Gemeinsam planen wir Ihren individuellen ${serviceTitle} Termin</li>
            </ul>
          </div>
          
          <p>Bei Fragen können Sie uns jederzeit kontaktieren.</p>
          
          <p style="margin-top: 30px;">
            Mit freundlichen Grüßen,<br>
            <strong>Ihr Personal Training & Wellness Team</strong>
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
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