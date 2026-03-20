
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";

function SkeletonCard(){
    const {theme} = useTheme()
    const shimmer = useRef(new Animated.Value(0)).current
    
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true}),
                Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true})
            ])
        ).start()
    }, [])

    const opacity = shimmer.interpolate({
        inputRange: [0, 1],
        outputRange: [0.25, 0.7]
    })
    
    const SkeletonLine = ({width, height = 12}) => (
        <Animated.View style={{
            width, 
            height,
            borderRadius: 6, 
            backgroundColor: theme.subtext,
            opacity
        }} />
    )

    return (
        <View style={[styles.card, {backgroundColor: theme.card}]}>
            <View style={styles.cardTop}>
                <View style={{ flex: 1, gap: 10 }}>
                    <SkeletonLine width="35%" height={14} />
                    <SkeletonLine width="55%" height={20} />
                </View>
                <SkeletonLine width="20%" height={10} />
            </View>
            <View style={[styles.divider, { backgroundColor: theme.subtext, opacity: 0.2 }]} />
            <SkeletonLine width="45%" height={10} />
        </View>
    )
}

export default function MetalCard({ item, onPress, onRetry }) {
    const { theme } = useTheme()

    if (item.loading) {
        return <SkeletonCard />
    }

    if (item.error) {
        return (
            <View style={[styles.card, { backgroundColor: theme.card }]}>
                <Ionicons name='cloud-offline-outline' size={64} color={theme.accent} />
                <Text style={{ color: theme.text, fontSize: 20, fontWeight: '900', marginTop: 8 }}>Something went wrong</Text>
                <Text style={{ color: theme.subtext, fontSize: 14 }}>Failed to fetch Metals data.</Text>
                <TouchableOpacity style={[styles.retryButton, { backgroundColor: theme.accent }]} onPress={onRetry}>
                    <Ionicons name='refresh' size={18} color={theme.background} />
                    <Text style={{ color: theme.background, fontWeight: 'bold', fontSize: 16 }} >Retry</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: theme.card }]} onPress={onPress} activeOpacity={0.85}>
            <View style={styles.cardTop}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
                    <Text style={[styles.price, { color: theme.accent }]}>
                        {Number(item.price).toLocaleString('en-IN')}
                    </Text>
                </View>
                <Ionicons name='chevron-forward' size={18} color={theme.subtext} />
            </View>
            <View style={[styles.divider, { backgroundColor: theme.subtext }]} />
            <View style={styles.cardBottom}>
                <Ionicons name='time-outline' size={12} color={theme.subtext} />
                <Text style={[styles.time, { color: theme.subtext }]}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 12,
        borderRadius: 14,
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    divider: {
        height: 0.5,
        marginVertical: 10,
        opacity: 0.2
    },
    cardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    time: {
        fontSize: 11,
    }
})