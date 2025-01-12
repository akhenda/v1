import { Link } from 'expo-router';
import { verifyInstallation } from 'nativewind';
import { SafeAreaView, Text, View } from 'react-native';

import { Button } from '@/design/ui-kit/components/ui/button';

import RickyScreen from './ricky';

function Home() {
  verifyInstallation();

  return (
    <SafeAreaView className="flex-1">
      <RickyScreen />
      <View className="items-center justify-center bg-secondary/30 pb-14">
        <Link href="/nx" asChild>
          <Button className="bg-secondary">
            <Text className="text-primary">Go to NX Start Page</Text>
          </Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}

export default Home;
