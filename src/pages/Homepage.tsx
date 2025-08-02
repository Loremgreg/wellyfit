import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Target, Heart } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import personalTrainingImage from "@/assets/personal-training.jpg";
import wellnessMassageImage from "@/assets/wellness-massage.jpg";
import trainerPortrait from "@/assets/trainer-portrait.jpg";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative container-custom section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-3 leading-tight">
              Personal Training & Wellness-Massage in Murnau am Staffelsee
            </h1>
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-8 leading-snug">
              Ihr Weg zu mehr Kraft und Wohlbefinden
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Personal Training & Wellness-Massage – individuell, professionell und bei Ihnen zu Hause.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="accent" size="lg" className="text-lg px-10 py-6">
                <Link to="/personal-training-murnau">Personal Training</Link>
              </Button>
              <Button asChild variant="accent" size="lg" className="text-lg px-10 py-6">
                <Link to="/massage-murnau">Wellness-Massage</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="los-gehts" className="section-padding bg-warm-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary">
              Unsere Angebote für Personal Training und Wellness-Massage in Murnau am Staffelsee
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professionelle Betreuung für Ihre Gesundheit und Ihr Wohlbefinden
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Personal Training */}
            <Card className="card-elegant overflow-hidden">
              <div className="h-64 bg-cover bg-center mb-6 rounded-lg"
                style={{ backgroundImage: `url(${personalTrainingImage})` }}>
              </div>
              <h3 className="text-3xl font-heading font-bold mb-4 text-primary">
                Personal Training – maßgeschneidertes Training zu Hause
              </h3>
              <p className="text-lg mb-6 text-muted-foreground">
                Individuell abgestimmtes Training, das Ihre Ziele in greifbare Nähe rückt.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} />
                  <span>Steigern Sie Kraft und Beweglichkeit – bleiben Sie aktiv und unabhängig</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} />
                  <span>Lernen Sie Übungen korrekt auszuführen – sicher und mit Freude</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} />
                  <span>Starten Sie sicher wieder mit Ihrem Lieblingssport – individuell betreut, Ihrem Niveau angepasst</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} />
                  <span>Individuelles Training für Fitness, Gesundheit und Lebensqualität</span>
                </li>
              </ul>
              <Button asChild variant="accent" size="lg" className="w-full">
                <Link to="/anfrage-personal-training">MIT MIR TRAINIEREN</Link>
              </Button>
            </Card>

            {/* Wellness Massage */}
            <Card className="card-elegant overflow-hidden">
              <div className="h-64 bg-cover bg-center mb-6 rounded-lg"
                style={{ backgroundImage: `url(${wellnessMassageImage})` }}>
              </div>
              <h3 className="text-3xl font-heading font-bold mb-4 text-primary">
                Wellness-Massage zu Hause – Entspannung für Körper und Geist
              </h3>
              <p className="text-lg mb-6 text-muted-foreground">
                Wellness und Entspannung, maßgeschneidert für Ihren Körper und Geist.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Heart className="text-accent mt-1 flex-shrink-0" size={20} />
                  <span>Löst Muskelverspannungen</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="text-accent mt-1 flex-shrink-0" size={20} />
                  <span>Verbessert Schlafqualität und Stimmung</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="text-accent mt-1 flex-shrink-0" size={20} />
                  <span>Zu Hause genießen</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="text-accent mt-1 flex-shrink-0" size={20} />
                  <span>Fördert körperliche und mentale Regeneration</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="text-accent mt-1 flex-shrink-0" size={20} />
                  <span>Professionelle Betreuung durch ausgebildeten Physiotherapeuten</span>
                </li>
              </ul>
              <Button asChild variant="accent" size="lg" className="w-full">
                <Link to="/anfrage-massage">WELLNESS-MASSAGE BUCHEN</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary">
                Ihr Experte für Gesundheit und Wohlbefinden
              </h2>
              <p className="text-lg mb-8 text-muted-foreground leading-relaxed">
                Als in Belgien ausgebildeter Physiotherapeut und Personal Trainer begleite ich Sie professionell und individuell auf Ihrem Weg zu einem gesunden und aktiven Leben. Profitieren Sie von meinem ganzheitlichen Ansatz, der Ihr Wohlbefinden in den Mittelpunkt stellt.
              </p>
              <Button asChild variant="accent" size="lg" className="w-full">
                <Link to="/personal-trainer-murnau">MEHR ERFAHREN</Link>
              </Button>
            </div>
            <div className="order-first lg:order-last">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={trainerPortrait}
                  alt="Grégory - Personal Trainer und Physiotherapeut"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;