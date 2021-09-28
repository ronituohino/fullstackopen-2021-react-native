import React from 'react';
import { SignInContainer } from '../../components/SignIn';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmitMock = jest.fn();

      const { getByTestId } = render(
        <SignInContainer onSubmit={onSubmitMock} />
      );

      fireEvent.changeText(getByTestId('username'), 'kalle');
      fireEvent.changeText(getByTestId('password'), 'password');
      fireEvent.press(getByTestId('signInButton'));

      await waitFor(() => {
        expect(onSubmitMock.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});
