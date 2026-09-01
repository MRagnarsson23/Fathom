import Link from "next/link";

export function EmptyState({
  kicker,
  title,
  body,
  href,
  action,
}: {
  kicker: string;
  title: string;
  body: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="mx-auto max-w-measure py-10 text-center">
      <p className="font-label text-brass">{kicker}</p>
      <h2 className="mt-3 font-display text-3xl text-ink">{title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-mute">{body}</p>
      {href && action ? (
        <Link
          href={href}
          className="mt-8 inline-block rounded-sm border border-brass/40 bg-brass/10 px-5 py-2.5 font-sans text-sm text-brass no-underline hover:bg-brass/20"
        >
          {action}
        </Link>
      ) : null}
    </div>
  );
}
