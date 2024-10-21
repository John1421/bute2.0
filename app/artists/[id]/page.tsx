// components/SongComponent.tsx
import { fetchArtistById, fetchSongById } from '@/lib/database/data';
import { courierPrime } from '@/components/ui/fonts';
import Breadcrumbs from '@/components/ui/songs/breadcrumbs';
import SongDisplay from '../../../components/ui/SongDisplay';


// Server Component for displaying the song data
export default async function Page({ params }: { params: { id: string } }) {
  const artist = await fetchArtistById(params.id);

  return (
    <section className="flex flex-col items-start gap-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Autores', href: '/artists' },
          {
            label: artist.name,
            href: `/artists/${artist.id}`,
            active: true,
          },
        ]}
      />
    </section>
  );
}
