import React, { useMemo, useState, useEffect } from "react";
import { Phone, MapPin, Star, CheckCircle2, Droplets, Building2, ShieldCheck, Sparkles, Menu, X, ArrowRight, Clock3, Waves, MessageSquare, Camera, Mail, ChevronRight, Home as HomeIcon, Briefcase, Shield, CalendarDays } from "lucide-react";

const phoneDisplay = "(949) 704-6019";
const phoneHref = "tel:+19497046019";
const logoSrc = "/images/logo.svg";

const services = [
  {
    slug: "window-cleaning",
    title: "Window Cleaning",
    icon: Sparkles,
    headline: "Interior + exterior window cleaning done right.",
    text: "Residential and commercial window cleaning with detailed attention to glass, frames, screens, and tracks.",
    bullets: ["Interior + exterior glass", "Screens and track detailing", "Residential + commercial service"],
  },
  {
    slug: "pressure-washing",
    title: "Pressure Washing",
    icon: Waves,
    headline: "Restore curb appeal with professional pressure washing.",
    text: "Driveways, patios, walkways, storefronts, and exterior surfaces cleaned for a brighter, cleaner finish.",
    bullets: ["Concrete + patios", "Walkways + entry areas", "Commercial storefront cleaning"],
  },
  {
    slug: "gutter-cleaning",
    title: "Gutter Cleaning",
    icon: Droplets,
    headline: "Protect your property with clear, flowing gutters.",
    text: "Safe, thorough gutter and downspout cleaning that helps prevent overflow, staining, and water damage.",
    bullets: ["Debris removal", "Downspout clearing", "Routine maintenance options"],
  },
  {
    slug: "commercial",
    title: "Commercial Service",
    icon: Building2,
    headline: "Recurring service for customer-facing properties.",
    text: "Dependable maintenance for storefronts, offices, dealerships, theaters, and multi-unit properties.",
    bullets: ["Recurring service routes", "Professional scheduling", "Consistent presentation"],
  },
];

const cityPages = [
  {
    slug: "huntington-beach",
    name: "Huntington Beach",
    headline: "Window Cleaning in Huntington Beach",
    text: "Professional window cleaning, pressure washing, and gutter cleaning for homes and businesses throughout Huntington Beach.",
  },
  {
    slug: "newport-beach",
    name: "Newport Beach",
    headline: "Window Cleaning in Newport Beach",
    text: "Premium cleaning service for coastal homes, storefronts, and commercial properties across Newport Beach.",
  },
  {
    slug: "costa-mesa",
    name: "Costa Mesa",
    headline: "Window Cleaning in Costa Mesa",
    text: "Fast quotes, easy booking, and polished exterior cleaning service across Costa Mesa.",
  },
  {
    slug: "orange-county",
    name: "Orange County",
    headline: "Window Cleaning Across Orange County",
    text: "Serving Orange County with residential and commercial window cleaning, pressure washing, and gutter service.",
  },
];

const gallery = [
  {
    title: "Multi-Story Window Cleaning",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Detailed Exterior Surface Cleaning",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Professional Pressure Washing",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Clean Exterior Presentation",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Patio and Concrete Cleaning",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Residential Service Detail",
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=1400&auto=format&fit=crop",
  },
];

const reviews = [
  {
    name: "Orange County Homeowner",
    text: "Fast response, great communication, and spotless glass. The whole house looked brighter the second they finished.",
  },
  {
    name: "Commercial Client",
    text: "Reliable scheduling and professional work. Exactly the kind of company you want representing your property.",
  },
  {
    name: "Recurring Customer",
    text: "Easy to book, on time, and very detail-oriented. We booked recurring service after the first visit.",
  },
];

const faqs = [
  {
    q: "What areas do you serve?",
    a: "We serve Huntington Beach, Orange County, and nearby service areas for residential and commercial work.",
  },
  {
    q: "Do you offer same-day estimates?",
    a: "Yes. We aim to respond quickly and can often provide same-day estimates depending on schedule and job details.",
  },
  {
    q: "What services do you offer?",
    a: "We provide window cleaning, pressure washing, gutter cleaning, and recurring commercial service.",
  },
  {
    q: "Do you offer online booking?",
    a: "Yes. You can call, request a quote, or use the online booking button on the site.",
  },
];

