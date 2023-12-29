import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import TextField from '@mui/material/TextField';
import { fetchData } from './lib/marvel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

interface Character {
  id: string;
  name: string;
  thumbnail: string; // Assuming thumbnail is a URL in string format
}

function Search() {
  const [characters, setCharacters] = useState<Character[]>([]);

  const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const results = await fetchData(e.target.value);
    if (results) {
      const characters = results.slice(0, 5).map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
      }));
      console.log(characters);
      setCharacters(characters);
    } else {
      console.log("error");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <TextField id="outlined-basic" onChange={onSearch} label="Search" variant="outlined" />
        <List>
          {characters.map((character, index) => (
            <ListItem key={index} component={Link} to={`/character/${character.id}`}>
              <ListItemAvatar>
                <Avatar src={character.thumbnail} />
              </ListItemAvatar>
              <ListItemText primary={character.name} />
            </ListItem>
          ))}
        </List>
      </header>
    </div>
  );
}

export default Search;
