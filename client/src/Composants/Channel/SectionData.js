import { ChannelHome } from "./Accueil";
import { AllVideos } from "./AllVideosChannel";
import { AllShortsChannel } from "./ShortsChannel";
import { StreamLive } from "./LiveStreams";
import { PlaylistChannel } from "./ChannelPlaylist";
import { Subscriptions } from "./Subscriptions";
import { Liens } from "./About";

export const SectionChannel = [
  { button: "Accueil", contenu: <ChannelHome /> },
  { button: "Vidéos", contenu: <AllVideos /> },
  { button: "Shorts", contenu: <AllShortsChannel /> },
  { button: "En direct", contenu: <StreamLive /> },
  { button: "Playlists", contenu: <PlaylistChannel /> },
  { button: "Chaînes", contenu: <Subscriptions /> },
  { button: "À propos", contenu: <Liens /> },
];
