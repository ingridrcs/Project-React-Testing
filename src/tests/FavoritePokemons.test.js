import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('"No favorite pokemon found" é exibida se não tiver pokémons favoritos', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorite);
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const details = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(details);
    const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(checkbox);
    const favotiteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favotiteLink);
    const getPokemon = screen.getByText('Pikachu');
    expect(getPokemon).toBeInTheDocument();
  });
});
