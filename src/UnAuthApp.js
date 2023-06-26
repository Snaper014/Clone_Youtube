import * as React from 'react';
import { Home } from './Composants/Home';
import { Abonner } from './Composants/Abonnements';
import { Biblio } from './Composants/Bibliotheque';
import { Trend } from './Composants/Tendances';
import { Zik } from './Composants/Musique';
import { Videos } from './Composants/Videos';
import { ShorterCAC40 } from './Composants/Shorts';
import { History } from './Composants/Historique';
import { Games } from './Composants/VideosGames';
import { Sport } from './Composants/Sport';
import { Erreur } from './Composants/Error404';
import { Search } from './Composants/Recherche';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './Composants/FallbackError';
import { Actualites } from './Composants/Actus';
import { Knoweldge } from './Composants/Culture';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Mode } from './Composants/Mode';

function UnAuthApp() {

  return(
    <BrowserRouter>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/abonnements" element={<Abonner />} />
      <Route path="/Bibliothéque" element={<Biblio />} />
      <Route path="/Historique" element={<History />} />
      <Route path="/Recherche/:userSearch" element={<Search />} />
      <Route path="/watch/:id" element={<Videos />} />
      <Route path="/tendances" element={<Trend />} />
      <Route path="/Shorts" element={<ShorterCAC40 />} />
      <Route path="/musique" element={<Zik />} />
      <Route path="/Videosgames" element={<Games />} />
      <Route path="/Actus" element={<Actualites />} />
      <Route path="/Sport" element={<Sport />} />
      <Route path="/Culture" element={<Knoweldge />} />
      <Route path="/Mode" element={<Mode />} />
      <Route path="*" element={<Erreur />}></Route>
    </Routes>
    </ErrorBoundary>
  </BrowserRouter>

)}

export {UnAuthApp}