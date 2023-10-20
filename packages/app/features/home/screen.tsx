import React from 'react';
import axios from 'axios';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import {
  YStack,
  Text,
  Card,
  H1,
  H2,
  H6,
} from '@my/ui';

const fetchCharacters = async () => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    return response.data.results;
  } catch (error) {
    throw new Error('Error fetching data');
  }
};


export function HomeScreen() {

  return (
    <QueryClientProvider client={queryClient}>
    <YStack f={1} jc="center" ai="center" p="$4">
      <H1>Rick and Morty API fetch</H1>
      <H2>Characters</H2>
      <Characters />
    </YStack>
    </QueryClientProvider>
  )
}
const queryClient = new QueryClient();

export function Characters() {
  const { data, isLoading, isError } = useQuery('characters', fetchCharacters);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const CharactersList = data.map((char, index) => (
      <YStack key={index} f={1} m='8px'>
        <Card>
        <Card.Header>
          <H2 ai="center" space>{char.name}</H2>
          <H6 ai="center">Status: {char.status}</H6>
        </Card.Header>
        <Card.Footer space p='$4' ai='center'>
          <img src={char.image} alt={char.name} />
        </Card.Footer>
      </Card>
      </YStack>
    ));

return (
<Text>
        {CharactersList}
      </Text>
)
};
