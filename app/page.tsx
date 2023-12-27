import InvoicesClient from "./(home)/_components/invoices/invoices-client";
import SummaryWidget from "./(home)/_components/summary";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start gap-4">
      <SummaryWidget />
      <InvoicesClient />
    </main>
  );
}
