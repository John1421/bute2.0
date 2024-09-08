import { fetchSongById } from '@/app/lib/database/data';
import Breadcrumbs from '@/components/ui/songs/breadcrumbs';
import Form from '@/components/ui/songs/form';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
    
  const id = params.id;
  const song = await fetchSongById(id);
  console.log(song)
  if(!song){
    notFound();
  }
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Músicas', href: '/songs' },
          {
            label: 'Editar Música',
            href: `/songs/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form song={song} />
    </main>
  );
}