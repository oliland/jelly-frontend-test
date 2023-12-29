import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacter } from './lib/marvel'; // Ensure the path is correct

interface Character {
  id: string;
  name: string;
  description: string;
  thumbnail: string; // Assuming thumbnail is a URL in string format
}

function CharacterPage() {
  const [character, setCharacter] = useState<Character | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const loadCharacter = async () => {
      if (id) {
        const item = await fetchCharacter(id);
        console.log(item);
        const character: Character = {
          id: item.id,
          name: item.name,
          description: item.description,
          thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
        }
        setCharacter(character);
      }
    };
    loadCharacter();
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <p>{character.description}</p>
      <img src={character.thumbnail}></img>
    </div>
  );
}

export default CharacterPage;