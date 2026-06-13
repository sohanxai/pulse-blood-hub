import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { UserPlus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function FloatingSignup() {
  const [visible, setVisible] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSignedIn(!!s));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  if (signedIn || dismissed || !visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 animate-fade-in">
      <div className="hidden sm:flex flex-col items-end gap-1 mb-2">
        <span className="text-xs font-medium text-muted-foreground bg-card/90 backdrop-blur px-3 py-1.5 rounded-full border shadow-card">
          Join 12,000+ lifesavers
        </span>
      </div>
      <Link
        to="/auth"
        search={{ mode: "signup" }}
        className="group relative flex items-center justify-center h-14 w-14 rounded-full bg-gradient-primary text-primary-foreground shadow-glow animate-pulse-ring hover:scale-110 transition-transform"
        aria-label="Sign up"
      >
        <UserPlus className="h-6 w-6" />
      </Link>
      <button
        onClick={() => setDismissed(true)}
        className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center text-xs transition-colors border shadow-card"
        aria-label="Dismiss"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
