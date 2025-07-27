import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Clock, Phone } from "lucide-react";
import personalTrainingImage from "@/assets/personal-training.jpg";

const FormPT = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Anfrage erfolgreich gesendet!",
      description: "Ich melde mich innerhalb von 1-2 Werktagen bei Ihnen.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-warm-gray-50">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Kostenloser Fitness‑Check – Anfrageformular
            </h1>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Melden Sie sich an, um Ihren <strong>kostenlosen Fitness‑Check</strong> zu buchen. 
              Wir lernen Ihre Ziele kennen und prüfen, wie Sie sich bewegen, damit wir einen 
              individuellen Trainingsplan erstellen können.
            </p>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 inline-block">
              <p className="text-primary-foreground/90">
                <strong>Nach dem Absenden</strong> melde ich mich in der Regel{" "}
                <strong>innerhalb von 1–2 Werktagen</strong> für ein kurzes Telefonat (10–15 Min.), 
                um Sie dem passenden Trainingsslot zuzuordnen.
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-accent" size={16} />
                      <span>Personal Training bei Ihnen zu Hause</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-accent" size={16} />
                      <span>Sicher, individuell, zielorientiert</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-accent" size={16} />
                      <span>Klarer Ablauf vom Check bis zum Training</span>
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
                      <div>
                        <Label htmlFor="region">Bundesland/Region</Label>
                        <Input id="region" placeholder="z. B. Bayern" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefon</Label>
                      <Input id="phone" type="tel" placeholder="+49…" />
                    </div>
                  </div>

                  {/* Background & Goals */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="background">Kurz zu Ihnen (Hintergrund)</Label>
                      <Textarea 
                        id="background" 
                        placeholder="Beruf, Aktivitätslevel, Trainingshistorie …"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="goals">Welche Ziele und Ergebnisse möchten Sie erreichen? *</Label>
                      <Textarea 
                        id="goals" 
                        placeholder="Bitte beschreiben Sie Ihre Ziele und gewünschten Ergebnisse."
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="routine">Aktivitätsroutine der letzten 3 Monate *</Label>
                      <Textarea 
                        id="routine" 
                        placeholder="z. B. 2×/Woche Spazieren, 1× Yoga …"
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="pain">Haben Sie derzeit Schmerzen oder Verletzungen? *</Label>
                      <Textarea 
                        id="pain" 
                        placeholder="Ja/Nein. Falls ja: bitte Details (Ort, Art, seit wann, Einschränkungen)."
                        rows={3}
                        required
                      />
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
                      <Label htmlFor="refName">Falls empfohlen: Name der Person</Label>
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

                <div className="mt-6 p-4 bg-warm-gray-100 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Hinweis:</strong> Die Leistungen im Rahmen des Personal Trainings sind{" "}
                    <strong>keine medizinische Behandlung</strong> und ersetzen keine Therapie. 
                    Bei gesundheitlichen Beschwerden bitte vorab ärztlich abklären.
                  </p>
                </div>
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
                        <span>1 Einheit (60 Min.)</span>
                        <span className="font-semibold">90 €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>12 Einheiten</span>
                        <span className="font-semibold">80 € / Einheit</span>
                      </div>
                      <div className="flex justify-between">
                        <span>24 Einheiten</span>
                        <span className="font-semibold">75 € / Einheit</span>
                      </div>
                      <div className="flex justify-between">
                        <span>48 Einheiten</span>
                        <span className="font-semibold">70 € / Einheit</span>
                      </div>
                      <div className="flex justify-between">
                        <span>72 Einheiten</span>
                        <span className="font-semibold">65 € / Einheit</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Duo-Personal-Training (1 Trainer · 2 Personen)</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>1 Einheit (60 Min.)</span>
                        <span className="font-semibold">120 € (60 € p. P.)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>12 Einheiten</span>
                        <span className="font-semibold">110 € (55 € p. P.)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>24 Einheiten</span>
                        <span className="font-semibold">100 € (50 € p. P.)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>48 Einheiten</span>
                        <span className="font-semibold">90 € (45 € p. P.)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>72 Einheiten</span>
                        <span className="font-semibold">80 € (40 € p. P.)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Process */}
              <Card className="card-elegant">
                <h3 className="text-lg font-semibold mb-4 text-primary">Was kann ich erwarten?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      1
                    </div>
                    <span>Anfrageformular ausfüllen</span>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      2
                    </div>
                    <span>Telefonat innerhalb von 48 Stunden</span>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
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
                  <p>• Stornierung bis 24h kostenfrei</p>
                  <p>• Einsatzgebiet: Murnau + 25km Umkreis</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormPT;