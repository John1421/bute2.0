import Breadcrumbs from '@/components/ui/songs/breadcrumbs';
import { ArtistForm, TagForm } from '@/components/ui/songs/form';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tags', href: '/tags' },
          {
            label: 'Adicionar Tag',
            href: '/tags/create',
            active: true,
          },
        ]}
      />
      <TagForm  />
    </main>
  );
}