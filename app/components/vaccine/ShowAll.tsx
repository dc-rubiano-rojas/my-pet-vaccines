import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList
} from 'react-native';
import styles from './Vaccine.style';
import { COLORS, SIZES } from '../../constants';
import VaccineCard from './VaccineCard';
import { startAt } from 'firebase/firestore';

function ShowAll() {
  const data = [
    {
      id: '1',
      name: 'vaccine 1',
      img: '',
      startAt: '2024-10-02',
      endAt: '2025-10-02'
    },
    {
      id: '2',
      name: 'vaccine 2',
      img: '',
      startAt: '2024-10-02',
      endAt: '2025-10-02'
    },  
  ]
  const [isLoading, setLoading] = useState(false)
  return (
    <SafeAreaView style={styles.containerShowAll}>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.secondary} />
        ) : <FlatList
          style={styles.flatListContainer}
          data={data}
          renderItem={({ item }) => (
            <VaccineCard
              item={item}
            />
          )}
          keyExtractor={item => item?.id}
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />}
      </View>
    </SafeAreaView>
  )
}

export default ShowAll