import * as React from 'react';
import { Text } from 'react-native-paper';

export default function Disclaimer() {
  return (
    <Text
      variant="bodySmall"
      style={{
        textAlign: 'center',
        padding: 16,
      }}
    >
      Ao continuar, você concorda com os{' '}
      <Text
        variant="labelSmall"
        style={{
          fontWeight: 'bold',
          textDecorationLine: 'underline',
        }}
      >
        Termos de Serviço
      </Text>{' '}
      e confirma que leu a nossa{' '}
      <Text
        variant="labelSmall"
        style={{
          fontWeight: 'bold',
          textDecorationLine: 'underline',
        }}
      >
        Política de Privacidade
      </Text>
      .
    </Text>
  );
}
