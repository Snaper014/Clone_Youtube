import * as React from "react";
import { ContentSectionMenu } from "./Elements/MenuContent";
import { GoHistory } from "react-icons/go";

function History() {
  return (
    <ContentSectionMenu
      Logo={<GoHistory fontSize={120} />}
      title="Effectuez le suivi des vidéos que vous visionnez"
      paragraphe="Impossible d'afficher l'historique des vidéos regardées lorsque vous n'êtes pas connecté."
    />
  );
}
export { History };
