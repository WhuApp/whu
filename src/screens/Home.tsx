import React from 'react';
import { FriendList } from '../components';
import { MainLayout } from '../layouts';

const Home: React.FC = () => {
  return (
    <MainLayout>
      <FriendList />
    </MainLayout>
  );
};

export default Home;
