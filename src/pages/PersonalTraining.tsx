import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Users, Target, Clock } from "lucide-react";
import personalTrainingImage from "@/assets/personal-training.jpg";

const PersonalTraining = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Das Beste aus dem Personal Training
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-primary-foreground/90 leading-relaxed">
              Erleben Sie neue Kraft, Mobilität und Wohlbefinden – mit maßgeschneidertem Coaching, das perfekt auf Ihr Niveau und Ihre Ziele abgestimmt ist.
            </p>
            <Button asChild variant="accent" size="lg" className="text-lg px-10 py-6">
              <Link to="/form-pt">MIT MIR TRAINIEREN</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Personalized Analysis Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-primary">
                Personalisierte Analyse
              </h2>
              <p className="text-lg mb-8 text-muted-foreground leading-relaxed">
                Ich beurteile Ihre Stärken und Schwächen, um einen individuellen Plan für Sie zu entwickeln. Mit meiner Ausbildung als Physiotherapeut erkenne ich Bewegungsmuster und erstelle ein Training, das Ihre spezifischen Bedürfnisse berücksichtigt.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Target className="text-accent" size={24} />
                  <span className="font-medium">Zielgerichtete Analyse</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-accent" size={24} />
                  <span className="font-medium">Individuelle Betreuung</span>
                </div>
              </div>
            </div>
            <div>
              <img 
                src={personalTrainingImage} 
                alt="Personal Training Session"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section className="section-padding bg-warm-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center text-primary">
              Für wen?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="card-elegant text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Users className="text-accent" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Anfänger</h3>
                <p className="text-muted-foreground">
                  Perfekt für Einsteiger, die sicher und strukturiert mit dem Training beginnen möchten.
                </p>
              </Card>
              
              <Card className="card-elegant text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Target className="text-accent" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Post-Verletzung</h3>
                <p className="text-muted-foreground">
                  Sichere Rückkehr zum Sport nach Verletzungen mit physiotherapeutischer Begleitung.
                </p>
              </Card>
              
              <Card className="card-elegant text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="text-accent" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Senioren</h3>
                <p className="text-muted-foreground">
                  Altersgerechtes Training für Mobilität, Kraft und Lebensqualität.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center text-primary">
              Wie läuft es ab?
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Füllen Sie das Online-Anfrageformular aus</h3>
                  <p className="text-muted-foreground">
                    Teilen Sie mir Ihre Ziele, Ihre aktuelle Fitness und eventuelle Beschwerden mit.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Telefontermin vereinbaren</h3>
                  <p className="text-muted-foreground">
                    Wir besprechen Ihre Wünsche und klären offene Fragen in einem kurzen Gespräch.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Kostenloser Fitness-Check</h3>
                  <p className="text-muted-foreground">
                    Ich analysiere Ihre Bewegungsmuster und erstelle Ihren individuellen Trainingsplan.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="accent" size="lg" className="text-lg px-10 py-6">
                <Link to="/form-pt">MIT MIR TRAINIEREN</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="section-padding bg-warm-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="card-elegant">
              <h3 className="text-xl font-semibold mb-4 text-primary">Wichtiger Hinweis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Die angebotenen Leistungen im Rahmen von Personal Training sind keine medizinische Behandlung und ersetzen keine Therapie oder Heilbehandlung. Das Coaching ersetzt nicht den Besuch bei einem Arzt, Heilpraktiker oder Physiotherapeuten. Bei bestehenden gesundheitlichen Beschwerden oder Vorerkrankungen wird dringend empfohlen, vor Trainingsbeginn eine medizinische Fachperson zu konsultieren.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalTraining;