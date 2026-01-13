import React from 'react';
import { HashRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import PostDetail from './pages/PostDetail';
import RegistrationPage from './pages/Registration';
import NewsPage from './pages/News';
import TermsPrivacyPage from './pages/TermsPrivacy';
import AdminPostPage from './pages/AdminPost';
import { ModalProvider } from './components/RegistrationModal';

function ScrollToTop() {
  const [hash, setHash] = React.useState('');

  React.useEffect(() => {
    // Listen for hash changes
    const handleHashChange = () => {
      const currentHash = window.location.hash;
      setHash(currentHash);
    };

    handleHashChange(); // Initial check
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  React.useEffect(() => {
    // Extract the section ID from hash (e.g., "#/#about" -> "about")
    const match = hash.match(/#\/(#.+)/);
    const sectionId = match ? match[1].substring(1) : null;

    if (sectionId) {
      // Wait a bit for page to load/navigate
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (hash && !hash.includes('/#')) {
      // Regular route change, scroll to top immediately
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [hash]);

  return null;
}

const App = () => {
  return (
    <ModalProvider>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<RegistrationPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/terms-privacy" element={<TermsPrivacyPage />} />
            <Route path="/admin/post" element={<AdminPostPage />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ModalProvider>
  );
};

export default App;