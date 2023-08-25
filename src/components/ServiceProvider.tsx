import { AuthProvider } from './';
import { FriendsV1Provider, UsersV1Provider } from '../services';

const ServiceProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <UsersV1Provider>
        <FriendsV1Provider>{children}</FriendsV1Provider>
      </UsersV1Provider>
    </AuthProvider>
  );
};

export default ServiceProvider;
