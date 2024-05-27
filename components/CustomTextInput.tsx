import React from 'react';
import { View } from 'react-native';
import {
  HelperText,
  TextInput,
  TextInputProps,
} from 'react-native-paper';

interface CustomTextInputProps extends TextInputProps {
  validationMessage?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  validationMessage,
  ...props
}) => {
  return (
    <View>
      <TextInput {...props} />
      <HelperText type="error" visible={!!props.error}>
        {validationMessage}
      </HelperText>
    </View>
  );
};

export default CustomTextInput;
