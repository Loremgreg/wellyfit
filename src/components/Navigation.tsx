import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Personal Training", href: "/personal-training-murnau" },
    { name: "Wellness-Massage", href: "/massage-murnau" },
    { name: "Über mich", href: "/personal-trainer-murnau" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB8160]">
            {/* Combined logo button */}
            <div className="w-16 h-16 rounded-full bg-[#EB8160] flex items-center justify-center">
              <span className="text-2xl font-heading font-bold text-[#E4E2DD]">
                bast.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors ${isActive(item.href)
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild variant="accent" size="lg">
              <a href="/#los-gehts">Los geht's!</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-foreground hover:text-primary hover:bg-muted"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium transition-colors ${isActive(item.href)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild variant="accent" size="lg" className="w-full">
                <a href="/#los-gehts" onClick={() => setIsOpen(false)}>
                  Los geht's!
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;