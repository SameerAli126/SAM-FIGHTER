import { PROFILE } from "@/config/site";

const Footer = () => (
  <footer className="py-8 border-t border-border/50">
    <div className="container mx-auto px-6 text-center">
      <p className="font-heading text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()}{" "}
        <span className="energy-gradient-text font-semibold">{PROFILE.fullName}</span>. All rights reserved.
      </p>
      <p className="font-heading text-xs text-muted-foreground/50 mt-2 uppercase tracking-wider">
        Built with React &bull; Powered by Passion
      </p>
    </div>
  </footer>
);

export default Footer;
