import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Copy, Linkedin, Mail, Phone, Send, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PROFILE, SOCIAL_LINKS } from "@/config/site";
import { submitContactForm } from "@/lib/contact";
import type { ContactPayload } from "@/lib/contact";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(80, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters.")
    .max(2000, "Message is too long."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const validatedPayload = contactFormSchema.parse(values) as ContactPayload;
      const result = await submitContactForm(validatedPayload);

      if (result.mode === "mailto") {
        window.location.href = result.href;
      }

      toast({
        title: "Message Prepared",
        description:
          result.mode === "endpoint"
            ? "Your message was sent successfully."
            : "Your email client was opened with the message ready.",
      });
      form.reset();
    } catch {
      toast({
        variant: "destructive",
        title: "Message Failed",
        description: "Could not send your message. Please try again or reach out directly via email.",
      });
    }
  });

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.contactEmail);
      setCopied(true);
      toast({
        title: "Email Copied",
        description: `${PROFILE.contactEmail} copied to your clipboard.`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const { errors, isSubmitting } = form.formState;

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Heading matching test expectation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 mb-3">
            Initiate Contact
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Ready to <span className="tech-gradient-text">Build?</span>
          </h2>
          <p className="font-body text-sm md:text-base text-muted-foreground mt-4 max-w-lg mx-auto">
            Whether you need a high-performance web product, an AI integration, or an engineering lead — let&apos;s talk.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <a
              href={PROFILE.hireMeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-heading text-xs font-bold text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all hover:opacity-95 active:scale-[0.96]"
            >
              <Linkedin size={15} />
              Connect on LinkedIn
            </a>

            <button
              type="button"
              onClick={copyEmailToClipboard}
              className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-secondary/50 px-4 py-2.5 font-mono text-xs text-foreground/90 hover:border-primary/40 hover:bg-secondary transition-all active:scale-[0.96]"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? "Copied!" : PROFILE.contactEmail}</span>
            </button>

            <a
              href={PROFILE.phoneTel}
              className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-secondary/50 px-4 py-2.5 font-mono text-xs text-foreground/90 hover:border-emerald-500/40 hover:text-emerald-300 hover:bg-secondary transition-all active:scale-[0.96]"
            >
              <Phone size={14} className="text-emerald-400" />
              <span>{PROFILE.phone}</span>
            </a>
          </div>
        </motion.div>

        {/* Contact Form Card */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={onSubmit}
          noValidate
          className="glass-card rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto border border-border/70 shadow-2xl"
        >
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label
                htmlFor="contact-name"
                className="block font-heading text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider"
              >
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                {...form.register("name")}
                className="w-full bg-secondary/60 border border-border/80 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all font-body"
                placeholder="Jane Doe"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-destructive font-mono" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block font-heading text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider"
              >
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                {...form.register("email")}
                className="w-full bg-secondary/60 border border-border/80 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all font-body"
                placeholder="jane@company.com"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-destructive font-mono" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="contact-message"
              className="block font-heading text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider"
            >
              Message / Project Details
            </label>
            <textarea
              id="contact-message"
              rows={5}
              {...form.register("message")}
              className="w-full bg-secondary/60 border border-border/80 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all font-body resize-none"
              placeholder="Tell me about your product requirements, timeline, and goals..."
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-destructive font-mono" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:opacity-95 text-primary-foreground font-heading text-sm font-bold py-3.5 px-6 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all flex items-center justify-center gap-2 active:scale-[0.96] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Send size={15} />
            <span>{isSubmitting ? "Dispatching..." : "Send Message"}</span>
          </button>
        </motion.form>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex justify-center gap-4 mt-12"
        >
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-xl border border-border/80 bg-secondary/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:box-glow-cyan transition-all"
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
