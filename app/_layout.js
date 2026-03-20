
import { Stack } from 'expo-router'
import { ThemeProvider, useTheme } from '../context/ThemeContext'

function RootLayout() {
    const theme = useTheme()
    return (
        <Stack 
          screenOptions={{
            headerStyle: {backgroundColor: theme.background},
            headerTintColor: theme.text,
            headerTitleStyle: {fontWeight: 'bold'},
            contentStyle: { backgroundColor: theme.background}
          }}
        >
            <Stack.Screen name="index" options={{ title: 'Metal Prices' }} />
            <Stack.Screen name="details" options={{ title: 'Metal Price Details' }} />
        </Stack>
    )
}

export default function layout() {
    return(
        <ThemeProvider>
            <RootLayout />
        </ThemeProvider>
    )
}

