import Breadcrumbs from '@/components/ui/songs/breadcrumbs';
import Form from '@/components/ui/songs/create-form';


// import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
//   const customers = await fetchCustomers();
 
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