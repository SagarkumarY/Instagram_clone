import React from "react";
import "./App.css";
// import { Button, ButtonGroup } from '@chakra-ui/react';
import { Navigate, Route, Routes } from "react-router-dom";
import HomePages from "./pages/Home/HomePages";
import Authpage from "./pages/AuthPage/Authpage";
import PageLayout from "./layouts/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { auth } from "./firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  // const authUser = userAuthStore((state) => state.user);
  const [authUser] = useAuthState(auth) 
  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePages /> : <Navigate to="/auth" />}
        />

        <Route
          path="/auth"
          element={!authUser ? <Authpage /> : <Navigate to="/" />}
        />

        {/* <Route
          path="/auth"
          element={<Authpage />}
        /> */}
        <Route path="/:username" element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
