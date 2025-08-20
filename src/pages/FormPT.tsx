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
import personalTrainingImage from "@/assets/personal-training.jpg";
import Recaptcha from "@/components/custom/recaptcha";
import ReCAPTCHA from "react-google-recaptcha";

const FormPT = () => {
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
        background: formData.get('background') as string || null,
        goals: formData.get('goals') as string,
        activity_routine: formData.get('routine') as string,
        pain_injuries: null,
        reference_source: formData.get('refSource') as string,
        reference_name: formData.get('refName') as string || null,
        consent_given: true
      };

      // Sauvegarder dans Supabase
      const { error: dbError } = await supabase
        .from('personal_training_requests')
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
          type: 'personal-training',
          captchaToken: captchaValue,
          formData: {
            goals: requestData.goals,
            background: requestData.background,
            activity_routine: requestData.activity_routine,
            reference: `${requestData.reference_source}${requestData.reference_name ? ` (${requestData.reference_name})` : ''}`
          }
        }
      });

      if (emailError) {
        console.error('Erreur notification:', emailError);
        // Check if it's a reCAPTCHA error
        if (emailError.message?.includes('reCAPTCHA')) {
          toast({
            title: "reCAPTCHA-Überprüfung fehlgeschlagen",
            description: "Bitte versuchen Sie das reCAPTCHA erneut.",
            variant: "destructive",
          });
          recaptchaRef.current?.reset();
          setCaptchaValue(null);
          setIsSubmitting(false);
          return;
        }
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

  return (
    <div className="min-h-screen bg-warm-gray-50">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <strong>Kostenlosen Fitness‑Check</strong> vereinbaren.
            </h1>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Wir lernen Ihre Ziele kennen und prüfen, wie Sie sich bewegen, damit wir einen
              individuellen Trainingsplan erstellen können.
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
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">

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
                        <Label htmlFor="city">Stadt *</Label>
                        <Input id="city" name="city" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+49…" required />
                    </div>
                  </div>

                  {/* Background & Goals */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="background">Kurz zu Ihnen (Hintergrund)</Label>
                      <Textarea
                        id="background"
                        name="background"
                        placeholder="Beruf, Aktivitätslevel, Trainingshistorie …"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="goals">Welche Ziele und Ergebnisse möchten Sie erreichen? *</Label>
                      <Textarea
                        id="goals"
                        name="goals"
                        placeholder="Bitte beschreiben Sie Ihre Ziele und gewünschten Ergebnisse."
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="routine">Aktivitätsroutine der letzten 3 Monate *</Label>
                      <Textarea
                        id="routine"
                        name="routine"
                        placeholder="z. B. 2×/Woche Spazieren, 1× Yoga …"
                        rows={3}
                        required
                      />
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
                      <Label htmlFor="refName">Falls empfohlen: Name der Person</Label>
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

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Wird gesendet..." : "Senden"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Image */}
              <Card className="overflow-hidden">
                <img
                  src={personalTrainingImage}
                  alt="Personal Training"
                  className="w-full h-48 object-cover"
                />
              </Card>

              {/* Pricing */}
              <Card className="card-elegant">
                <h3 className="text-lg font-semibold mb-4 text-primary">Preise für Personal Training</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Personal Training</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>1 Einheit</span>
                        <span className="font-semibold">
                          90 € <span className="text-xs font-normal text-muted-foreground">/ 60 Min.</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>12 Einheiten</span>
                        <span className="font-semibold">
                          80 € <span className="text-xs font-normal text-muted-foreground">/ 60 Min.</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>24 Einheiten</span>
                        <span className="font-semibold">
                          75 € <span className="text-xs font-normal text-muted-foreground">/ 60 Min.</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>48 Einheiten</span>
                        <span className="font-semibold">
                          70 € <span className="text-xs font-normal text-muted-foreground">/ 60 Min.</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>72 Einheiten</span>
                        <span className="font-semibold">
                          65 € <span className="text-xs font-normal text-muted-foreground">/ 60 Min.</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Duo Training (1 Trainer · 2 Personen)</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>1 Einheit</span>
                        <span className="font-semibold">
                          120 € <span className="text-xs font-normal text-muted-foreground">/ 60 Min. (60 € p. P.)</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>12 Einheiten</span>
                        <span className="font-semibold">
                          110 € <span className="text-xs font-normal text-muted-foreground">/ 60 Min. (55 € p. P.)</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>24 Einheiten</span>
                        <span className="font-semibold">
                          100 € <span className="text-xs font-normal text-muted-foreground">/ 60 Min. (50 € p. P.)</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>48 Einheiten</span>
                        <span className="font-semibold">
                          90 € <span className="text-xs font-normal text-muted-foreground">/ 60 Min. (45 € p. P.)</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>72 Einheiten</span>
                        <span className="font-semibold">
                          80 € <span className="text-xs font-normal text-muted-foreground">/ 60 Min. (40 € p. P.)</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Process */}
              <Card className="card-elegant">
                <h3 className="text-lg font-semibold mb-4 text-primary">Was kann ich erwarten?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 shrink-0 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold leading-none mt-0.5">
                      1
                    </div>
                    <span>Anfrageformular ausfüllen</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 shrink-0 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold leading-none mt-0.5">
                      2
                    </div>
                    <span>Ich kontaktiere Sie innerhalb von 24–48 Stunden</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 shrink-0 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold leading-none mt-0.5">
                      3
                    </div>
                    <span>Kostenloser Fitness-Check!</span>
                  </div>
                </div>
              </Card>

              {/* Guidelines */}
              <Card className="card-elegant">
                <h3 className="text-lg font-semibold mb-4 text-primary">Richtlinien</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Fitness-Check: ca. 45 Minuten</p>
                  <p>• Trainingseinheit: 60 Minuten</p>
                  <p>• Absagen bis 24 Stunden vor dem Termin sind kostenfrei. Bei kurzfristigen Absagen (≤ 24 Stunden) wird die volle Einheit als Ausfallhonorar fällig.</p>
                  <p>• Einsatzgebiet: Murnau am Staffelsee + 25km Umkreis</p>
                </div>
              </Card>

              <div className="mt-6 p-4 bg-warm-gray-100 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Hinweis: Die Leistungen im Rahmen des Personal Trainings sind
                  keine medizinische Behandlung und ersetzen keine Therapie.
                  Bei gesundheitlichen Beschwerden bitte vorab ärztlich abklären.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormPT;