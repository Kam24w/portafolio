import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-ink/20 py-8 text-sm text-ink/60">
      © {new Date().getFullYear()} {profile.name}
    </footer>
  );
}
