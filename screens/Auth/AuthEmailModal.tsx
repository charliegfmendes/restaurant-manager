import React, { useState, useRef } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  IconButton,
  Avatar,
  useTheme,
} from 'react-native-paper';
import AppBackground from '../../components/AppBackground';
import CustomTextInput from '../../components/CustomTextInput';
import {
  validateEmail,
  authenticate,
  createAccount,
} from '../../services/auth';
import ImageSelector from '../../components/ImageSelector';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const { width: screenWidth } = Dimensions.get('window');

function toRegret() {
  Alert.alert(
    'Ops',
    'Houve um problema com os nossos servidores, daremos um jeito nisso.'
  );
}

export default function AuthEmailModal(props: {
  visible: boolean;
  onRequestClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const theme = useTheme();
  const imageSelectorRef = useRef(null);

  function slideToNext() {
    Animated.timing(slideAnim, {
      toValue: -screenWidth * (currentIndex + 1),
      duration: 50,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
    });
  }

  function slideToPrev() {
    Animated.timing(slideAnim, {
      toValue: -screenWidth * (currentIndex - 1),
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(currentIndex - 1);
    });
  }

  function handleCloseRequest() {
    if (currentIndex > 0) {
      slideToPrev();
    } else {
      props.onRequestClose();
    }
  }

  function handleEmailChange(text: string) {
    setEmail(text);
    setValidationMessage('');
  }

  async function handleValidateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim().length) {
      setValidationMessage('É preciso um e-mail para continuar');
      return;
    }

    if (!emailPattern.test(email.trim())) {
      setValidationMessage('Este email não é válido');
      return;
    }

    try {
      setIsLoading(true);
      const response = await validateEmail(email);
      setIsLoading(false);
      setUser(response.data.user);
      slideToNext();
    } catch (error) {
      setIsLoading(false);
      toRegret();
    }
  }

  function handlePasswordChange(text: string) {
    setPassword(text.trim());
    setValidationMessage('');
  }

  async function handleValidatePassword() {
    if (password.length < 8) {
      setValidationMessage('A senha deve conter pelo meno 8 caracteres');
      return;
    }

    try {
      if (user) {
        setIsLoading(true);
        await authenticate({ email, password });
        setLoading(false);
        return;
      }
      slideToNext();
    } catch (error) {
      setIsLoading(false);
      toRegret();
    }
  }

  function handleNameChange(text: string) {
    setValidationMessage('');
    setName(text);
  }

  async function handleCreateAccount() {
    if (!name.length) {
      setValidationMessage('Insira seu nome');
      return;
    }

    try {
      setIsLoading(true);
      await createAccount({ name, email, password });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toRegret();
    }
  }

  function handleChangePicture() {
    imageSelectorRef.current.showOptions();
  }

  return (
    <Modal
      visible={props.visible}
      onRequestClose={handleCloseRequest}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <ActionSheetProvider>
        <AppBackground>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row-reverse' }}>
              <IconButton icon="close" onPress={props.onRequestClose} />
            </View>
            <Animated.View
              style={{
                flexDirection: 'row',
                transform: [{ translateX: slideAnim }],
              }}
            >
              <View style={styles.slide}>
                <View style={styles.slideHeader}>
                  <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                    Entre com seu e-mail
                  </Text>
                </View>
                <CustomTextInput
                  label="E-mail"
                  placeholder="Digite seu melhor e-mail"
                  autoFocus
                  value={email}
                  onChangeText={handleEmailChange}
                  autoCapitalize="none"
                  error={!!validationMessage}
                  validationMessage={validationMessage}
                />
                <Button
                  mode="contained"
                  onPress={handleValidateEmail}
                  loading={isLoading}
                >
                  {isLoading ? '' : 'Continuar'}
                </Button>
              </View>
              <View style={styles.slide}>
                <View style={styles.slideHeader}>
                  <IconButton icon="chevron-left" onPress={slideToPrev} />
                  <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                    {user ? 'Insira sua senha' : 'Novo por aqui?'}
                  </Text>
                </View>
                <View style={styles.account}>
                  {user?.pictureUri ? (
                    <Avatar.Image
                      source={{
                        uri: user.pictureUri,
                      }}
                      size={40}
                      style={{ backgroundColor: theme.colors.surfaceVariant }}
                    />
                  ) : (
                    <Avatar.Icon
                      icon="account"
                      size={40}
                      style={{ backgroundColor: theme.colors.surfaceVariant }}
                    />
                  )}
                  <View>
                    {user ? <Text variant="bodySmall">{email}</Text> : <></>}
                    <Text variant="bodyLarge">
                      {user?.name ? user.name : email}
                    </Text>
                  </View>
                </View>
                <CustomTextInput
                  label={user ? 'Senha' : 'Crie sua senha'}
                  placeholder={user ? 'Digite sua senha' : 'Nova senha'}
                  value={password}
                  onChangeText={handlePasswordChange}
                  autoCapitalize="none"
                  error={!!validationMessage}
                  validationMessage={validationMessage}
                  secureTextEntry={!isPasswordVisible}
                  right={
                    <TextInput.Icon
                      icon={isPasswordVisible ? 'eye-off' : 'eye'}
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  }
                />
                <Button
                  mode="contained"
                  onPress={handleValidatePassword}
                  loading={isLoading}
                >
                  {!isLoading ? (user ? 'Entrar' : 'Continuar') : ''}
                </Button>
                {user ? <Button>Esqueceu a senha?</Button> : <></>}
              </View>
              <View style={styles.slide}>
                <View style={styles.slideHeader}>
                  <IconButton icon="chevron-left" onPress={slideToPrev} />
                  <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                    Qual é o seu nome?
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                  }}
                >
                  <TouchableOpacity onPress={handleChangePicture}>
                    {!profilePicture ? (
                      <Avatar.Icon
                        icon="camera-plus"
                        size={52}
                        style={{
                          backgroundColor: theme.colors.surfaceVariant,
                        }}
                      />
                    ) : (
                      <Avatar.Image
                        source={{ uri: profilePicture.uri }}
                        size={52}
                      />
                    )}
                  </TouchableOpacity>
                  <View style={{ flex: 1 }}>
                    <CustomTextInput
                      label="Nome"
                      placeholder="Digite seu nome"
                      autoFocus
                      value={name}
                      onChangeText={handleNameChange}
                      error={!!validationMessage}
                      validationMessage={validationMessage}
                    />
                    <ImageSelector
                      title="Foto do perfil"
                      ref={imageSelectorRef}
                      selectedImage={profilePicture}
                      onImageSelected={setProfilePicture}
                    />
                  </View>
                </View>
                <Button
                  mode="contained"
                  onPress={handleCreateAccount}
                  loading={isLoading}
                >
                  {isLoading ? '' : 'Criar conta'}
                </Button>
              </View>
            </Animated.View>
          </View>
        </AppBackground>
      </ActionSheetProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  slide: {
    padding: 12,
    width: screenWidth,
    justifyContent: 'center',
  },
  slideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  account: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 20,
    gap: 12,
    borderWidth: 0.8,
    borderColor: 'lightgray',
    borderRadius: 12,
    marginBottom: 20,
  },
});
