import { Route, Routes } from "react-router-dom";
import React from "react";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import { Toaster } from "react-hot-toast";

const HomePage = React.lazy(() => import("./pages/home/HomePage"));
const AuthCallbackPage = React.lazy(
  () => import("./pages/auth-callback/AuthCallbackPage")
);
const AdminPage = React.lazy(() => import("./pages/admin/AdminPage"));
const ChatPage = React.lazy(() => import("./pages/chat/ChatPage"));
const AlbumPage = React.lazy(() => import("./pages/album/AlbumPage"));
const FavoritesList = React.lazy(
  () => import("./pages/favorite/FavoritesList")
);
const LyricsPage = React.lazy(() => import("./layout/components/LyricsPage"));
const AboutPage = React.lazy(() => import("./pages/others/AboutPage"));
const CookiesPage = React.lazy(() => import("./pages/others/CookiesPage"));
const AdsPage = React.lazy(() => import("./pages/others/AdsPage"));
const LegalPage = React.lazy(() => import("./pages/others/LegalPage"));
const PrivacyPolicyPage = React.lazy(
  () => import("./pages/others/PrivacyPolicyPage")
);
const SafetyPrivacyCenterPage = React.lazy(
  () => import("./pages/others/SafetyPrivacyCenterPage")
);
const AccessibilityPage = React.lazy(
  () => import("./pages/others/AccessibilityPage")
);
const NotFoundPage = React.lazy(() => import("./pages/404/NotFoundPage"));

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
        </Route>

        <Route path="/about" element={<AboutPage />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/privacy-center" element={<SafetyPrivacyCenterPage />} />

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
