import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Se as informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const textDetails = screen.getByText(/Pikachu Details/i);
    const getSummary = screen.getByText(/Summary/i);
    const getParagrafer = screen.getByText(/This intelligent Pokémon/i);
    expect(getParagrafer).toBeInTheDocument();
    expect(getSummary).toBeInTheDocument();
    expect(textDetails).toBeInTheDocument();
    history.push('/');
    const getLink = screen.getByRole('link', { name: /More Details/i });
    expect(getLink).toBeInTheDocument();
    expect(textDetails).not.toContain(getLink);
  });
  it('Se na página tem uma seção com os mapas com as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const getLocal = screen.getByRole('heading', { level: 2, name: /Game Locations/i });
    expect(getLocal).toBeInTheDocument();
    const name1 = screen.getByText(/Kanto Viridian Forest/i);
    const name2 = screen.getByText(/Kanto Power Plant/i);
    expect(name1 && name2).toBeInTheDocument();
    const img1 = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(img1[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img1[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('Se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const getLink = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(getLink);
    const getFavorite = screen.getByRole('checkbox', { name: /Pokémon Favoritado/i });
    userEvent.click(getFavorite);
    expect(getFavorite).toBeInTheDocument();
  });
});
