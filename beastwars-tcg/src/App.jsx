import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DeckProvider } from './context/DeckContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { DeckBuilder } from './pages/DeckBuilder';
import { Battle } from './pages/Battle';
import { routerBasename } from './utils/assets';

export default function App() {
  return (
    <DeckProvider>
      <BrowserRouter basename={routerBasename()}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="collection" element={<Collection />} />
            <Route path="deck" element={<DeckBuilder />} />
            <Route path="battle" element={<Battle />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DeckProvider>
  );
}
