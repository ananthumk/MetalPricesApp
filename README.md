# MetalPricesApp

A React Native application built with Expo that displays live prices of precious metals — Gold, Silver, Platinum, and Palladium — mimicking a real-world financial product experience.

---

## Screenshots

| Landing Screen | Details Screen |
|---|---|
| Live metal prices with individual loaders | Full price breakdown with per gram rates |

---

## Features

-  **Live Metal Prices** — Gold, Silver, Platinum, Palladium fetched from GoldAPI
-  **Individual Loaders** — Each metal card loads independently with its own spinner
-  **Error Handling** — Per-card error state with individual Retry buttons
-  **Details Screen** — Full price breakdown including bid/ask, high/low, per gram prices (24K–10K)
-  **Indian Market Prices** — MCX, IBJA, and LBMA gold rates (Gold only)
-  **Dark / Light Theme** — Toggle between themes using sun/moon icon in the header
-  **Back Navigation** — Custom back arrow on the Details screen header

---

##  Project Structure

```
MetalPricesApp/
├── app/
│   ├── _layout.js          # Root layout with ThemeProvider and Stack navigator
│   ├── index.js            # Landing screen — metal price cards
│   └── details.js          # Details screen — full metal price breakdown
├── components/
│   └── card.js             # MetalCard component with loading/error/success states
├── context/
│   └── ThemeContext.js     # Light/Dark theme context using Context API
├── assets/                 # App icons and images
├── .env                    # Environment variables (API key)
└── app.json                # Expo configuration
```

---

##  Tech Stack

| Technology | Purpose |
|---|---|
| React Native (Expo) | Cross-platform mobile framework |
| Expo Router | File-based navigation |
| React Navigation | Stack navigator & header customization |
| Axios | HTTP requests |
| Context API | Global theme state management |
| @expo/vector-icons | Ionicons for UI icons |
| react-native-config | Environment variable management |

---

##  Getting Started

### Prerequisites

- Node.js v18+
- Expo CLI
- Expo Go app on your phone (for testing)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/ananthumk/MetalPricesApp.git
cd MetalPricesApp
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create a `.env` file in the project root:**
```
EXPO_PUBLIC_API_KEY="your_goldapi_key_here"
```

4. **Start the development server:**
```bash
npx expo start --clear
```


##  Environment Variables

| Variable | Description |
|---|---|
| `EXPO_PUBLIC_API_KEY` | Your GoldAPI.io access token |

> Always wrap your API key in quotes in the `.env` file to avoid parsing issues.

---

## API Reference

This app uses **[GoldAPI.io](https://www.goldapi.io)** to fetch live metal prices.

**Endpoint:**
```
GET https://www.goldapi.io/api/{metal}/INR
```

**Supported metals:**

| Metal | Code |
|---|---|
| Gold | XAU |
| Silver | XAG |
| Platinum | XPT |
| Palladium | XPD |

**Response fields used:**

| Field | Description |
|---|---|
| `price` | Current market price in INR |
| `ask` | Seller's asking price |
| `bid` | Buyer's offering price |
| `high_price` | Today's highest price |
| `low_price` | Today's lowest price |
| `open_price` | Market open price |
| `prev_close_price` | Previous day's closing price |
| `ch` | Price change in INR |
| `chp` | Price change in percentage |
| `price_gram_24k` | Price per gram — 24K gold |
| `price_gram_22k` | Price per gram — 22K gold |
| `timestamp` | Last updated Unix timestamp |

---

##  Screens

### Landing Screen (`index.js`)
- Displays four metal cards — Gold, Silver, Platinum, Palladium
- Each card fetches data **independently** with its own loading spinner
- Shows metal name, current INR price, and last updated timestamp
- On error, shows a per-card **Retry** button
- Header includes a **sun/moon toggle** for dark/light theme

### Details Screen (`details.js`)
- Triggered by tapping any metal card
- Shows full price breakdown:
  - **Current Price** — price, ask, bid
  - **Today's Range** — open, high, low
  - **Change** — previous close, change in INR, change in %
  - **Price Per Gram** — 24K to 10K
  - **🇮🇳 Indian Market Prices** — MCX, IBJA, LBMA (Gold only)
  - **Meta** — market open time, last updated, currency, exchange
- Shows full-screen loader while fetching
- Shows full-screen error with **Retry** button on failure
- Header includes **back arrow** and **theme toggle**

---

## Theme System

The app uses **React Context API** for global theme management.

```javascript
// Access theme anywhere in the app
const { theme, isDark, toggleTheme } = useTheme()
```

**Light Theme colors:**

| Token | Color |
|---|---|
| background | `#F5F5F5` |
| card | `#E5E4E2` |
| accent | `#674C47` |
| text | `#2A3439` |

**Dark Theme colors:**

| Token | Color |
|---|---|
| background | `#121212` |
| card | `#1e1e1e` |
| accent | `#FFD700` |
| text | `#ffffff` |

---

## Deployment

### Web (Vercel)
```bash
npx expo export -p web

```

### Android APK (EAS Build)
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

### Quick Share (Expo Go)
```bash
npx expo start

```

