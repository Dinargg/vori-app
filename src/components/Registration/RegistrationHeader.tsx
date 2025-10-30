import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RegistrationHeader = ({ step, onBack }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Регистрация</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${(step / 4) * 100}%` }]} />
        </View>
        <Text style={styles.stepText}>Шаг {step} из 4</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000000',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  progressContainer: {
    alignItems: 'center',
    width: 80,
  },
  progressBackground: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  stepText: {
    fontSize: 10,
    color: '#666666',
  },
});

export default RegistrationHeader;