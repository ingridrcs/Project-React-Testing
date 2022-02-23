import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  it('Se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const getName = screen.getByText(/Pikachu/i);
    const getType = screen.getAllByText(/Electric/i);
    const getWeight = screen.getByText(/Average weight: 6.0 kg/i);
    const getImage = screen.getByRole('img', { name: /Pikachu sprite/i });
    const num = 2;
    expect(getName).toBeInTheDocument();
    expect(getType.length).toBe(num);
    expect(getWeight).toBeInTheDocument();
    expect(getImage).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Se o card do Pokémon contém um link de navegação', () => {
    renderWithRouter(<App />);
    const getName = screen.getByText(/Pikachu/i);
    expect(getName).toBeInTheDocument();
    const getLink = screen.getByRole('link', { name: /More Details/i });
    expect(getLink).toBeInTheDocument();
  });
  it('Ao clicar no link do Pokémon, vai para a página de detalhes de Pokémon.', () => {
    renderWithRouter(<App />);
    const getName = screen.getByText(/Pikachu/i);
    expect(getName).toBeInTheDocument();
    const getLink = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(getLink);
    const getName2 = screen.getByText(/Pikachu Details/i);
    expect(getName2).toBeInTheDocument();
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const getName = screen.getByText(/Pikachu/i);
    expect(getName).toBeInTheDocument();
    const getLink = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(getLink);
    const getFavorite = screen.getByRole('checkbox', { name: /Pokémon Favoritado?/i });
    userEvent.click(getFavorite);
    const getStar = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(getStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
