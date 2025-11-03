import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const InputField = ({ 
  label, 
  value, 
  onChange, 
  keyboardType = 'default', 
  secure = false,
  maxLength = 100,
  placeholder = '',
  multiline = false,
  numberOfLines = 1
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      {label && (
        <Text style={[
          styles.inputLabel,
          (focused || value) && styles.inputLabelFloating
        ]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          focused && styles.inputFocused,
          multiline && styles.multilineInput
        ]}
        value={value}
        onChangeText={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardType={keyboardType}
        secureTextEntry={secure && !showPassword}
        autoCapitalize="none"
        maxLength={maxLength}
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      {secure && value && (
        <TouchableOpacity 
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.eyeText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  inputLabel: {
    position: 'absolute',
    left: 16,
    top: 18,
    fontSize: 16,
    color: '#666666',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    zIndex: 1,
  },
  inputLabelFloating: {
    top: -10,
    fontSize: 13,
    color: '#000000',
    fontWeight: '500',
    paddingHorizontal: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 18,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    minHeight: 56,
  },
  multilineInput: {
    minHeight: 100,
    paddingTop: 16,
    paddingBottom: 16,
    textAlignVertical: 'top',
  },
  inputFocused: {
    borderColor: '#000000',
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 8,
  },
  eyeText: {
    fontSize: 20,
  },
});

export default InputField;