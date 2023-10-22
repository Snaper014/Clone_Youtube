import * as React from "react";
import { ContentSectionMenu } from "./Elements/MenuContent";
import { BsCollectionPlay } from "react-icons/bs";

function Abonner() {
  return (
    <ContentSectionMenu
      Logo={<BsCollectionPlay fontSize={120} />}
      title="Ne manquez pas les nouvelles vidéos"
      paragraphe="Connectez-vous pour découvrir les nouveautés de vos chaînes YouTube préférées"
    />
  );
}
export { Abonner };
