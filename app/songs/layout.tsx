export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</section>
  );
} 