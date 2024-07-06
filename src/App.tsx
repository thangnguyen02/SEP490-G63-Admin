import { Provider } from 'react-redux'
import { store } from './redux/Store.tsx'
import AuthProvider from './context/authProvider.tsx'
import Routes from './routers/index.tsx'
import 'react-datepicker/dist/react-datepicker.css'
function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Provider>
  )
}

export default App
