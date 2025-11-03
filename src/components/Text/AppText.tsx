// src/components/Text/AppText.tsx
import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { TextStyles } from '../../constants/typography';
import { Colors } from '../../constants/colors';

type TextVariant = keyof typeof TextStyles;

interface AppTextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  children: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color = Colors.text.primary,
  align = 'left',
  style,
  children,
  ...props
}) => {
  const textStyle = StyleSheet.flatten([
    TextStyles[variant],
    { 
      color,
      textAlign: align,
    },
    style,
  ]);

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};

// Специализированные компоненты
export const ScreenTitle: React.FC<Omit<AppTextProps, 'variant'>> = (props) => 
  <AppText variant="screenTitle" {...props} />;

export const SectionTitle: React.FC<Omit<AppTextProps, 'variant'>> = (props) => 
  <AppText variant="sectionHeader" {...props} />;

export const CardTitle: React.FC<Omit<AppTextProps, 'variant'>> = (props) => 
  <AppText variant="cardTitle" {...props} />;

export const BodyText: React.FC<Omit<AppTextProps, 'variant'>> = (props) => 
  <AppText variant="body" {...props} />;

export const ButtonText: React.FC<Omit<AppTextProps, 'variant'>> = (props) => 
  <AppText variant="button" {...props} />;