import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RegistrationHeader from '../components/Registration/RegistrationHeader';
import RegistrationStep1 from '../components/Registration/RegistrationStep1';
import RegistrationStep2 from '../components/Registration/RegistrationStep2';
import RegistrationStep3 from '../components/Registration/RegistrationStep3';
import RegistrationStep4 from '../components/Registration/RegistrationStep4';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    childName: '',
    childBirthDate: '',
    childGender: '',
  });

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <RegistrationStep1 formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 2:
        return <RegistrationStep2 formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 3:
        return <RegistrationStep3 formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 4:
        return <RegistrationStep4 formData={formData} prevStep={prevStep} />;
      default:
        return <RegistrationStep1 formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <RegistrationHeader 
        step={step} 
        onBack={step === 1 ? () => navigation.goBack() : prevStep} 
      />
      <ScrollView style={styles.content}>
        {renderStep()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
});

export default RegistrationScreen;