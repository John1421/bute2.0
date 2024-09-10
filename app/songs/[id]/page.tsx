// components/SongComponent.tsx
import { fetchSongById } from '@/app/lib/database/data';
import { courierPrime } from '@/components/ui/fonts';
import Breadcrumbs from '@/components/ui/songs/breadcrumbs';
import SongDisplay from '../../../components/ui/SongDisplay';



const chordPattern = /^[A-G](#|b)?(m|sus|dim|aug)?\d?(add\d|maj7|m7)?(?:\/[A-G](#|b)?\d?)?$/;
export type SongStructure = {
  lyrics: string[],
  mixedContent: { text: string, isChord: boolean }[],
}

async function processSongFile(filePath: string) {
  const response = await fetch(filePath);
  const data = await response.text();
  const fileContent = data || "";
  const lines = fileContent.split('\n');
  const songStructure: SongStructure = {
    lyrics: [],
    mixedContent: []
  };
  lines.forEach((line) => {
    const trimmedLine = line.trim();
    const words = trimmedLine.split(/\s+/);
    const isChordLine = words.every(word => chordPattern.test(word));

    if (!isChordLine) {
      songStructure.lyrics.push(trimmedLine);
    }

    songStructure.mixedContent.push({ text: trimmedLine, isChord: isChordLine });
  });

  return songStructure;
}

// Server Component for displaying the song data
export default async function Page({ params }: { params: { id: string } }) {
  const song = await fetchSongById(params.id);
  const filePath = song.file_path;
  
  const songStructure = await processSongFile(filePath);
  const isChecked = false

  return (
    <section className="flex flex-col items-start gap-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Músicas', href: '/songs' },
          {
            label: song.title,
            href: `/songs/${song.id}`,
            active: true,
          },
        ]}
      />
      <SongDisplay songStructure={songStructure} />
    </section>
  );
}
