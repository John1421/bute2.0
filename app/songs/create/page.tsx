import { fetchArtists } from '@/app/lib/database/data';
import Breadcrumbs from '@/components/ui/songs/breadcrumbs';
import Form from '@/components/ui/songs/form';
 
export default async function Page() {
  const artists = await fetchArtists();
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
      <Form  artists={artists}/>
    </main>
  );
}