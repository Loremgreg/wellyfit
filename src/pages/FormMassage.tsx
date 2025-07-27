import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Heart, Clock, MapPin } from "lucide-react";
import wellnessMassageImage from "@/assets/wellness-massage.jpg";
const FormMassage = () => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Anfrage erfolgreich gesendet!",
      description: "Ich melde mich innerhalb von 1-2 Werktagen bei Ihnen."
    });
    setIsSubmitting(false);
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
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nachname *</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">E-Mail *</Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Stadt</Label>
                      <Input id="city" placeholder="z. B. Murnau" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" type="tel" placeholder="+49…" />
                  </div>
                </div>

                {/* Preferences */}
                <div className="space-y-4">




                  <div>
                    <Label htmlFor="pain">Haben Sie derzeit Beschwerden oder Verletzungen?</Label>
                    <Textarea id="pain" placeholder="Ja/Nein. Falls ja: bitte Details (Ort, Art, seit wann, Einschränkungen)." rows={3} />
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Ihre Verfügbarkeiten</h3>
                  <p className="text-sm text-muted-foreground">Geben Sie Ihre verfügbaren Tage/Uhrzeiten bitte manuell ein.</p>
                  <div className="p-4 border border-border rounded-lg">
                    <Label htmlFor="availabilityNotes">Verfügbarkeiten (Freitext)</Label>
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
                    <Select required>
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
                    <Input id="refName" />
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
              <img src={wellnessMassageImage} alt="Wellness Massage" className="w-full h-48 object-cover" />
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
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span>Einzelsitzung</span>
                          <span className="font-semibold">90 €</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span>12er‑Karte</span>
                          <span className="font-semibold">960 € (80 € pro Einheit)</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span>24er‑Karte</span>
                          <span className="font-semibold">1.800 € (75 € pro Einheit)</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span>48er‑Karte</span>
                          <span className="font-semibold">3.360 € (70 € pro Einheit)</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-2">45 Minuten:</div>
                      <div className="ml-4 space-y-1 text-sm">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span>Einzelsitzung</span>
                          <span className="font-semibold">67,5 €</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span>12er‑Karte</span>
                          <span className="font-semibold">774 € (64,5 € pro Einheit)</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span>24er‑Karte</span>
                          <span className="font-semibold">1.476 € (61,5 € pro Einheit)</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span>48er‑Karte</span>
                          <span className="font-semibold">2.808 € (58,5 € pro Einheit)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Rücken Massage:</h4>
                  <div>
                    <div className="font-medium text-sm mb-2">45 Minuten:</div>
                    <div className="ml-4 space-y-1 text-sm">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                        <span>Einzelsitzung</span>
                        <span className="font-semibold">67,5 €</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                        <span>12er‑Karte</span>
                        <span className="font-semibold">774 € (64,5 € pro Einheit)</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                        <span>24er‑Karte</span>
                        <span className="font-semibold">1.476 € (61,5 € pro Einheit)</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                        <span>48er‑Karte</span>
                        <span className="font-semibold">2.808 € (58,5 € pro Einheit)</span>
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