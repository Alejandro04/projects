import {
  Paragraph,
  XStack,
  YStack,
  ZStack,
  Text,
  Card,
  H1,
  H2,
  H6,
  Image,
  Heading,
} from '@my/ui'
import React, { useState, useEffect, useRef } from 'react';

export function HomeScreen() {

  return (
    <YStack f={1} jc="center" ai="center" p="$4">
      <H1>Rick and Morty API fetch</H1>
      <H2>Characters</H2>
      <Characters />
    </YStack>
  )
}

export function Characters() {

  const [result, setResult] = useState([]);
  let originalChars = useRef(result);

  useEffect(() => {
    const data = window.localStorage.getItem('char_load');

    if (data) {
      // If data exists in localStorage, use it
      setResult(JSON.parse(data));
    } else {
      // If no data in localStorage, fetch from API
      fetchCharacters();
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('char_load', JSON.stringify(result))
  }, [result])

  const fetchCharacters = () => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => res.json())
      .then((data) => {
        setResult(data.results);
        originalChars.current = data.results;
      });
  };

  const showCharacters = (characters) => {
    return characters.map((char, index) => (
      <Card key={index} f={1} m='8px'>
        <Card.Header>
          <H2>{char.name}</H2>
          <H6>Status: {char.status}</H6>
        </Card.Header>
        <Card.Footer space p='$4' ai='center'>
          <img src={char.image} alt={char.name} />
        </Card.Footer>
      </Card>
    ));
  };

  return (
    <Text dsp='flex' fw='wrap' jc='space-between' >
      {showCharacters(result)}
    </Text>
  )
}