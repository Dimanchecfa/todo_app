
import AsyncStorage from '@react-native-async-storage/async-storage';
import DissmissKeyBoard from './src/components/KeyBoardDismiss';
import StackNavigation from './src/navigation/StackNavigation'
import { AppProvider } from './src/utilities/context/app.context'
import useApp from './src/utilities/hook/useApp'

export default function App() {
  const app = useApp();

  return (
    <DissmissKeyBoard>
      <AppProvider>
      <StackNavigation />
    </AppProvider>
    </DissmissKeyBoard>
    
  )
}
