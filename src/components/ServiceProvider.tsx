import { AuthProvider } from '../services/auth';
import { FriendsV1Provider } from '../services/friend_v1';
import { UsersV1Provider } from '../services/users_v1';

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
