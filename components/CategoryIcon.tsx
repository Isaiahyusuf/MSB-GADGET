type CategoryIconProps = { type: "gadget" | "car" | "land"; className?: string };

export default function CategoryIcon({ type, className = "h-10 w-10" }: CategoryIconProps) {
  if (type === "car") {
    return <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}><path d="m8 29 3-11a4 4 0 0 1 4-3h18a4 4 0 0 1 4 3l3 11" /><path d="M6 28h36v8a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-1H14v1a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-8Z" /><path d="M14 24h20M11 31h4m18 0h4" /></svg>;
  }
  if (type === "land") {
    return <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}><path d="m6 26 18-15 18 15" /><path d="M10 23v16h28V23M18 39V28h12v11M7 39h34" /><path d="M34 13v-5h5v9" /></svg>;
  }
  return <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}><rect x="13" y="6" width="22" height="36" rx="4" /><path d="M20 11h8M22 36h4" /></svg>;
}
