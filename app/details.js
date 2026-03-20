import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useLayoutEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native"
import axios from "axios"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from "../context/ThemeContext"

export default function Details() {
     const [metal, setMetal] = useState({})

     const [loading, setLoading] = useState(true)
     const [error, setError] = useState(false)
     
     const {theme, isDark, toggleTheme} = useTheme()

     const params = useLocalSearchParams()

     const router = useRouter()
     const navigation = useNavigation()

     useLayoutEffect(() => {
          navigation.setOptions({
               title: `${params.name} Details`,
               headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 4, marginLeft: 10 }}>
                         <Ionicons name="arrow-back" size={20} color={theme.text} />
                    </TouchableOpacity>
               ),
               headerRight: () => (
                    <TouchableOpacity onPress={toggleTheme} style={{marginRight: 16}}>
                         <Ionicons name={isDark ? 'sunny-outline': 'moon-outline'} size={22} color={theme.accent} />
                    </TouchableOpacity>
               ),
               headerStyle: { backgroundColor: theme.background },
               headerTintColor: theme.text,
               headerTitleStyle: { fontWeight: 'bold' }
          })
     }, [theme, isDark])

     const getName = (metal) => {
          switch (metal) {
               case 'Gold': return 'XAU'
               case 'Silver': return 'XAG'
               case 'Platinum': return 'XPT'
               case 'Palladium': return 'XPD'
          }
     }

     const API_KEY = process.env.EXPO_PUBLIC_API_KEY
     const codeName = getName(params.name)
     // console.log(API_KEY, codeName)

     const fetchMetalDetials = async () => {
          try {
               setLoading(true)
               setError(false)
               const response = await axios.get(`https://www.goldapi.io/api/${codeName}/INR`, {
                    headers: {
                         "x-access-token": API_KEY
                    }
               })
               if (response.status === 200) {
                    setMetal(response.data)
               }
          } catch (error) {
               console.log('something went wrong', error.message)
               setError(true)
          } finally {
               setLoading(false)
          }
     }

     useEffect(() => {
          fetchMetalDetials()
     }, [])

     const formattedTime = (time) => {
          if (!time) return 'N/A'
          return new Date(time * 1000).toLocaleString()
     }
     
     // Loading View 
     if(loading) {
          return (
               <View style={[styles.centered, {backgroundColor: theme.background}]}>
                    <ActivityIndicator size='large' color={theme.accent} />
                    <Text style={{ color: theme.label, fontSize: 14, marginTop: 8 }}>Fetching {params.name} Prices...</Text>
               </View>
          )
     }
     
     // Error handling View
     if(error) {
          return (
               <View style={[styles.centered, {backgroundColor: theme.background}]}>
                     <Ionicons name='cloud-offline-outline' size={64} color={theme.accent} />
                     <Text style={{ color: theme.text, fontSize: 20, fontWeight: '900', marginTop: 8 }}>Something went wrong</Text>
                     <Text style={{ color: theme.subtext, fontSize: 14 }}>Failed to fetch {params.name} data.</Text>
                     <TouchableOpacity style={[styles.retryButton, { backgroundColor: theme.accent }]} onPress={fetchMetalDetials}>
                         <Ionicons name='refresh' size={18} color={theme.background} />
                         <Text style={{ color: theme.background, fontWeight: 'bold', fontSize: 16 }} >Retry</Text>
                     </TouchableOpacity>
               </View>
          )
     }

     console.log(metal)
     return (
          <ScrollView style={{padding: 10, backgroundColor: theme.background}}>

               <Text style={[styles.title, { color:  theme.text}]}>{params.name}</Text>
               {/* <Text style={[styles.subtitle, { color: theme.subtext }]}>{metal.symbol} . {metal.exchange}</Text> */}
               
               {/* Current Price */}
               <Card title="Current Price" theme={theme}>
                    <Row label="Price" value={`₹${metal.price}`}  theme={theme}/>
                    <Row label="Asking Price" value={`₹${metal.ask}`} theme={theme} />
                    <Row label="Buyer Offering Price" value={`₹${metal.bid}`} theme={theme}/>
               </Card>
                
                {/* Today range */}
                <Card title="Today's Range" theme={theme}>
                    <Row label="Open Price" value={`₹${metal.open_price}`} theme={theme}/>
                    <Row label="High Price" value={`₹${metal.high_price}`} theme={theme} />
                    <Row label="Low Price" value={`₹${metal.low_price}`} theme={theme} />
               </Card>

               {/* Changes in prices */}
               <Card title="Change" theme={theme}>
                    <Row label="Previous Close" value={`₹${metal.prev_close_price}`} theme={theme} />
                    <Row label="Change in Rupee" value={`₹${metal.ch}`} isChange theme={theme} />
                    <Row label="Change in percentage" value={`₹${metal.chp}%`} isChange theme={theme} />
               </Card>
               
               {/* Price per gram */}
               <Card title="Price Per Gram" theme={theme}>
                    <Row label="24k" value={`₹${metal.price_gram_24k}`} theme={theme} />
                    <Row label="22k" value={`₹${metal.price_gram_22k}`}  theme={theme}/>
                    <Row label="21k" value={`₹${metal.price_gram_21k}`} theme={theme} />
                    <Row label="20k" value={`₹${metal.price_gram_20k}`} theme={theme}/>
                    <Row label="18k" value={`₹${metal.price_gram_18k}`} theme={theme}/>
                    <Row label="16k" value={`₹${metal.price_gram_16k}`} theme={theme}/>
                    <Row label="14k" value={`₹${metal.price_gram_14k}`} theme={theme}/>
                    <Row label="10k" value={`₹${metal.price_gram_10k}`} theme={theme}/>
               </Card>
               
               {/*  */}
               <Card title="Meta" theme={theme}>
                    <Row label="Market Open" value={formattedTime(metal.open_time)} theme={theme}/>
                    <Row label="Last Updated" value={formattedTime(metal.timestamp)} theme={theme}/>
                    <Row label="Currency" value={`₹${metal.currency}`} theme={theme}/>
                    <Row label="Exchange" value={`₹${metal.exchange}`} theme={theme}/>
               </Card>

          </ScrollView>
     )
}

function Card({title, theme, children}){
     return (
          <View style={[styles.card, {backgroundColor: theme.card}]}>
               <Text style={[styles.cardTitle, {color: theme.accent}]}>{title}</Text>
               {children}
          </View>
     )
}

function Row({ label, value, isChange, theme }) {
     const isPositive = isChange && parseFloat(value) >= 0
     return (
          <View style={[styles.row, {borderBottomColor: theme.border}]}>
               <Text style={[styles.label, {color: theme.label}]}>{label}</Text>
               <Text style={[styles.value, { color: theme.value }, isChange && { color: isPositive ? '#4cd964' : '#ff3b30' }]} >{value ?? 'N/A'}</Text>
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
     },
     title: {
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 4
     },
     subtitle: {
          fontSize: 13,
          marginBottom: 16
     },
     card: {
          borderRadius: 12,
          padding: 16,
          marginBottom: 16
     },
     cardTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 10
     },
     row: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 6,
          borderBottomWidth: 0.5,
     },
     label: {
          fontSize: 14
     },
     value: {
          fontSize: 14,
          fontWeight: '500'
     }
})