import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowRight, Heart, Shield, Activity, Clock, Search, UserPlus, CheckCircle, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getStats } from "@/lib/bloodconnect.functions";
import { BLOOD_GROUPS, COMPATIBILITY, type BloodGroup } from "@/lib/blood-data";
import { useState } from "react";
import { BloodGroupBadge } from "@/components/site/BloodGroupBadge";
import heroBg from "@/assets/hero-bg.jpg";

const statsQO = queryOptions({ queryKey: ["stats"], queryFn: () => getStats() });

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(statsQO),
  component: Home,
  errorComponent: ({ error }) => <div className="p-12 text-center text-muted-foreground">{error.message}</div>,
});

function Home() {
  const { data: stats } = useSuspenseQuery(statsQO);
  const [selected, setSelected] = useState<BloodGroup>("O+");
  const compat = COMPATIBILITY[selected];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="absolute inset-0 -z-10 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.68 0.23 25 / 0.25), transparent 50%), radial-gradient(circle at 80% 60%, oklch(0.55 0.18 252 / 0.2), transparent 50%)" }} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-card mb-6">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              {stats.activeRequests} active requests right now
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Saving Lives Through <span className="text-gradient-primary">Instant Blood Connections</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Find blood donors, blood banks, and emergency support within seconds. Verified donors, real-time availability, AI-powered matching.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/find-blood"><Button size="lg" className="bg-gradient-primary shadow-glow text-base h-12 px-6">
                <Search className="mr-2 h-5 w-5" /> Find Blood Now
              </Button></Link>
              <Link to="/donate"><Button size="lg" variant="outline" className="text-base h-12 px-6">
                <Heart className="mr-2 h-5 w-5" /> Become a Donor
              </Button></Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-success" /> Verified donors</div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-secondary" /> 24/7 support</div>
              <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> Real-time</div>
            </div>
          </div>
          <div className="relative animate-float">
            <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <Card className="relative p-6 shadow-elegant">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Live emergency</p>
                  <p className="font-semibold">O- needed urgently</p>
                </div>
                <span className="h-3 w-3 rounded-full bg-destructive animate-pulse-ring" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {BLOOD_GROUPS.map((g) => (
                  <div key={g} className="aspect-square grid place-items-center rounded-lg bg-muted/50 font-display font-bold">{g}</div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-3 text-center text-xs">
                <div><p className="font-display font-bold text-lg text-primary">{stats.donors.toLocaleString()}</p><p className="text-muted-foreground">Donors</p></div>
                <div><p className="font-display font-bold text-lg text-secondary">{stats.banks}</p><p className="text-muted-foreground">Banks</p></div>
                <div><p className="font-display font-bold text-lg text-success">{stats.livesSaved.toLocaleString()}</p><p className="text-muted-foreground">Lives Saved</p></div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {[
            { v: stats.donors.toLocaleString(), l: "Registered Donors" },
            { v: stats.banks, l: "Blood Banks" },
            { v: stats.hospitals, l: "Hospitals" },
            { v: stats.livesSaved.toLocaleString(), l: "Lives Saved" },
            { v: stats.activeRequests, l: "Active Requests" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display font-bold text-3xl md:text-4xl text-gradient-primary">{s.v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="mt-3 text-muted-foreground">Four simple steps to save a life.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { i: UserPlus, t: "Register", d: "Create your free account in under a minute." },
            { i: CheckCircle, t: "Verify Profile", d: "Confirm your blood group and contact details." },
            { i: Search, t: "Search or Donate", d: "Find blood near you or set your availability." },
            { i: Zap, t: "Connect Instantly", d: "Direct contact with donors or blood banks." },
          ].map((s, i) => (
            <Card key={s.t} className="p-6 hover:shadow-elegant transition relative overflow-hidden">
              <span className="absolute top-3 right-4 font-display font-bold text-5xl text-muted/40">0{i + 1}</span>
              <s.i className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold text-lg">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Compatibility */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Blood Compatibility</h2>
            <p className="mt-3 text-muted-foreground">Select your blood group to see who you can help and who can help you.</p>
            <div className="mt-6 grid grid-cols-4 gap-3 max-w-md">
              {BLOOD_GROUPS.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelected(g)}
                  className={`aspect-square rounded-xl font-display font-bold text-lg transition ${selected === g ? "bg-gradient-primary text-primary-foreground shadow-glow" : "bg-card border hover:border-primary"}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <Card className="p-6">
              <p className="text-sm text-muted-foreground">You can donate to</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {compat.canDonateTo.map((g) => <BloodGroupBadge key={g} group={g} className="h-10 w-10 text-sm" />)}
              </div>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground">You can receive from</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {compat.canReceiveFrom.map((g) => <BloodGroupBadge key={g} group={g} className="h-10 w-10 text-sm" />)}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Success Stories</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { n: "Priya M.", r: "Patient", t: "BloodConnect found 3 O- donors within 8 minutes during my mother's surgery. Life-saving." },
            { n: "Dr. Rajesh K.", r: "Hospital", t: "We've reduced our emergency blood-sourcing time by 70% since partnering with BloodConnect." },
            { n: "Arjun S.", r: "Donor", t: "I've donated 6 times through the platform. The reminders and reliability score keep me motivated." },
          ].map((tm) => (
            <Card key={tm.n} className="p-6">
              <div className="flex gap-0.5 text-warning">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" fill="currentColor" />)}</div>
              <p className="mt-3 text-sm">"{tm.t}"</p>
              <p className="mt-4 text-sm font-semibold">{tm.n}</p>
              <p className="text-xs text-muted-foreground">{tm.r}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Who can donate blood?", a: "Healthy adults aged 18-65, weighing at least 50kg, with no recent illness or medication. Use our eligibility checker for details." },
              { q: "How often can I donate?", a: "Whole-blood donors can give every 90 days. Platelet donors every 14 days." },
              { q: "Is BloodConnect free to use?", a: "Yes — BloodConnect is completely free for donors, patients, hospitals, and blood banks." },
              { q: "How are donors verified?", a: "We verify phone, email, and ID. Reliability scores update based on response rate and donations." },
              { q: "What happens after I submit an emergency request?", a: "Nearby donors and partnered blood banks are notified instantly. You can track responses in your dashboard." },
            ].map((f, i) => (
              <AccordionItem key={i} value={`f${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-gradient-hero text-primary-foreground p-12 text-center shadow-elegant overflow-hidden relative">
          <h2 className="text-3xl md:text-4xl font-bold">Every drop counts. Every minute matters.</h2>
          <p className="mt-3 opacity-90 max-w-xl mx-auto">Join thousands of donors saving lives every day across India.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/donate"><Button size="lg" variant="secondary" className="h-12 px-6">Register as Donor <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            <Link to="/emergency"><Button size="lg" variant="outline" className="h-12 px-6 bg-transparent border-white text-white hover:bg-white hover:text-primary">Emergency Request</Button></Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
