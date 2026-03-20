import { View, Text, FlatList, TouchableOpacity, Switch, ActivityIndicator, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import MetalCard from '../components/card';
import { use, useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios'
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



const metals = ["XAU", "XAG", "XPT", "XPD"]
const metalsName = ['Gold', 'Silver', 'Platinum', 'Palladium']

export default function Home() {
    const [metalsData, setMetalsData] = useState([
        { name: 'Gold', price: null, time: null, loading: true, error: false},
        { name: 'Silver', price: null, time: null, loading: true, error: false},
        { name: 'Platinum', price: null, time: null, loading: true, error: false},
        { name: 'Palladium', price: null, time: null, loading: true, error: false},
    ])
    const router = useRouter()

    const { isDark, theme, toggleTheme } = useTheme()
    const navigation = useNavigation()

    useLayoutEffect(() => {
         navigation.setOptions({
            headerStyle: {backgroundColor: theme.background},
            headerTintColor: theme.text,
            headerRight: () => (
                <TouchableOpacity onPress={toggleTheme} style={{marginRight: 16}}>
                    <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={22} color={theme.accent} />
                </TouchableOpacity>
            )
         })
    }, [isDark, theme])

    const API_KEY = process.env.EXPO_PUBLIC_API_KEY
    console.log(API_KEY)

    const fetchMetals = async (metal, idx) => {
        try {
            
            setMetalsData(prev => {
                const updated = [...prev]
                updated[idx] = {...updated[idx], loading: true, error: false}
                return updated
            })

            const res = await axios.get(`https://www.goldapi.io/api/${metal}/INR`, {
                headers: {
                    "x-access-token": API_KEY
                }
            })

            setMetalsData(prev => {
                const updated = [...prev]
                updated[idx] = {
                    name: metalsName[idx],
                    price: res.data.price,
                    time: new Date(res.data.timestamp * 1000).toLocaleString(),
                    loading: false,
                    error: false
                }
                return updated
            })
        } catch (error) {
            console.log(`Error on ${metal}: `, error.message);
            setMetalsData(prev => {
                const updated = [...prev]
                updated[idx] = {...updated[idx], loading: false, error: true}
                return updated
            })
        } 
    };

    useEffect(() => {
        metals.forEach((metal, idx) => fetchMetals(metal, idx))
        
    }, [])

    console.log(metalsData)


    return (
        <View style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}>
            <FlatList
                data={metalsData}
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }) => (
                    <MetalCard item={item} onPress={() => router.push({
                        pathname: '/details',
                        params: {name: item.name}
                    })} 
                    onRetry={() => fetchMetals(metals[index], index)}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10
     },
     retryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8, 
        marginTop: 8
     }
})