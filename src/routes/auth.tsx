import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Droplet, Mail, Lock, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({ mode: (s.mode as string) === "signup" ? "signup" : "login" }),
  head: () => ({ meta: [{ title: "Login / Register — BloodConnect" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { mode } = Route.useSearch();
  const [tab, setTab] = useState<"login" | "signup">(mode);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true);
    const f = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(f.get("email")), password: String(f.get("password")),
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back!");
    navigate({ to: "/dashboard" });
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true);
    const f = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signUp({
      email: String(f.get("email")),
      password: String(f.get("password")),
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: String(f.get("full_name")), phone: String(f.get("phone")) },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created! You can now sign in.");
    setTab("login");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8 shadow-elegant">
        <Link to="/" className="flex items-center justify-center gap-2 font-display font-bold text-2xl mb-6">
          <span className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-primary text-primary-foreground"><Droplet className="h-5 w-5" fill="currentColor" /></span>
          Blood<span className="text-primary">Connect</span>
        </Link>
        <Tabs value={tab} onValueChange={(v) => setTab(v as "login" | "signup")}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <Field icon={<Mail className="h-4 w-4" />} label="Email" name="email" type="email" required />
              <Field icon={<Lock className="h-4 w-4" />} label="Password" name="password" type="password" required minLength={6} />
              <Button type="submit" disabled={loading} className="w-full bg-gradient-primary shadow-glow">
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 mt-4">
              <Field icon={<User className="h-4 w-4" />} label="Full name" name="full_name" required />
              <Field icon={<Phone className="h-4 w-4" />} label="Phone" name="phone" required />
              <Field icon={<Mail className="h-4 w-4" />} label="Email" name="email" type="email" required />
              <Field icon={<Lock className="h-4 w-4" />} label="Password" name="password" type="password" required minLength={6} />
              <Button type="submit" disabled={loading} className="w-full bg-gradient-primary shadow-glow">
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

function Field({ icon, label, ...props }: { icon: React.ReactNode; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative mt-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        <Input className="pl-9" {...props} />
      </div>
    </div>
  );
}
