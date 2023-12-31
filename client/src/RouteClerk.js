import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./Composants/FallbackError";
import { DataProvider } from "./Context/ContextProvider";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Composants/Home";
import { Abonner } from "./Composants/Subscriptions";
import { Biblio } from "./Composants/Library";
import { Trend } from "./Composants/Trends";
import { Music } from "./Composants/Musics";
import { Videos } from "./Composants/Videos";
import { ShortsElements, ShortsHome } from "./Composants/Shorts";
import { History } from "./Composants/Historical";
import { Games } from "./Composants/VideosGames";
import { Sport } from "./Composants/Sport";
import { Erreur } from "./Composants/Error404";
import { Search } from "./Composants/Searchs";
import { Actualites } from "./Composants/News";
import { Knoweldge } from "./Composants/Culture";
import { Playlist } from "./Composants/Playlist";
import { Mode } from "./Composants/Mode";
import { PageYoutubeur } from "./Composants/Channel/PageChannel";
import { Auth } from "./auth/auth";
import { DetailsPlaylist } from "./Composants/DetailsPlaylist";

function ClerkProviderWithRoutes() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/abonnements" element={<Abonner />} />
          <Route path="/Bibliothéque" element={<Biblio />} />
          <Route path="/Historique" element={<History />} />
          <Route path="/Recherche/:search" element={<Search />} />
          <Route path="/watch/:id" element={<Videos />} />
          <Route path="/tendances" element={<Trend />} />
          <Route path="/Shorts" element={<ShortsHome />} />
          <Route
            path="/List/Shorts/:IndexShorts"
            element={<ShortsElements />}
          />
          <Route path="/musique" element={<Music />} />
          <Route path="/Videosgames" element={<Games />} />
          <Route path="/Actus" element={<Actualites />} />
          <Route path="/Sport" element={<Sport />} />
          <Route
            path="/Playlist/:videoPL/:index/:Identifiant"
            element={<Playlist />}
          />
          <Route path="/plyst/:id" element={<DetailsPlaylist />} />
          <Route path="/Culture" element={<Knoweldge />} />
          <Route path="/Mode" element={<Mode />} />
          <Route path="/Channel/:chaId" element={<PageYoutubeur />} />
          <Route path="*" element={<Erreur />}></Route>
        </Routes>
      </DataProvider>
    </ErrorBoundary>
  );
}

export { ClerkProviderWithRoutes };
