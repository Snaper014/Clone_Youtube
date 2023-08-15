import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./Composants/FallbackError";
import { DataProvider } from "./Context/ContextProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Composants/Home";
import { Abonner } from "./Composants/Abonnements";
import { Biblio } from "./Composants/Bibliotheque";
import { Trend } from "./Composants/Tendances";
import { Zik } from "./Composants/Musique";
import { Videos } from "./Composants/Videos";
import { ShorterCAC40, ShorterSBF30 } from "./Composants/Shorts";
import { History } from "./Composants/Historique";
import { Games } from "./Composants/VideosGames";
import { Sport } from "./Composants/Sport";
import { Erreur } from "./Composants/Error404";
import { Search } from "./Composants/Recherche";
import { Actualites } from "./Composants/Actus";
import { Knoweldge } from "./Composants/Culture";
import { Playlist } from "./Composants/Playlist";
import { Mode } from "./Composants/Mode";
import { PageYoutubeur } from "./Composants/Channel/PageChannel";

function UnAuthApp() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/abonnements" element={<Abonner />} />
            <Route path="/Bibliothéque" element={<Biblio />} />
            <Route path="/Historique" element={<History />} />
            <Route path="/Recherche/:search" element={<Search />} />
            <Route path="/watch/:id" element={<Videos />} />
            <Route path="/tendances" element={<Trend />} />
            <Route path="/Shorts" element={<ShorterCAC40 />} />
            <Route
              path="/List/Shorts/:IndexShorts"
              element={<ShorterSBF30 />}
            />
            <Route path="/musique" element={<Zik />} />
            <Route path="/Videosgames" element={<Games />} />
            <Route path="/Actus" element={<Actualites />} />
            <Route path="/Sport" element={<Sport />} />
            <Route
              path="/Playlist/:videoPL/:index/:Identifiant"
              element={<Playlist />}
            />
            <Route path="/Culture" element={<Knoweldge />} />
            <Route path="/Mode" element={<Mode />} />
            <Route path="/Channel/:chaId" element={<PageYoutubeur />} />
            <Route path="*" element={<Erreur />}></Route>
          </Routes>
        </DataProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export { UnAuthApp };
