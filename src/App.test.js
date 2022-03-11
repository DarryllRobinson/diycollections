import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

test('renders the correct content ', () => {
  // render a React component to the DOM
  const root = document.createElement('div');
  ReactDOM.render(<App />, root);
});
