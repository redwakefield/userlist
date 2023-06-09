import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import { UserList } from './pages/User/UserList';

export default function App() {

  return (
    <Provider store={store}>
      <UserList />
    </Provider>
  )
};
