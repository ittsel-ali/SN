import React from 'react';

const Profile = React.lazy(() => import('./components/users/Profile'));
const Home = React.lazy(() => import('./components/Home'));
const FriendProfile = React.lazy(() => import('./components/friends/FriendProfile'));


export const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },  // to be updated
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/friend/:id', name: 'Friend', component: FriendProfile },
];

