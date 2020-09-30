import React from 'react';
import { render, screen, waitForElementToBeRemoved  } from '@testing-library/react';
import App from './App';

test('Calls GRPC service and renders response message', async () => {
  // Render the React application
  render(<App />);
  
  // Wait for the loader to be removed
  await waitForElementToBeRemoved(() => screen.findByTestId('loader'));

  // Assert - search the DOM for the rendered response message
  expect(screen.getByText(/Hello! World!/)).not.toBeNull();
});
