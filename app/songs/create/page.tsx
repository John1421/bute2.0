import Breadcrumbs from '@/components/ui/songs/breadcrumbs';
import Form from '@/components/ui/songs/form';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Músicas', href: '/songs' },
          {
            label: 'Adicionar Música',
            href: '/songs/create',
            active: true,
          },
        ]}
      />
      <Form  />
    </main>
  );
}