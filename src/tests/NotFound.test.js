import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Se página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pageNotFound');
    const getText = screen.getByRole(
      'heading', { level: 2, name: /Page requested not found/i },
    );
    expect(getText).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pageNotFound');
    const getImage = screen.getByRole(
      'img', { name: /Pikachu crying because the page requested was not found/i },
    );
    expect(getImage).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
