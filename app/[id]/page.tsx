// components/SongComponent.tsx
import { promises as fs } from 'fs';
import path from 'path';

const chordPattern = /^[A-G](#|b)?(m|sus|dim|aug)?\d?(add\d|maj7|m7)?$/;

async function processSongFile(filePath: string) {
  console.log(filePath)
  const fileContent = await fs.readFile(filePath, 'utf8');
  const lines = fileContent.split('\n');

  const songStructure = {
    lyrics: [] as string[],
    chords: [] as string[],
    mixedContent: [] as string[],
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

    songStructure.mixedContent.push(trimmedLine);
  });

  return songStructure;
}

// Server Component for displaying the song data
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id.replace('%20', ' ')
  const filePath = path.join(process.cwd(), `/Music/Taizé/${id}.txt`);
  const songStructure = await processSongFile(filePath);

  return (
    <div>
      <h3>Letras:</h3>
      <pre>{songStructure.lyrics.join('\n')}</pre>
      <br></br>
      <h3>Acordes:</h3>
      <pre>{songStructure.chords.join('\n')}</pre>
      <br></br>
      <h3>Conteúdo Misturado:</h3>
      <pre>{songStructure.mixedContent.join('\n')}</pre>
    </div>
  );
}
