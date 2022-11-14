import React, {useState} from 'react'
import { View, Pressable, StyleSheet, Text } from 'react-native' 
import { StatsScreen } from './StatsScreen';
import { HistoryScreen } from './HistoryScreen';
import { TabHolder } from './TabHolder';

export function ProfileData() {

    const [selectedTab, setSelectedTab] = useState<string>('stats')

    return (
        <View style={styles.container}>
            <TabHolder setSelectedTab={setSelectedTab}/>
            <StatsScreen selectedTab={selectedTab}/>
            <HistoryScreen selectedTab={selectedTab} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 6,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  });
  