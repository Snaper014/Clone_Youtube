import * as React from 'react';
import { Home } from './Composants/Home';
import { Abonner } from './Composants/Abonnements';
import { Biblio } from './Composants/Bibliotheque';
import { Videos } from './Composants/Videos';
import { History } from './Composants/Historique';
import { Erreur } from './Composants/Error';
import { Search } from './Composants/Recherche';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './Composants/FallbackError';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function UnAuthApp() {
    //utilsation de use Context quand l'appliacation sera compléte
    const [sprint, setSprint] = React.useState()
    const Onchange = (valeur) => setSprint(valeur)
    
  return(
    
    <BrowserRouter>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Routes>
      <Route path="/" element={<Home Changement={Onchange}/>} />
      <Route path="/abonnements" element={<Abonner Changement={Onchange}/>} />
      <Route path="/Bibliothéque" element={<Biblio Changement={Onchange}/>} />
      <Route path="/Historique" element={<History Changement={Onchange}/>} />
      <Route path="/Recherche/:query" element={<Search ValeurChamps={sprint}/>} />
      <Route path="/watch/:id" element={<Videos Changement={Onchange}/>} />
      <Route path="*" element={<Erreur />}></Route>
    </Routes>
    </ErrorBoundary>
  </BrowserRouter>

)}

export {UnAuthApp}