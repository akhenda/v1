import { Link, Stack } from 'expo-router';
import { verifyInstallation } from 'nativewind';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { Button } from '../design/ui-kit/components/ui/button';

import RickyScreen from './ricky';

function Home() {
  verifyInstallation();

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <SafeAreaView className="flex-1">
        <RickyScreen />
        <View className="items-center justify-center bg-secondary/30 pb-14">
          <Link href="/planets" asChild>
            <Button className="bg-secondary">
              <Text className="text-primary">Go to Start Page</Text>
            </Button>
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Home;
