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
import { Vaccine, VaccineToRegister } from '../../utils/types';

function ShowAll() {
  const data: Vaccine[] = [
    {
      vid: '1',
      pid: '1',
      name: 'vaccine 1',
      img: 'https://firebasestorage.googleapis.com/v0/b/my-pet-vaccines.appspot.com/o/Pets%2F1710624175064?alt=media&token=e3935f4c-d7a3-4448-b6fa-13b3a66087a8',
      startAt: '2024-10-02',
      endAt: '2025-10-02'
    },
    {
      vid: '2',
      pid: '2',
      name: 'vaccine 2',
      img: 'https://firebasestorage.googleapis.com/v0/b/my-pet-vaccines.appspot.com/o/Pets%2F1710624175064?alt=media&token=e3935f4c-d7a3-4448-b6fa-13b3a66087a8',
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
          keyExtractor={item => item?.vid}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          horizontal={false}
        />}
      </View>
    </SafeAreaView>
  )
}

export default ShowAll