import { store } from './redux/store'
import { Provider } from 'react-redux';
import CustomLayout from "./containers/Layout/Layout";

function App() {
  return (
    <Provider store={store}>
      <CustomLayout />
    </Provider>
  );
}

export default App;
