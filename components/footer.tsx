import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-gradient-to-b from-[#070b14] via-[#0b1220] to-black text-gray-300">
      {/* Glow divider */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-wide text-white">
              Fin<span className="text-cyan-400">Heal</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Smart finance, simplified.  
              Helping you build wealth with clarity, control, and confidence.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200">
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-cyan-400 transition">Features</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition">Pricing</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition">Security</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition">Roadmap</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-cyan-400 transition">About</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200">
              Stay in the loop
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Monthly insights. Zero spam.
            </p>
            <form className="flex items-center gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-md bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-white/10 focus:ring-cyan-400"
              />
              <button className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:bg-cyan-400 transition">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} FinHeal. Crafted with precision by Ruke.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-5">
            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <Github size={18} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <Linkedin size={18} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <Twitter size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.08),transparent_60%)]" />
    </footer>
  );
}
