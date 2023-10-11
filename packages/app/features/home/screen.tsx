import {
  Paragraph,
  XStack,
  YStack,
  ZStack,
  Text,
  Card,
  H1,
  H2,
  Image,
  Heading,

} from '@my/ui'
import React, { useState, useEffect, useRef } from 'react';

export function HomeScreen() {

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <H1>Rick and Morty API fetch</H1>
      <H2>Characters</H2>
      <Characters />
      </YStack>
  )
}

export function Characters() {

  const [result, setResult] = useState([]);
  let originalChars = useRef(result);

  const fetchCharacters = () => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setResult(data.results);
        originalChars.current = data.results;
      });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

const showCharacters = (characters) => {
  return characters.map((char, index) => (
    <Card space p='$4'ai='center' key={index}>
      <Card.Header>
        <H2>{char.name}</H2>
        <Text>Status: {char.status}</Text>
      </Card.Header>
      <Card.Footer space p='$4' ai='center'>
        <img src={char.image} alt={char.name} />
      </Card.Footer>
    </Card>
  ));
};

return (
  <XStack space>
          <Text space>{showCharacters(result)}</Text>
    </XStack>
)
}