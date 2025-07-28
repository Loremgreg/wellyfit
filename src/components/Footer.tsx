import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">FitWell</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Personal Training & Wellness-Massagen – individuell, professionell
              und bei Ihnen zu Hause in Murnau am Staffelsee & Umgebung.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/personal-training"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Personal Training
                </Link>
              </li>
              <li>
                <Link
                  to="/wellness-massage"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Wellness-Massage
                </Link>
              </li>
              <li>
                <Link
                  to="/uber-mich"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Über mich
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/impressum"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  to="/datenschutz"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2025 FitWell. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;