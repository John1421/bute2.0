export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="md:overflow-y-auto p-6 md:p-12">{children}</section>
  );
} 