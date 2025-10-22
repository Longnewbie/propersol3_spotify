import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";

import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage";
import LyricsPage from "./layout/components/LyricsPage";
import FavoritesList from "./pages/favorite/FavoritesList";
import AboutPage from "./pages/others/AboutPage";
import CookiesPage from "./pages/others/CookiesPage";
import AdsPage from "./pages/others/AdsPage";
import LegalPage from "./pages/others/LegalPage";
import PrivacyPolicyPage from "./pages/others/PrivacyPolicyPage";
import SafetyPrivacyCenterPage from "./pages/others/SafetyPrivacyCenterPage";
import AccessibilityPage from "./pages/others/AccessibilityPage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="/favorites" element={<FavoritesList />} />
          <Route path="/:id/lyrics" element={<LyricsPage />} />

          <Route path="/*" element={<NotFoundPage />} />
        </Route>

        <Route path="/about" element={<AboutPage />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/privacy-center" element={<SafetyPrivacyCenterPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
