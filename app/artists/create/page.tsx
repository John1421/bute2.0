import Breadcrumbs from '@/components/ui/songs/breadcrumbs';
import { ArtistForm } from '@/components/ui/songs/form';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Autores', href: '/artists' },
          {
            label: 'Adicionar Autor',
            href: '/artists/create',
            active: true,
          },
        ]}
      />
      <ArtistForm  />
    </main>
  );
}