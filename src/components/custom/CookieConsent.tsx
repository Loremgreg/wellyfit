
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Declare gtag function type
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === null) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setIsVisible(false);
    
    // Initialize Google Analytics after consent
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-LF05WPP5G2');
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "false");
    setIsVisible(false);
    
    // Disable Google Analytics tracking
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-LF05WPP5G2', {
        'anonymize_ip': true,
        'send_page_view': false
      });
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>Cookie-Einstellungen</CardTitle>
          <CardDescription>
            Wir verwenden Cookies, um Ihr Surferlebnis zu verbessern. Indem Sie
            auf „Akzeptieren“ klicken, stimmen Sie der Verwendung von Cookies
            zu.{" "}
            <Link to="/datenschutz" className="underline">
              Lesen Sie unsere Datenschutzbestimmungen.
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button onClick={handleAccept}>Akzeptieren</Button>
          <Button variant="outline" onClick={handleDecline}>
            Ablehnen
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;
