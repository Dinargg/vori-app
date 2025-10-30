import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const InputField = ({ 
  label, 
  value, 
  onChange, 
  keyboardType = 'default', 
  secure = false,
  maxLength = 100,
  placeholder = ''
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Text style={[
        styles.inputLabel,
        (focused || value) && styles.inputLabelFloating
      ]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          focused && styles.inputFocused,
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
    left: 12,
    top: 16,
    fontSize: 16,
    color: '#666666',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  inputLabelFloating: {
    top: -8,
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  inputFocused: {
    borderColor: '#000000',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 16,
  },
  eyeText: {
    fontSize: 18,
  },
});

export default InputField;