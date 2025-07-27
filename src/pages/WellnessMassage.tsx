import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, Zap, Moon } from "lucide-react";
import wellnessMassageImage from "@/assets/wellness-massage.jpg";

const WellnessMassage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Wellness-Massage zu Hause – Murnau am Staffelsee & Umgebung.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 leading-relaxed">
              Gönnen Sie sich einen Moment völliger Auszeit mit einer Wellness‑Massage, die Muskelentspannung und mentale Entspannung harmonisch verbindet.
            </p>
            <p className="text-lg mb-12 text-primary-foreground/80 leading-relaxed">
              Als in Belgien ausgebildeter Physiotherapeut bringe ich ein fundiertes Wissen über die Anatomie und Funktionsweise des Körpers mit. Das ermöglicht es mir, Druck, Bewegungen und Rhythmus an Ihren Körperbau und Ihre Empfindlichkeit anzupassen und so eine maßgeschneiderte Massage anzubieten.
            </p>
            <Button asChild variant="accent" size="lg" className="text-lg px-10 py-6">
              <Link to="/form-massage">Wellness-Massage Buchen</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-primary">
                Für wen?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <Users className="text-accent mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">Im Alltag abschalten</h3>
                    <p className="text-muted-foreground">
                      Ob aktiv oder sitzend – Sie möchten die Spannungen lösen, die sich bei der Arbeit, vor dem Bildschirm oder durch Stress aufgebaut haben.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Zap className="text-accent mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">Sportler oder Sportbegeisterte</h3>
                    <p className="text-muted-foreground">
                      Um die Regeneration zu fördern und Verspannungen nach dem Training vorzubeugen.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Heart className="text-accent mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold mb-2">Jeder, der Harmonie sucht</h3>
                    <p className="text-muted-foreground">
                      Jede Person, die einen Moment der Ruhe und Entspannung sucht.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src={wellnessMassageImage}
                alt="Wellness Massage"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-warm-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center text-primary">
              Vorteile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="card-elegant text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="text-accent" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Lösen von Muskelverspannungen</h3>
                <p className="text-muted-foreground">
                  Die Massage hilft, durch Stress und Angst verkrampfte Muskeln zu lockern, insbesondere im Bereich von Rücken, Schultern und Nacken.
                </p>
              </Card>

              <Card className="card-elegant text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Moon className="text-accent" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Tiefe Entspannung und erholsamer Schlaf</h3>
                <p className="text-muted-foreground">
                  Die langsamen und rhythmischen Bewegungen führen zu einer Entspannung, die einen Zustand der Ruhe fördert, der einen erholsamen Schlaf begünstigt.
                </p>
              </Card>

              <Card className="card-elegant text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="text-accent" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Verbesserung der Stimmung</h3>
                <p className="text-muted-foreground">
                  Die Ausschüttung von Endorphinen vermittelt ein Gefühl des Wohlbefindens und trägt zu besserer Laune bei.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-primary">
              Bereit für Ihre Wellness-Auszeit?
            </h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Buchen Sie jetzt Ihre individuelle Wellness-Massage bei Ihnen zu Hause und erleben Sie tiefe Entspannung und Regeneration.
            </p>
            <Button asChild variant="accent" size="lg" className="text-lg px-10 py-6">
              <Link to="/form-massage">WELLNESS-MASSAGE BUCHEN</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WellnessMassage;