function Button({ children, className = "", variant = "default", ...props }) {
  const base = "inline-flex items-center justify-center font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-sky-600 text-white hover:bg-sky-700",
    outline: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
  };
  return (
    <button className={`${base} ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Card({ children, className = "", ...props }) {
  return <div className={className} {...props}>{children}</div>;
}

function CardContent({ children, className = "", ...props }) {
  return <div className={className} {...props}>{children}</div>;
}

function Input({ className = "", ...props }) {
  return <input className={`w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-sky-500 ${className}`} {...props} />;
}

function Textarea({ className = "", ...props }) {
  return <textarea className={`w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-sky-500 ${className}`} {...props} />;
}

function Badge({ children, className = "", ...props }) {
  return <span className={`inline-flex items-center ${className}`} {...props}>{children}</span>;
}

function Section({ id, children, className = "" }) {
  return <section id={id} className={`w-full ${className}`}>{children}</section>;
}

function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

function BrandLogo({ className = "h-12 w-auto" }) {
  return <img src={logoSrc} alt="Darling Window Cleaning logo" className={className} />;
}

function openBookingModal() {
  if (typeof window !== "undefined" && window.HCPWidget) {
    window.HCPWidget.openModal();
  } else {
    alert("Booking system is still loading, try again in a second.");
  }
}

function BookingButton({ className = "", variant = "default", fullWidth = false, rounded = "rounded-2xl" }) {
  const base = fullWidth ? "w-full sm:w-auto" : "";
  const defaultClasses = `hcp-button ${rounded} bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-sky-200 hover:from-sky-600 hover:to-blue-700 ${base} ${className}`;
  const outlineClasses = `hcp-button ${rounded} border border-sky-200 bg-white/80 px-6 py-3 text-sm font-medium text-sky-700 hover:bg-sky-50 ${base} ${className}`;

  return (
    <button
      data-token="0bca2720f9f2441dbc46031f86377e12"
      data-orgname="Darling-Window-Cleaning"
      className={variant === "outline" ? outlineClasses : defaultClasses}
      onClick={openBookingModal}
    >
      Book Online
    </button>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

function Header({ currentPage, setCurrentPage }) {
  useEffect(() => {
    const existing = document.querySelector('script[src*="online-booking.housecallpro.com/script.js"]');
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://online-booking.housecallpro.com/script.js?token=0bca2720f9f2441dbc46031f86377e12&orgName=Darling-Window-Cleaning";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const [open, setOpen] = useState(false);
  const nav = [
    ["Home", "home"],
    ["Landing", "landing"],
    ["Services", "services"],
    ["Service Areas", "cityList"],
    ["Gallery", "gallery"],
    ["Commercial", "commercial"],
    ["Contact", "contact"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-sky-100/80 bg-white/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <button onClick={() => setCurrentPage("home")} className="flex min-w-0 items-center gap-3 text-left">
          <BrandLogo className="h-10 w-auto sm:h-12" />
          <div className="hidden sm:block">
            <div className="text-sm text-neutral-500">Huntington Beach, CA</div>
            <div className="text-lg font-semibold tracking-tight">Darling Window Cleaning</div>
          </div>
        </button>

        <nav className="hidden items-center gap-5 xl:flex">
          {nav.map(([label, page]) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`text-sm transition ${currentPage === page ? "font-semibold text-sky-700" : "text-neutral-600 hover:text-sky-700"}`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button className="rounded-2xl px-4 py-2" onClick={() => setCurrentPage("contact")}>Get a Quote</Button>
          <BookingButton variant="outline" />
        </div>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-black/10 bg-white md:hidden">
          <Container className="flex flex-col gap-3 py-4">
            {nav.map(([label, page]) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  setOpen(false);
                }}
                className="rounded-xl px-3 py-2 text-left text-sm hover:bg-neutral-100"
              >
                {label}
              </button>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <Button className="rounded-2xl px-4 py-2" onClick={() => { setCurrentPage("contact"); setOpen(false); }}>Get a Quote</Button>
              <BookingButton variant="outline" fullWidth />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

function Footer({ setCurrentPage }) {
  return (
    <footer className="border-t border-sky-100 bg-gradient-to-b from-white to-sky-50/70">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandLogo className="h-14 w-auto" />
          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
            Professional window cleaning, pressure washing, and gutter cleaning for homes and businesses across Huntington Beach and surrounding Orange County areas.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className="rounded-full bg-slate-100 px-4 py-2">Fast Quotes</Badge>
            <Badge className="rounded-full bg-slate-100 px-4 py-2">Online Booking</Badge>
            <Badge className="rounded-full bg-slate-100 px-4 py-2">Residential + Commercial</Badge>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold">Pages</div>
          <div className="mt-3 flex flex-col gap-2 text-sm text-neutral-600">
            <button onClick={() => setCurrentPage("home")} className="text-left hover:text-black">Home</button>
            <button onClick={() => setCurrentPage("landing")} className="text-left hover:text-black">Landing Page</button>
            <button onClick={() => setCurrentPage("services")} className="text-left hover:text-black">Services</button>
            <button onClick={() => setCurrentPage("cityList")} className="text-left hover:text-black">Service Areas</button>
            <button onClick={() => setCurrentPage("gallery")} className="text-left hover:text-black">Gallery</button>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold">Contact</div>
          <div className="mt-3 space-y-2 text-sm text-neutral-600">
            <div>{phoneDisplay}</div>
            <div>Huntington Beach, CA</div>
            <div>Serving Orange County</div>
            <div>Online booking available</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function Hero({ setCurrentPage }) {
  return (
    <Section className="relative py-16 lg:py-24">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
          alt="Modern building"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Container className="relative z-10 grid items-center gap-10 lg:grid-cols-1 text-white">
        <div className="max-w-2xl">
          <Badge className="rounded-full border-0 bg-white/90 px-4 py-1 text-xs text-slate-900 shadow-sm">Licensed • Insured • Professional</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-white">
            Window cleaning for homes and businesses in Orange County.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
            We clean your windows inside and out, keep things simple, and make it easy to book.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button className="rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-6 text-base text-white shadow-lg shadow-sky-200 hover:from-sky-600 hover:to-blue-700" onClick={() => setCurrentPage("contact")}>Get a Fast Quote <ArrowRight className="ml-2 h-4 w-4" /></Button>
            <BookingButton variant="outline" className="px-6 py-3 text-base bg-white/90 text-sky-700" />
            <a href={phoneHref}><Button variant="outline" className="rounded-2xl border-white/30 bg-white/10 px-6 py-6 text-base text-white backdrop-blur hover:bg-white/20">Call {phoneDisplay}</Button></a>
          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/80">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Interior + exterior service</div>
            <div className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> Fast estimates</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Licensed and insured</div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function LeadStrip() {
  const items = [
    ["Fast Quotes", "Get a quick price for your home or business.", "from-sky-50 to-white", "text-sky-600"],
    ["Online Booking", "Schedule your service instantly online.", "from-cyan-50 to-white", "text-cyan-600"],
    ["Recurring Service", "Great for storefronts and regular maintenance.", "from-amber-50 to-white", "text-amber-500"],
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map(([title, text, bg, iconColor]) => (
        <Card key={title} className={`rounded-[2rem] border-white/70 bg-gradient-to-br ${bg} shadow-sm`}>
          <CardContent className="p-5">
            <div className={`text-sm font-semibold ${iconColor}`}>{title}</div>
            <p className="mt-1 text-sm text-neutral-600">{text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function StatsRow() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {[
        ["Fast Service", "We respond quickly and get you scheduled fast."],
        ["Clean Results", "Windows, screens, and surfaces cleaned the right way."],
        ["Easy Booking", "Call, text, or book online in minutes."],
        ["Recurring Service", "Keep your property clean with scheduled service."],
      ].map(([title, text]) => (
        <Card key={title} className="rounded-[2rem] border-white/80 bg-white shadow-sm shadow-sky-100">
          <CardContent className="p-6">
            <div className="text-lg font-semibold tracking-tight">{title}</div>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function QuoteCalculator() {
  const [sqft, setSqft] = useState(2000);
  const estimate = Math.round((Number(sqft || 0) / 100) * 12);

  return (
    <Card className="rounded-[2rem] border-white/80 bg-white shadow-sm shadow-sky-100">
      <CardContent className="p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Quick estimate</div>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">Estimate based on square footage</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">Use this as a fast residential ballpark. Final pricing can vary by window count, access, and layout.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <label className="mb-2 block text-sm font-medium">Home square footage</label>
            <Input type="number" value={sqft} onChange={(e) => setSqft(e.target.value)} placeholder="2000" />
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 px-6 py-4 text-center">
            <div className="text-sm text-neutral-500">Estimated price</div>
            <div className="text-3xl font-semibold tracking-tight">${estimate}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TestimonialsSection() {
  return (
    <Section className="bg-gradient-to-br from-slate-50 via-white to-sky-50 py-16">
      <Container className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Why customers choose us</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Clean windows. Fast service. Easy booking.</h2>
          <div className="mt-6 space-y-4 text-neutral-600 leading-7">
            <p>From coastal homes to storefront glass, Darling Window Cleaning is built around prompt communication, professional appearance, and detail-focused work.</p>
            <p>We make it easy to request a quote, book online, and keep your property looking sharp with one-time or recurring service.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Badge className="rounded-full border-0 bg-sky-100 px-4 py-2 text-sky-700">Same-day estimates</Badge>
            <Badge className="rounded-full border-0 bg-cyan-100 px-4 py-2 text-cyan-700">Friendly communication</Badge>
            <Badge className="rounded-full border-0 bg-amber-100 px-4 py-2 text-amber-700">Recurring service available</Badge>
          </div>
        </div>
        <Card className="overflow-hidden rounded-[2rem] border-0 bg-white shadow-xl shadow-sky-100">
          <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 px-8 py-8 text-white">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-white/75">Customer satisfaction</div>
                <div className="mt-2 text-4xl font-semibold tracking-tight">5-star service</div>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/80">Trusted by homeowners and businesses who want clean results and a smooth experience from start to finish.</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/15 px-5 py-4 backdrop-blur">
                <Stars />
                <div className="mt-2 text-2xl font-semibold">5.0</div>
                <div className="text-sm text-white/80">Customer experience focus</div>
              </div>
            </div>
          </div>
          <CardContent className="p-6 sm:p-8">
            <div className="grid gap-4">
              {reviews.map((review, index) => (
                <div
                  key={review.name}
                  className={`rounded-[1.5rem] border p-5 shadow-sm ${index === 0 ? "border-sky-200 bg-sky-50/70" : index === 1 ? "border-cyan-200 bg-cyan-50/70" : "border-amber-200 bg-amber-50/70"}`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-base font-semibold text-slate-900">{review.name}</div>
                      <div className="mt-1 text-sm text-neutral-500">Verified customer feedback</div>
                    </div>
                    <div className="shrink-0 rounded-full bg-white/80 px-3 py-1 shadow-sm">
                      <Stars />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-neutral-700">“{review.text}”</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}

function CTASection({ setCurrentPage }) {
  return (
    <Section className="py-16">
      <Container>
        <Card className="overflow-hidden rounded-[2rem] border-0 bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500 text-white shadow-xl shadow-sky-200">
          <CardContent className="grid gap-8 p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-white/60">Ready to book?</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Get a fast quote or book online in minutes.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
                Whether you need residential window cleaning, pressure washing, gutter cleaning, or recurring commercial service, we make the process easy.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
              <Button className="rounded-2xl bg-white px-4 py-3 text-sky-700 hover:bg-sky-50" onClick={() => setCurrentPage("contact")}>Request a Quote</Button>
              <button onClick={openBookingModal} className="rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/20">Book Online</button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}

function FAQSection() {
  return (
    <Section className="bg-gradient-to-br from-slate-50 via-white to-sky-50 py-16">
      <Container>
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Frequently asked questions</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need before booking.</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.q} className="rounded-[2rem] border border-black/10 bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold tracking-tight">{faq.q}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function HomePage({ setCurrentPage, setService, setCity }) {
  return (
    <main>
      <Hero setCurrentPage={setCurrentPage} />
      <Section className="py-16">
        <Container>
          <LeadStrip />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="rounded-[2rem] border-white/80 bg-white shadow-sm shadow-sky-100 transition hover:-translate-y-0.5">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 text-sky-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-neutral-600">{service.text}</p>
                    <button onClick={() => { setService(service); setCurrentPage("service"); }} className="mt-4 inline-flex items-center text-sm font-medium hover:underline">
                      Learn more <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>
      <Section className="py-4">
        <Container><StatsRow /></Container>
      </Section>
      <TestimonialsSection />
      <Section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Service Areas</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Window cleaning services across Orange County you can rely on.</h2>
            <p className="mt-4 max-w-2xl text-neutral-600 leading-7">Serving local homeowners and businesses with fast quotes, easy booking, and dependable results.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cityPages.map((city) => (
                <Card key={city.slug} className="cursor-pointer rounded-[2rem] border border-black/10 bg-white shadow-sm" onClick={() => { setCity(city); setCurrentPage("city"); }}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-sm text-neutral-500"><MapPin className="h-4 w-4" /> {city.name}</div>
                    <div className="mt-2 text-lg font-semibold tracking-tight">{city.headline}</div>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">{city.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <QuoteCalculator />
        </Container>
      </Section>
      <CTASection setCurrentPage={setCurrentPage} />
      <FAQSection />
    </main>
  );
}

function LandingPage({ setCurrentPage }) {
  return (
    <main className="py-10 lg:py-16">
      <Container className="grid gap-10 lg:grid-cols-2">
        <div>
          <Badge className="rounded-full bg-slate-100 px-4 py-1 text-xs">Fast Quotes • Easy Booking</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Same Day Window Cleaning in Orange County</h1>
          <p className="mt-4 text-lg leading-7 text-neutral-600">Get a fast quote, book online, or call now. Interior + exterior cleaning, screens included, and easy scheduling.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button onClick={() => setCurrentPage("contact")} className="rounded-2xl px-6 py-6">Get Quote</Button>
            <BookingButton className="px-6 py-3" />
            <a href={phoneHref}><Button variant="outline" className="rounded-2xl px-6 py-6">Call {phoneDisplay}</Button></a>
          </div>
          <div className="mt-8">
            <QuoteCalculator />
          </div>
        </div>
        <div className="space-y-6">
          <img src={gallery[0].image} alt="Service visual" className="w-full rounded-[2rem] object-cover shadow-xl" />
          <LeadStrip />
        </div>
      </Container>
    </main>
  );
}

function ServicesPage({ setCurrentPage, setService }) {
  return (
    <main className="py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Services</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Exterior cleaning services designed to make properties shine.</h1>
          <p className="mt-5 text-base leading-7 text-neutral-600">Whether you need spotless windows, brighter concrete, or clean flowing gutters, we offer dependable service built around visible results and easy scheduling.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} className="rounded-[2rem] border-white/80 bg-white shadow-sm shadow-sky-100 transition hover:-translate-y-0.5">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-neutral-100">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">{service.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-neutral-600">{service.text}</p>
                      <ul className="mt-5 space-y-2 text-sm text-neutral-700">
                        {service.bullets.map((bullet) => <li key={bullet}>• {bullet}</li>)}
                      </ul>
                      <button onClick={() => { setService(service); setCurrentPage("service"); }} className="mt-5 inline-flex items-center text-sm font-medium hover:underline">View service page <ChevronRight className="ml-1 h-4 w-4" /></button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </main>
  );
}

function ServicePage({ service, setCurrentPage }) {
  if (!service) return null;
  const Icon = service.icon;
  return (
    <main className="py-16 lg:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-100 to-cyan-100 px-4 py-2 text-sm text-sky-700"><Icon className="h-4 w-4" /> {service.title}</div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{service.headline}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600">{service.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button className="rounded-2xl px-4 py-3" onClick={() => setCurrentPage("contact")}>Get a Quote</Button>
            <BookingButton variant="outline" />
            <a href={phoneHref}><Button variant="outline" className="rounded-2xl px-4 py-3">Call {phoneDisplay}</Button></a>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.bullets.map((bullet) => (
              <Card key={bullet} className="rounded-[2rem] border border-black/10 bg-white shadow-sm">
                <CardContent className="flex items-start gap-3 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5" />
                  <div className="text-sm leading-6 text-neutral-700">{bullet}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <img src={gallery[2].image} alt={service.title} className="w-full rounded-[2rem] object-cover shadow-xl" />
          <LeadStrip />
        </div>
      </Container>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="py-16 lg:py-20">
      <Container className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">About</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">A local company focused on quality, professionalism, and consistency.</h1>
          <div className="mt-6 space-y-4 text-neutral-600 leading-7">
            <p>Darling Window Cleaning is built to help homeowners and businesses maintain properties that look clean, cared for, and inviting.</p>
            <p>We believe exterior cleaning should feel easy: clear communication, dependable arrival times, attention to detail, and a final result you can see immediately.</p>
            <p>From one-time cleanings to recurring service plans, our goal is to become the company you trust every time your property needs to shine.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card className="rounded-[2rem] border-white/80 bg-white shadow-sm shadow-sky-100"><CardContent className="p-5"><div className="flex items-center gap-2 text-sm font-semibold"><Shield className="h-4 w-4" /> Professional Service</div><p className="mt-2 text-sm leading-6 text-neutral-600">Built around presentation, communication, and dependable results.</p></CardContent></Card>
            <Card className="rounded-[2rem] border-white/80 bg-white shadow-sm shadow-sky-100"><CardContent className="p-5"><div className="flex items-center gap-2 text-sm font-semibold"><CalendarDays className="h-4 w-4" /> Easy Scheduling</div><p className="mt-2 text-sm leading-6 text-neutral-600">Call, request a quote, or book online with a simple path to conversion.</p></CardContent></Card>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] shadow-xl">
          <img src={gallery[1].image} alt="Darling Window Cleaning technician" className="h-full min-h-[420px] w-full object-cover" />
        </div>
      </Container>
    </main>
  );
}

function GalleryPage() {
  return (
    <main className="py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Gallery</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Clean, polished results that stand out.</h1>
          <p className="mt-5 text-base leading-7 text-neutral-600">A visual look at the kind of clean, bright finish clients expect from Darling Window Cleaning.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {gallery.map((item) => (
            <Card key={item.title} className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm">
              <img src={item.image} alt={item.title} className="h-72 w-full object-cover" />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-neutral-500"><Camera className="h-4 w-4" /> Project highlight</div>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">{item.title}</h2>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}

function CommercialPage({ setCurrentPage }) {
  return (
    <main className="py-16 lg:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Commercial Services</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Professional recurring service for businesses and properties.</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600">We help commercial properties maintain a clean, professional appearance with dependable scheduling and quality results.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Storefronts and retail","Office buildings","Dealerships","Theaters and entertainment venues","Property management accounts","Recurring maintenance routes"].map((item) => (
                <div key={item} className="rounded-2xl border border-black/10 p-4 text-sm text-neutral-700">{item}</div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="rounded-2xl px-4 py-3" onClick={() => setCurrentPage("contact")}>Request Commercial Quote</Button>
              <BookingButton variant="outline" />
            </div>
          </div>
          <Card className="rounded-[2rem] border-white/80 bg-white shadow-sm shadow-sky-100">
            <CardContent className="p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Why businesses choose us</div>
              <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-600">
                <p>Consistent scheduling that works around your operations.</p>
                <p>Professional presentation for customer-facing properties.</p>
                <p>Simple communication for quotes, approvals, and recurring service.</p>
              </div>
              <a href={phoneHref}><Button className="mt-8 w-full rounded-2xl px-4 py-3">Call {phoneDisplay}</Button></a>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
}

function CityPagesList({ setCurrentPage, setCity }) {
  return (
    <main className="py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Service Areas</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Window cleaning services in your area.</h1>
          <p className="mt-5 text-base leading-7 text-neutral-600">Serving homeowners and businesses nearby with fast quotes and easy booking.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cityPages.map((city) => (
            <Card key={city.slug} className="cursor-pointer rounded-[2rem] border border-black/10 bg-white shadow-sm" onClick={() => { setCity(city); setCurrentPage("city"); }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-neutral-500"><MapPin className="h-4 w-4" /> {city.name}</div>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">{city.headline}</h2>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{city.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}

function CityLandingPage({ city, setCurrentPage }) {
  if (!city) return null;
  return (
    <main className="py-16 lg:py-20">
      <Container className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-100 to-cyan-100 px-4 py-2 text-sm text-sky-700"><MapPin className="h-4 w-4" /> {city.name}</div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{city.headline}</h1>
          <p className="mt-4 text-base leading-7 text-neutral-600">{city.text}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button onClick={() => setCurrentPage("contact")} className="rounded-2xl px-4 py-3">Get Quote</Button>
            <BookingButton />
            <a href={phoneHref}><Button variant="outline" className="rounded-2xl px-4 py-3">Call {phoneDisplay}</Button></a>
          </div>
          <div className="mt-8 space-y-4 text-neutral-600 leading-7">
            <p>We provide professional window cleaning, pressure washing, and gutter cleaning services throughout {city.name}.</p>
            <p>Fast response, clean results, and easy booking for homes and businesses.</p>
          </div>
        </div>
        <div className="space-y-6">
          <img src={gallery[0].image} alt={city.name} className="w-full rounded-[2rem] object-cover shadow-xl" />
          <LeadStrip />
        </div>
      </Container>
    </main>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", details: "" });
  const mailto = useMemo(() => {
    const subject = encodeURIComponent("Quote Request - Darling Window Cleaning");
    const body = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nAddress: ${form.address}\n\nProject Details:\n${form.details}`);
    return `mailto:hello@darlingwindowcleaning.com?subject=${subject}&body=${body}`;
  }, [form]);

  return (
    <main className="py-16 lg:py-20">
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Contact</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Request your quote.</h1>
          <p className="mt-5 text-base leading-7 text-neutral-600">Tell us a little about your home or property and what you need cleaned. This page is ready for a form connection later.</p>
          <div className="mt-8 space-y-4 text-sm text-neutral-700">
            <div className="flex items-center gap-3"><Phone className="h-4 w-4" /> {phoneDisplay}</div>
            <div className="flex items-center gap-3"><MapPin className="h-4 w-4" /> Huntington Beach, California</div>
            <div className="flex items-center gap-3"><Mail className="h-4 w-4" /> hello@darlingwindowcleaning.com</div>
            <div className="flex items-center gap-3"><MessageSquare className="h-4 w-4" /> Fast quotes and scheduling support</div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card className="rounded-[2rem] border-white/80 bg-white shadow-sm shadow-sky-100"><CardContent className="p-5"><div className="flex items-center gap-2 text-sm font-semibold"><HomeIcon className="h-4 w-4" /> Residential Service</div><p className="mt-2 text-sm leading-6 text-neutral-600">Homes, coastal properties, condos, and recurring maintenance.</p></CardContent></Card>
            <Card className="rounded-[2rem] border-white/80 bg-white shadow-sm shadow-sky-100"><CardContent className="p-5"><div className="flex items-center gap-2 text-sm font-semibold"><Briefcase className="h-4 w-4" /> Commercial Service</div><p className="mt-2 text-sm leading-6 text-neutral-600">Storefronts, office glass, route work, and customer-facing properties.</p></CardContent></Card>
          </div>
        </div>
        <Card className="rounded-[2rem] border-white/80 bg-white shadow-sm shadow-sky-100">
          <CardContent className="p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <Input placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input placeholder="Property address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <Textarea className="mt-4 min-h-[160px]" placeholder="Tell us what you need cleaned..." value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={mailto} className="inline-flex"><Button className="rounded-2xl px-4 py-3">Send Quote Request</Button></a>
              <BookingButton variant="outline" fullWidth />
              <a href={phoneHref} className="inline-flex"><Button variant="outline" className="rounded-2xl px-4 py-3">Call Now</Button></a>
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCity, setSelectedCity] = useState(cityPages[0]);
  const [selectedService, setSelectedService] = useState(services[0]);

  const page = {
    home: <HomePage setCurrentPage={setCurrentPage} setService={setSelectedService} setCity={setSelectedCity} />,
    landing: <LandingPage setCurrentPage={setCurrentPage} />,
    services: <ServicesPage setCurrentPage={setCurrentPage} setService={setSelectedService} />,
    service: <ServicePage service={selectedService} setCurrentPage={setCurrentPage} />,
    about: <AboutPage />,
    gallery: <GalleryPage />,
    commercial: <CommercialPage setCurrentPage={setCurrentPage} />,
    cityList: <CityPagesList setCurrentPage={setCurrentPage} setCity={setSelectedCity} />,
    city: <CityLandingPage city={selectedCity} setCurrentPage={setCurrentPage} />,
    contact: <ContactPage />,
  }[currentPage];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50/30 to-white text-slate-900">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {page}
      <Footer setCurrentPage={setCurrentPage} />
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:bottom-4 sm:left-auto sm:right-4 sm:p-0">
        <div className="flex gap-3 sm:flex-row">
          <a href={phoneHref} className="flex-1 sm:flex-none">
            <Button className="h-14 w-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-5 text-white shadow-xl shadow-sky-200 hover:from-sky-600 hover:to-blue-700 sm:w-auto">
              <Phone className="mr-2 h-4 w-4" /> Call Now
            </Button>
          </a>
          <div className="flex-1 sm:flex-none">
            <BookingButton className="flex h-14 items-center justify-center px-5 shadow-xl" fullWidth rounded="rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
