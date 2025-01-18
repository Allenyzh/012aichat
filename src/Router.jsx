import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import ChatPageLayout from './pages/ChatPageLayout';
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="012aichat">
          <Route index element={<Home />} />
          <Route path="chat" element={<ChatPageLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
