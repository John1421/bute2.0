// components/SongComponent.tsx
import { fetchSongById } from '@/app/lib/database/data';
import { courierPrime } from '@/components/ui/fonts';



const chordPattern = /^[A-G](#|b)?(m|sus|dim|aug)?\d?(add\d|maj7|m7)?$/;

async function processSongFile(filePath: string) {
  const response = await fetch(filePath);
  const data = await response.text();
  const fileContent = data || "";
  const lines = fileContent.split('\n');

  const songStructure = {
    lyrics: [] as string[],
    chords: [] as string[],
    mixedContent: [] as { text: string, isChord: boolean }[],
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    const words = trimmedLine.split(/\s+/);
    const isChordLine = words.every(word => chordPattern.test(word));

    if (isChordLine) {
      songStructure.chords.push(trimmedLine);
    } else {
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

  return (
    <section className="flex flex-col items-start gap-4 md:p-6">
      <h2 className='text-xbold text-large'>{song.title}</h2>

      <div className={`text-light text-medium tracking-tight ${courierPrime.className}`}>
        <div>
          {songStructure.mixedContent.map((line, index) => (
            <div key={index} style={{ whiteSpace: 'pre-wrap' }}>
              {line.isChord ? (
                <strong>{line.text}</strong>
              ) : (
                <span>{line.text + '\n'}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    // <div>
    //   <h3>Letras:</h3>
    //   <pre>{songStructure.lyrics.join('\n')}</pre>
    //   <br></br>
    //   <h3>Acordes:</h3>
    //   <pre>{songStructure.chords.join('\n')}</pre>
    //   <br></br>
    //   <h3>Conteúdo Misturado:</h3>
    //   <pre>{songStructure.mixedContent.join('\n')}</pre>
    // </div>
  );
}
