import Link from "next/link";

const socials = ["Facebook", "Instagram", "Twitter"];

export default function Topbar() {
  return (
    <div className="w-full bg-[#1a1a1a] text-[#9a9a8a] hidden md:block">
      <div className="max-w-350 mx-auto px-8 h-9 flex items-center justify-between">
        {/* Left info */}
        <div className="flex items-center gap-6 text-[11px] tracking-wide">
          <span className="flex items-center gap-1.5">
            <ClockIcon />
            Open: Tue – Sun: 09am – 07pm, Sun: closed
          </span>
          <span className="w-px h-3 bg-white/10" />
          <span className="flex items-center gap-1.5">
            <PinIcon />
            1611 Linden Avenue 407, New York
          </span>
          <span className="w-px h-3 bg-white/10" />
          <span className="flex items-center gap-1.5">
            <PhoneIcon />
            01-382-4311, 301-461-9678
          </span>
        </div>

        {/* Right socials */}
        <div className="flex items-center gap-1 text-[11px] tracking-wide">
          <span className="text-[#9a9a8a] mr-2">Follow us:</span>
          {socials.map((s, i) => (
            <span key={s} className="flex items-center gap-1">
              {i > 0 && <span className="text-white/20">·</span>}
              <Link
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                {s}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="10" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="10" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
