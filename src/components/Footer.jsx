import logoXl from "../../assets/logo-xl.png";
import instagramIcon from "../../assets/instagram.png";
import facebookIcon from "../../assets/facebook.png";
import twitterIcon from "../../assets/twitter.png";

const socialLinks = [
  { name: "Instagram", icon: instagramIcon, href: "#" },
  { name: "Facebook", icon: facebookIcon, href: "#" },
  { name: "X", icon: twitterIcon, href: "#" }
];

export default function Footer() {
  return (
    <footer className="mt-12 bg-brand-dark text-white">
      <div className="page-wrap py-16 sm:py-20">
        <div className="flex flex-col items-center text-center">
          <img src={logoXl} alt="KeenKeeper" className="h-[56px] w-auto object-contain sm:h-[61px]" loading="eager" decoding="async" />
          <p className="mt-6 max-w-5xl text-sm text-emerald-50/85 sm:text-base">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>

          <h3 className="mt-7 text-2xl font-semibold">Social Links</h3>
          <div className="mt-4 flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                aria-label={link.name}
                className="rounded-full transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <img src={link.icon} alt="" className="h-10 w-10 object-contain" loading="lazy" decoding="async" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-emerald-400/20 pt-8 text-sm text-emerald-50/70">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p>© 2026 KeenKeeper. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-emerald-50">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-50">Terms of Service</a>
              <a href="#" className="hover:text-emerald-50">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
