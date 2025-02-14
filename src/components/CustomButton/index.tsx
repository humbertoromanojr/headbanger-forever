import React from 'react';
import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    ActivityIndicator,
    StyleSheet,
  } from 'react-native';

  type ButtonProps = TouchableOpacityProps & {
    title: string;
    isLoading?: boolean;
  };

  export function CustomButton({ title, isLoading = false, ...rest }: ButtonProps) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={isLoading}
        style={styles.button}
        {...rest}
      >
        {isLoading ? (
          <ActivityIndicator style={styles.myLoading} />
        ) : (
          <Text style={styles.title}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {color: '#fff', fontSize: 16, textTransform: 'uppercase'},
    button:{width: '70%', marginTop: 25, backgroundColor: '#f20905', justifyContent: 'center', alignItems: 'center', borderRadius: 22, padding: 10, fontWeight: 'bold',
    },
    myLoading:{color: '#fff '},
});
