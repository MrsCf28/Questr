import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native' 

interface tabProp {
    selectedTab: string
}

export function HistoryScreen({selectedTab}:tabProp) {

    return (
        <View style={[styles.container, selectedTab === 'history'? null: styles.hidden]}>
            <Text>History Card</Text>
            <Text>History Card</Text>
            <Text>History Card</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 4,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    hidden: {
        display: 'none'
    }
  });