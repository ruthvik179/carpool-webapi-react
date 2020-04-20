import React from 'react';

const UserContext = React.createContext('John')
const UserProvider = UserContext.Provider
const UserConsumer = UserContext.Consumer

export default {UserConsumer ,UserProvider}