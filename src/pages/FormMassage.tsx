import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Heart } from "lucide-react";
import wellnessMassageImage from "@/assets/wellness-massage.jpg";
import Recaptcha from "@/components/custom/recaptcha";
import ReCAPTCHA from "react-google-recaptcha";

const FormMassage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaValue) {
      toast({
        title: "Bitte bestätigen Sie, dass Sie kein Roboter sind.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);

      // Préparer les données pour Supabase
      const requestData = {
        first_name: formData.get('firstName') as string,
        last_name: formData.get('lastName') as string,
        email: formData.get('email') as string,
        city: formData.get('city') as string || null,
        phone: formData.get('phone') as string || null,
        pain_injuries: formData.get('pain') as string || null,
        availability_notes: formData.get('availabilityNotes') as string || null,
        reference_source: formData.get('refSource') as string,
        reference_name: formData.get('refName') as string || null,
        consent_given: true
      };

      // Sauvegarder dans Supabase
      const { error: dbError } = await supabase
        .from('wellness_massage_requests')
        .insert(requestData);

      if (dbError) {
        throw new Error('Erreur lors de la sauvegarde des données');
      }

      // Envoyer une notification à Gregory
      const { error: emailError } = await supabase.functions.invoke('send-confirmation-email', {
        body: {
          firstName: requestData.first_name,
          lastName: requestData.last_name,
          email: requestData.email,
          phone: requestData.phone,
          type: 'wellness-massage',
          formData: {
            pain_injuries: requestData.pain_injuries,
            availability: requestData.availability_notes,
            reference: `${requestData.reference_source}${requestData.reference_name ? ` (${requestData.reference_name})` : ''}`
          }
        }
      });

      if (emailError) {
        console.error('Erreur notification:', emailError);
      }

      toast({
        title: "Anfrage erfolgreich gesendet!",
        description: "Ich melde mich innerhalb von 1-2 Werktagen bei Ihnen.",
      });

      // Réinitialiser le formulaire
      (e.target as HTMLFormElement).reset();
      recaptchaRef.current?.reset();
      setCaptchaValue(null);

    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-warm-gray-50">
    {/* Hero Section */}
    <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Wellness‑Massage
          </h1>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Buchen Sie Ihre <strong>Wellness-Massage bei Ihnen zu Hause</strong>.
            Ich komme zu Ihnen in Murnau am Staffelsee und Umgebung und gestalte Ihre Massage entspannt und professionell.
          </p>
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 inline-block">
            <p className="text-primary-foreground/90">
              <strong>Nach dem Absenden</strong> melde ich mich in der Regel{" "}
              <strong>innerhalb von 1–2 Werktagen</strong> um Ihren Termin zu bestätigen.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Form Section */}
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="card-elegant">
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold mb-4 text-primary">
                  Anfrageformular
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Heart className="text-accent" size={16} />
                    <span>Wellness‑Massage bei Ihnen zu Hause</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="text-accent" size={16} />
                    <span>Individuell angepasst</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="text-accent" size={16} />
                    <span>Wohlfühl‑Massage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="text-accent" size={16} />
                    <span>Physiotherapeutische Ausbildung</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Ihre Angaben</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Vorname *</Label>
                      <Input id="firstName" name="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nachname *</Label>
                      <Input id="lastName" name="lastName" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">E-Mail *</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Stadt</Label>
                      <Input id="city" name="city" placeholder="z. B. Murnau" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+49…" />
                  </div>
                </div>

                {/* Preferences */}
                <div className="space-y-4">




                  <div>
                    <Label htmlFor="pain">Haben Sie derzeit Beschwerden oder Verletzungen?</Label>
                    <Textarea id="pain" name="pain" placeholder="Ja/Nein. Falls ja: bitte Details (Ort, Art, seit wann, Einschränkungen)." rows={3} />
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Ihre Verfügbarkeiten</h3>
                  <p className="text-sm text-muted-foreground">Geben Sie Ihre verfügbaren Tage/Uhrzeiten bitte manuell ein.</p>
                  <div className="p-4 border border-border rounded-lg">
                    <Label htmlFor="availabilityNotes">Verfügbarkeiten</Label>
                    <Textarea
                      id="availabilityNotes"
                      rows={4}
                      placeholder="z. B. Montag von 16 Uhr bis 19 Uhr; Sonntag von 10 Uhr bis 12 Uhr; unter der Woche ab 18 Uhr"
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-2">Je genauer, desto besser – gerne mehrere Optionen angeben.</p>
                  </div>
                </div>

                {/* Reference */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="refSource">Wie haben Sie von mir erfahren? *</Label>
                    <Select name="refSource" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Bitte wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="existing-client">Bestehende Kundin / bestehender Kunde</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="doctor">Ärztin/Arzt</SelectItem>
                        <SelectItem value="friend-family">Freund/Familie</SelectItem>
                        <SelectItem value="other">Andere</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="refName">Falls Empfehlung: Name der Person</Label>
                    <Input id="refName" name="refName" />
                  </div>
                </div>

                {/* Consent */}
                <div className="flex items-start space-x-2">
                  <Checkbox id="consent" required />
                  <Label htmlFor="consent" className="text-sm leading-relaxed">
                    Ich willige ein, dass meine Angaben zur Kontaktaufnahme und für Rückfragen
                    gespeichert und verarbeitet werden. Hinweise in der{" "}
                    <a href="/datenschutz" className="text-primary underline">
                      Datenschutzerklärung
                    </a>.
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Recaptcha ref={recaptchaRef} onChange={setCaptchaValue} />
                </div>

                <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Wird gesendet..." : "Senden"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image */}
            <Card className="overflow-hidden">
              <img src={wellnessMassageImage} alt="Massage Murnau Preise" className="w-full h-48 object-cover" />
            </Card>

            {/* Pricing */}
            <Card className="card-elegant">
              <h3 className="text-lg font-semibold mb-4 text-primary">Wellness‑Massagen Preise</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Ganzer Körper:</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-sm mb-2">60 Minuten:</div>
                      <div className="ml-4 space-y-1 text-sm">
                        <div className="flex items-baseline justify-between gap-2">
                          <span>Einzelsitzung</span>
                          <span className="font-semibold whitespace-nowrap">89 €</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <span>12er‑Karte</span>
                          <span className="font-semibold whitespace-nowrap">
                            80 € <span className="text-xs font-normal text-muted-foreground">(Gesamt 960 €)</span>
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <span>24er‑Karte</span>
                          <span className="font-semibold whitespace-nowrap">
                            75 € <span className="text-xs font-normal text-muted-foreground">(Gesamt 1.800 €)</span>
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <span>48er‑Karte</span>
                          <span className="font-semibold whitespace-nowrap">
                            70 € <span className="text-xs font-normal text-muted-foreground">(Gesamt 3.360 €)</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-2">45 Minuten:</div>
                      <div className="ml-4 space-y-1 text-sm">
                        <div className="flex items-baseline justify-between gap-2">
                          <span>Einzelsitzung</span>
                          <span className="font-semibold whitespace-nowrap">69 €</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <span>12er‑Karte</span>
                          <span className="font-semibold whitespace-nowrap">
                            64 € <span className="text-xs font-normal text-muted-foreground">(Gesamt 768 €)</span>
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <span>24er‑Karte</span>
                          <span className="font-semibold whitespace-nowrap">
                            61 € <span className="text-xs font-normal text-muted-foreground">(Gesamt 1.464 €)</span>
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <span>48er‑Karte</span>
                          <span className="font-semibold whitespace-nowrap">
                            58 € <span className="text-xs font-normal text-muted-foreground">(Gesamt 2.784 €)</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Rücken Massage:</h4>
                  <div>
                    <div className="font-medium text-sm mb-2">30 Minuten:</div>
                    <div className="ml-4 space-y-1 text-sm">
                      <div className="flex items-baseline justify-between gap-2">
                        <span>Einzelsitzung</span>
                        <span className="font-semibold whitespace-nowrap">49 €</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Process */}
            <Card className="card-elegant">
              <h3 className="text-lg font-semibold mb-4 text-primary">Was kann ich erwarten?</h3>
              <div className="space-y-3 text-sm">
                <p>• Sie füllen das Anfrageformular aus</p>
                <p>• Ich melde mich innerhalb von 1–2 Werktagen</p>
                <p>• Ich komme zum vereinbarten Termin zu Ihnen</p>
                <p>• Genießen Sie Ihre Wellness‑Massage</p>
              </div>
            </Card>

            {/* Guidelines */}
            <Card className="card-elegant">
              <h3 className="text-lg font-semibold mb-4 text-primary">Richtlinien</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Absagen bis 24 Stunden vor dem Termin sind kostenfrei. Bei kurzfristigen Absagen (≤ 24 Stunden) wird die volle Einheit als Ausfallhonorar fällig.</p>
                <p>• Einsatzgebiet: Murnau + 25 km Umkreis</p>
                <p>• Liege/Neutrale Öle bringe ich mit</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  </div>;
};
export default FormMassage;