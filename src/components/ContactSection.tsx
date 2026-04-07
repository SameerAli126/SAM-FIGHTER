import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Mail, Send } from "lucide-react";
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
        title: "Message prepared",
        description:
          result.mode === "endpoint"
            ? "Your message was sent successfully."
            : "Your email client was opened to complete the message.",
      });
      form.reset();
    } catch {
      toast({
        variant: "destructive",
        title: "Message failed",
        description: "Could not send your message. Please try again in a moment.",
      });
    }
  });

  const { errors, isSubmitting } = form.formState;

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary mb-3">Get In Touch</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase">
            Ready to <span className="energy-gradient-text">Build?</span>
          </h2>
          <p className="font-heading text-muted-foreground mt-4 max-w-lg mx-auto">
            Let&apos;s discuss your next product and turn ideas into a reliable release.
          </p>
          <a
            href={PROFILE.hireMeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-sm border border-primary/40 px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary/10"
          >
            <Linkedin size={16} />
            Hire Me on LinkedIn
          </a>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-foreground/90">
            <Mail size={16} className="text-primary" />
            <a
              href={`mailto:${PROFILE.contactEmail}`}
              className="font-heading tracking-wide hover:text-primary transition-colors"
            >
              {PROFILE.contactEmail}
            </a>
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          onSubmit={onSubmit}
          noValidate
          className="glass-card rounded-lg p-8 max-w-2xl mx-auto fighting-border"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="contact-name"
                className="block font-heading text-xs uppercase tracking-wider text-muted-foreground mb-2"
              >
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                {...form.register("name")}
                className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                placeholder="Enter your name"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && (
                <p className="mt-2 text-xs text-destructive" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block font-heading text-xs uppercase tracking-wider text-muted-foreground mb-2"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                {...form.register("email")}
                className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                placeholder="your@email.com"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <p className="mt-2 text-xs text-destructive" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="contact-message"
              className="block font-heading text-xs uppercase tracking-wider text-muted-foreground mb-2"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              {...form.register("message")}
              className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
              placeholder="Tell me about your project..."
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message && (
              <p className="mt-2 text-xs text-destructive" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full energy-gradient px-8 py-3 rounded-sm font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-opacity box-glow flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Send size={16} /> {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex justify-center gap-6 mt-12"
        >
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:box-glow transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
