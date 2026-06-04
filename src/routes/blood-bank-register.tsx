import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Droplet, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BackButton } from "@/components/site/BackButton";
import { SearchableSelect } from "@/components/site/SearchableSelect";
import { STATES, STATE_CITIES } from "@/lib/blood-data";

export const Route = createFileRoute("/blood-bank-register")({
  head: () => ({ meta: [{ title: "Blood Bank Registration — BloodConnect" }] }),
  component: BankRegister,
});

function BankRegister() {
  const navigate = useNavigate();
  const [state, setState] = useState("Maharashtra");
  const [city, setCity] = useState("Mumbai");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const cities = useMemo(() => STATE_CITIES[state] ?? [], [state]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const f = new FormData(e.currentTarget);
    const record = Object.fromEntries(f.entries());
    setTimeout(() => {
      try {
        const list = JSON.parse(localStorage.getItem("bc_blood_banks") || "[]");
        list.unshift({ ...record, state, city, type: "blood_bank", created_at: new Date().toISOString() });
        localStorage.setItem("bc_blood_banks", JSON.stringify(list));
      } catch {}
      setLoading(false); setDone(true);
      toast.success("Blood bank registered successfully!");
    }, 600);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
        <h1 className="mt-4 text-3xl font-bold">Blood Bank Registered</h1>
        <p className="mt-2 text-muted-foreground">Your blood bank is in our verification queue. Listings go live within 24 hours.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/dashboard"><Button className="bg-gradient-primary shadow-glow">Go to Dashboard</Button></Link>
          <Button variant="outline" onClick={() => navigate({ to: "/" })}>Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <BackButton />
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold">
          <Droplet className="h-3.5 w-3.5" /> Join our network
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold">Blood Bank Registration</h1>
        <p className="mt-2 text-muted-foreground">List your blood bank inventory in real time to patients across India.</p>
      </div>

      <Card className="mt-6 p-6 md:p-8 shadow-elegant">
        <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2"><Label>Blood Bank Name *</Label><Input name="name" required className="mt-1" /></div>
          <div><Label>License Number *</Label><Input name="license" required className="mt-1" /></div>
          <div><Label>Contact Person *</Label><Input name="contact_person" required className="mt-1" /></div>
          <div><Label>Email *</Label><Input name="email" type="email" required className="mt-1" /></div>
          <div><Label>Phone *</Label><Input name="phone" required className="mt-1" /></div>
          <div><Label>State *</Label><div className="mt-1"><SearchableSelect value={state} onChange={(s) => { setState(s); const f = STATE_CITIES[s]?.[0]; if (f) setCity(f); }} options={STATES} /></div></div>
          <div><Label>City *</Label><div className="mt-1"><SearchableSelect value={city} onChange={setCity} options={cities} /></div></div>
          <div><Label>Area / Locality *</Label><Input name="area" required className="mt-1" /></div>
          <div className="md:col-span-2"><Label>Address *</Label><Textarea name="address" required className="mt-1" /></div>
          <div><Label>Password *</Label><Input name="password" type="password" required minLength={6} className="mt-1" /></div>
          <div><Label>Storage Capacity (units)</Label><Input name="capacity" type="number" className="mt-1" /></div>
          <Button disabled={loading} type="submit" size="lg" className="md:col-span-2 bg-gradient-primary shadow-glow mt-2">
            {loading ? "Submitting..." : "Register Blood Bank"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
