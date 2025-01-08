# Universal

This package holds all the shared universal UI modules

## Setup

Do the following steps for all the apps that use this package.

### Nativewind Setup

- [Nativewind Expo Router Setup](https://www.nativewind.dev/v4/getting-started/expo-router)

#### 1. Install NativeWind

Nativewind, Tailwind & RN Animated are already installed for you.

#### 2. Setup Tailwind CSS

Create a `tailwind.config.js` file at the root of your expo app. Then, extend the base `tailwind.config.ts` file from this package.

```js
const { buildConfig } = require('@v1/universal/design/ui-kit/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = buildConfig(__dirname);
```

#### 3. Add the Babel preset

Modify your `babel.config.js`

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
  };
};
```

#### 4. Modify your metro.config.js

If your project does not have a `metro.config.js` run `npx expo customize metro.config.js`

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
  input: '@v1/universal/design/ui-kit/global.css',
});
```

#### 5. Import your CSS file or use the provided `root-layout.tsx` component

```js
// app/_layout.js
import '@v1/universal/design/ui-kit/global.css';

import { Slot } from 'expo-router';

export default Slot;
```

##### OR

```js
// app/_layout.js
import '@v1/universal/design/ui-kit/global.css';

import RootLayout from '@v1/universal/design/ui-kit/root-layout';

export default RootLayout;
```

#### 6. Configure Typescript for your App

NativeWind extends the React Native types via declaration merging. The simplest method to include the types is to create a new nativewind-env.d.ts file and add a triple-slash directive referencing the types.

```ts
/// <reference types="nativewind/types" />
```

> ⚠️ CAUTION
>
> Do not call this file:
>
> - `nativewind.d.ts`
> - The same name as a file or folder in the same directory e.g app.d.ts when an /app folder exists
> - The same name as a folder in node_modules, e.g react.d.ts
>
> By doing so, your types will not be picked up by the TypeScript compiler.

#### 7. Thats it 🎉

Start writing code!

```diff
import { StatusBar } from 'expo-status-bar';
import React from 'react';
- import { StyleSheet, Text, View } from 'react-native';
+ import { Text, View } from 'react-native';

export default function App() {
  return (
-   <View style={styles.container}>
+   <View className="flex-1 items-center justify-center bg-white">
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

- const styles = StyleSheet.create({
-   container: {
-     flex: 1,
-     backgroundColor: '#fff',
-     alignItems: 'center',
-     justifyContent: 'center',
-   },
- });
```
