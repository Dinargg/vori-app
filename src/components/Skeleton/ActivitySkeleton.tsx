import React from 'react';
import { View, StyleSheet } from 'react-native';
import Skeleton from './Skeleton';

const ActivitySkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <Skeleton width="100%" height={200} borderRadius={12} />
      <View style={styles.content}>
        <Skeleton width="80%" height={20} style={styles.title} />
        <Skeleton width="60%" height={16} style={styles.subtitle} />
        <View style={styles.meta}>
          <Skeleton width="40%" height={14} />
          <Skeleton width="30%" height={14} />
        </View>
        <View style={styles.footer}>
          <Skeleton width="20%" height={16} />
          <Skeleton width="25%" height={32} borderRadius={8} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 12,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ActivitySkeleton;