import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom/cjs/react-router-dom.min';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('', () => {
  const customHistory = createMemoryHistory();
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();

    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavorite).toBeInTheDocument();
  });
  it('Se a aplicação vai para a página inicial, na URL / ao clicar no link Home', () => {
    render(

      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const linkHome = screen.getByRole('link', { name: 'Home' });

    userEvent.click(linkHome);
    expect(linkHome).toBeInTheDocument();
  });

  it('Se a aplicação vai para a página de About(/about), ao clicar no link About', () => {
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    expect(customHistory.location.pathname).toBe('/about');
  });
  it('Vai para página de Pokémons Favoritados(/favorites), ao clicar no link', () => {
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorite);
    expect(customHistory.location.pathname).toBe('/favorites');
  });

  it('É redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/pageNotFound');
    const pageNotFound = screen.getByRole(
      'heading', { level: 2, name: /Page requested not found/i,
      },
    );
    expect(pageNotFound).toBeInTheDocument();
  });
});
