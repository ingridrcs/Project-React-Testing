import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Testando o componente <About.js>', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const getAbout = screen.getByRole('link', { name: 'About' });

    userEvent.click(getAbout);

    const getText = screen.getByText(/This application simulates a Pokédex/i);
    expect(getText).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const getAbout = screen.getByRole('link', { name: 'About' });

    userEvent.click(getAbout);

    const getText = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(getText).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const getAbout = screen.getByRole('link', { name: 'About' });

    userEvent.click(getAbout);

    const getText = screen.getByText(/This application simulates a Pokédex/i);
    const getText2 = screen.getByText(/One can filter Pokémons/i);
    expect(getText).toBeInTheDocument();
    expect(getText2).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const getAbout = screen.getByRole('link', { name: 'About' });

    userEvent.click(getAbout);

    const getImage = screen.getByRole('img', { name: /Pokédex/i });
    expect(getImage).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

// Source: https://jestjs.io/pt-BR/docs/expect#tohavepropertykeypath-value
