import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const getText = screen.getByRole(
      'heading', { level: 2, name: /Encountered pokémons/i },
    );
    expect(getText).toBeInTheDocument();
  });
  it(
    'Se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado',
    () => {
      renderWithRouter(<App />);
      const getButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(getButton);
      const getCharmander = screen.getByText(/charmander/i);
      userEvent.dblClick(getButton);
      userEvent.dblClick(getButton);
      userEvent.dblClick(getButton);
      userEvent.click(getButton);
      const lastPokemon = screen.getByText(/Dragonair/i);
      userEvent.click(getButton);
      const showPikachu = screen.getByText(/Pikachu/i);

      expect(showPikachu).toBeInTheDocument();
      expect(getButton).toBeInTheDocument();
      expect(lastPokemon).toBeInTheDocument();
      expect(getCharmander).toBeInTheDocument();
    },
  );
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const onlyPikachu = screen.getByText(/Pikachu/i);
    const getButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(getButton);
    const onlyCharmander = screen.getByText(/Charmander/i);
    expect(onlyCharmander).toBeInTheDocument();
    expect(onlyCharmander).not.toContain(onlyPikachu);
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /All/i });
    const electricButton = screen.getByRole('button', { name: /Electric/i });
    const fireButton = screen.getByRole('button', { name: /Fire/i });
    const bugButton = screen.getByRole('button', { name: /Bug/i });
    const poisonButton = screen.getByRole('button', { name: /Poison/i });
    const psychicButton = screen.getByRole('button', { name: /Psychic/i });
    const normalButton = screen.getByRole('button', { name: /Normal/i });
    const dragonButton = screen.getByRole('button', { name: /Dragon/i });
    const allId = screen.getAllByTestId('pokemon-type-button');
    const num = 7;
    expect(allId).toHaveLength(num);
    expect(allButton).toBeInTheDocument();
    expect(electricButton).toBeInTheDocument();
    expect(fireButton).toBeInTheDocument();
    expect(bugButton).toBeInTheDocument();
    expect(poisonButton).toBeInTheDocument();
    expect(psychicButton).toBeInTheDocument();
    expect(normalButton).toBeInTheDocument();
    expect(dragonButton).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /All/i });
    userEvent.click(allButton);
    const showPikachu = screen.getByText(/Pikachu/i);
    expect(showPikachu).toBeInTheDocument();
  });
});

// Source: dblClick: https://testing-library.com/docs/ecosystem-user-event/
// toCntain: https://jestjs.io/pt-BR/docs/expect#tocontainitem
