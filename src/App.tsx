import { Authenticator, Flex } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Route, Routes } from 'react-router-dom';

import NavBar from "./components/NavBar";
import Home from './pages/Home';
import SecondPage from './pages/SecondPage';


function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
      <NavBar />
      <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/more" element={<SecondPage user={user}/>} />
        </Routes>
        <Flex alignSelf="center" padding="5em">
      <button onClick={signOut}>Sign out</button>
      </Flex>
      </main>
  )}
    </Authenticator>
  );
}

export default App;
