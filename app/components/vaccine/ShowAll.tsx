import React from 'react'
import { View, Text, Button, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import styles from './Vaccine.style';

function ShowAll() {
  return (
    <SafeAreaView style={styles.containerShowAll}>
      <ScrollView >
        <Text>ShowAll</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ShowAll