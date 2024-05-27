import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Divider } from 'react-native-paper';
import AppBackground from '../../components/AppBackground';
import AuthEmailModal from './AuthEmailModal';
import Disclaimer from './Disclaimer';

export default function AuthScreen() {
  const [authEmailModalVisible, setAuthEmailModalVisible] = useState(false);

  return (
    <AppBackground>
      <AuthEmailModal
        visible={authEmailModalVisible}
        onRequestClose={() => setAuthEmailModalVisible(false)}
      />
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>
            Orderlify
          </Text>
          <Text variant="labelLarge">Escolha como quer entrar</Text>
        </View>
        <Button
          mode="contained"
          icon="facebook"
          buttonColor="#3b5998"
          onPress={() => {}}
        >
          Entrar com Facebook
        </Button>
        <Button
          mode="contained"
          icon="apple"
          buttonColor="black"
          onPress={() => {}}
        >
          Entrar com Apple ID
        </Button>
        <Button
          mode="contained"
          icon="email"
          buttonColor="#EA4335"
          onPress={() => setAuthEmailModalVisible(true)}
        >
          Entrar com email
        </Button>
      </View>
      <Divider />
      <Disclaimer />
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
});
