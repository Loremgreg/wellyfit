
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

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
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "false");
    setIsVisible(false);
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
