import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'

interface tabProp {
    selectedTab: string
}

export function StatsScreen({selectedTab}:tabProp) {

    return (
        <View style={[styles.container, selectedTab === 'stats'? null : styles.hidden]}>
            <View>
                <Text>I am a Graph</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 100,
        margin: 10,
    },
    hidden: {
        display: 'none'
    }
  });