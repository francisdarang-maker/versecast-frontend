// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import HomePage from "./pages/HomePage";
import SongsPage from "./pages/SongsPage";
import BiblePage from "./pages/BiblePage";
import SettingsPage from "./pages/SettingsPage";
import ProjectorPreview from "./components/ProjectorPreview";
import { ProjectQueueProvider } from "./context/ProjectQueueContext";

function App() {
  return (
    <ProjectQueueProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projector" element={<ProjectorPreview />} />
            <Route path="/songs" element={<SongsPage />} />
            <Route path="/bible" element={<BiblePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ProjectQueueProvider>
  );
}

export default App;
