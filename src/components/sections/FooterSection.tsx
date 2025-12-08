import Logo from "@/components/Logo";

const FooterSection = () => {
  return (
    <footer className="py-8 md:py-12 bg-foreground">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo variant="light" />
          <p className="text-primary-foreground/60 text-sm text-center md:text-left">
            © 2024 NousProprio. Conseils indépendants pour investisseurs ambitieux.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
