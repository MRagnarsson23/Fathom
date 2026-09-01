import { EmptyState } from "@/components/EmptyState";

export default function NotFound() {
  return (
    <EmptyState
      kicker="Lost page"
      title="This depth is uncharted"
      body="The page does not exist. Return home and choose a book to master."
      href="/"
      action="Home"
    />
  );
}
