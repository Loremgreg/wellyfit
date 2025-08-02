import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Award, MapPin, Heart } from "lucide-react";
import trainerPortrait from "@/assets/trainer-portrait.jpg";
const UberMich = () => {
  return <div className="min-h-screen">
    {/* Hero Section */}
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-primary">
              Über mich
            </h1>
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-8 text-muted-foreground">
              Personal Training & Wellness‑Massagen bei Ihnen zu Hause – in Murnau am Staffelsee & Umgebung
            </h2>
            <p className="text-lg mb-8 leading-relaxed">
              Bonjour! Ich bin Grégory – Personal Trainer mit Ausbildung in der Physiotherapie. Bewegung ist für mich Lebensqualität. Ich liebe es, Menschen jeden Alters dabei zu unterstützen, sich kräftiger und beweglicher zu fühlen.
            </p>
          </div>
          <div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={trainerPortrait} alt="Grégory - Personal Trainer und Physiotherapeut" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Services Overview */}
    <section className="section-padding pb-6 md:pb-8 bg-warm-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center text-primary">
            Was ich anbiete:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-elegant">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Heart className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Personal Training</h3>
              </div>
              <p className="text-muted-foreground">
                Individuelles Training bei Ihnen zu Hause, angepasst an Ihre Ziele und Ihr Fitnesslevel.
              </p>
            </Card>

            <Card className="card-elegant">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Heart className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Wellness‑Massagen</h3>
              </div>
              <p className="text-muted-foreground">Entspannende Massagen für Ihr Wohlbefinden und zur Entspannung.</p>
            </Card>
          </div>
        </div>
      </div>
    </section>

    {/* Qualifications Section */}
    <section className="section-padding pt-2 md:pt-4 bg-warm-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-center text-primary">
            Qualifikationen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-elegant">
              <div className="flex items-center gap-4 mb-4">
                <GraduationCap className="text-accent" size={24} />
                <h3 className="font-semibold">Master of Science in Physiotherapie</h3>
              </div>
              <p className="text-muted-foreground">Belgien</p>
            </Card>

            <Card className="card-elegant">
              <div className="flex items-center gap-4 mb-4">
                <GraduationCap className="text-accent" size={24} />
                <h3 className="font-semibold">Bachelor of Science in Physiotherapie</h3>
              </div>
              <p className="text-muted-foreground">Belgien</p>
            </Card>

            <Card className="card-elegant">
              <div className="flex items-center gap-4 mb-4">
                <Award className="text-accent" size={24} />
                <h3 className="font-semibold">Universitätszertifikat: Personal Training</h3>
              </div>
              <p className="text-muted-foreground">Belgien</p>
            </Card>

            <Card className="card-elegant">
              <div className="flex items-center gap-4 mb-4">
                <Award className="text-accent" size={24} />
                <h3 className="font-semibold">Universitätszertifikat: Manuelle Lymphdrainage</h3>
              </div>
              <p className="text-muted-foreground">Belgien</p>
            </Card>
          </div>
        </div>
      </div>
    </section>

    {/* Service Area */}
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-primary">
            Einsatzgebiet
          </h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <MapPin className="text-accent" size={32} />
            <p className="text-xl font-semibold">
              Murnau am Staffelsee & 25km Umkreis
            </p>
          </div>
          <p className="text-lg text-muted-foreground mb-12">
            Ich komme zu Ihnen nach Hause und bringe alle notwendigen Geräte und Materialien mit.
          </p>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">
            Bereit, Ihre Fitness-Reise zu beginnen?
          </h2>
          <p className="text-xl mb-12 text-primary-foreground/90">
            Kontaktieren Sie mich für Ihr individuelles Training oder Ihre entspannende Wellness-Massage.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild variant="accent" size="lg" className="text-lg px-10 py-6">
              <Link to="/anfrage-personal-training">MIT MIR TRAINIEREN</Link>
            </Button>
            <Button asChild variant="accent" size="lg" className="text-lg px-10 py-6">
              <Link to="/anfrage-massage">WELLNESS-MASSAGE BUCHEN</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>;
};
export default UberMich;