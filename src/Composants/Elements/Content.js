import * as React from "react";
import "../../App.css";
import { CheckWidth, MobileResponsive } from "../../utils/utils";
import { ElementChannel } from "./Type_elements/ElementChannel";
import { ListingVideos } from "./Type_elements/ElementVideosListing";
import { ElementsVideos } from "./Type_elements/ElementVideo";
import { ListingPlaylist } from "./Type_elements/ElementPlaylistListing";
import { ListingChannel } from "./Type_elements/ElementChannelListing";
import { ListingShorts } from "./Type_elements/ElementShortsListing";
import { ElementPlayer } from "./Type_elements/ElementPlayer";
import { ElementPlaylist } from "./Type_elements/ElementPlaylist";

export const DisplayContent = ({
  Data,
  refWidth,
  setDataContext = "",
  setOption = "",
  LogochannelThumbnail = false,
  HasCaroussel = false,
  ChannelHome = false,
  setResponsive,
  responsive,
}) => {
  const [WidthVideos, setWidthVideos] = React.useState(0);
  const [WidthShorts, setWidthShorts] = React.useState(0);
  const [MarginRight, setMarginRight] = React.useState(0);
  const [marginLeft, setMarginLeft] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [select, setSelect] = React.useState(-1);
  const [expandedItems, setExpandedItems] = React.useState([]);
  const [value, setValue] = React.useState(0);
  //console.log("data DisplayContent", Data?.data?.data);
  
  React.useLayoutEffect(() => {
    if (process.env.NODE_ENV === "test") {
      CheckWidth(
        refWidth,
        setWidthVideos,
        setWidthShorts,
        setMarginLeft,
        setMarginRight,
        HasCaroussel,
        setValue,
      );
      MobileResponsive(setResponsive);
      setLoading(false);
    } else {
      let chargement = setTimeout(() => {
        CheckWidth(
          refWidth,
          setWidthVideos,
          setWidthShorts,
          setMarginLeft,
          setMarginRight,
          HasCaroussel,
          setValue,
        );
        MobileResponsive(setResponsive);
        setLoading(false);
      }, 1000);

      return () => clearTimeout(chargement);
    }
  }, [refWidth, loading, HasCaroussel, setResponsive]);
  
  React.useEffect(() => {
    const HandleResize = () => {
      CheckWidth(
        refWidth,
        setWidthVideos,
        setWidthShorts,
        setMarginLeft,
        setMarginRight,
        HasCaroussel,
        setValue,
      );
      MobileResponsive(setResponsive);
    };
    window.addEventListener("resize", HandleResize);
    return () => window.removeEventListener("resize", HandleResize);
  }, [refWidth, HasCaroussel, setResponsive]);

  return (
    <React.Fragment>
      {loading === true ? (
        <div style={{ width: "100%" }}>chargement...</div>
      ) : (
        Data?.data?.data.map((element, index) => {
          if (element?.type === "video") {
            return (
              <ElementsVideos
                key={index}
                Data={Data}
                element={element}
                index={index}
                ChannelHome={ChannelHome}
                responsive={responsive}
                LogochannelThumbnail={LogochannelThumbnail}
                MarginRight={MarginRight}
                marginLeft={marginLeft}
                WidthVideos={WidthVideos}
              />
            );
          }
          if (element?.type === "video_listing") {
            return (
              <ListingVideos
                key={index}
                element={element}
                index={index}
                responsive={responsive}
                ChannelHome={ChannelHome}
                HasCaroussel={HasCaroussel}
                expandedItems={expandedItems}
                Data={Data}
                setExpandedItems={setExpandedItems}
                value={value}
                WidthVideos={WidthVideos}
                marginLeft={marginLeft}
                MarginRight={MarginRight}
                LogochannelThumbnail={LogochannelThumbnail}
              />
            );
          }
          if (element?.type === "channel_listing") {
            return (
              <ListingChannel
                 key={index}
                element={element}
                responsive={responsive}
                ChannelHome={ChannelHome}
                index={index}
                expandedItems={expandedItems}
                setExpandedItems={setExpandedItems}
                WidthVideos={WidthVideos}
                marginLeft={marginLeft}
                MarginRight={MarginRight}
                value={value}
              />
            );
          }

          if (element?.type === "shorts_listing") {
            return (
              <ListingShorts
                key={index}
                element={element}
                responsive={responsive}
                index={index}
                value={value}
                WidthShorts={WidthShorts}
                MarginRight={MarginRight}
                marginLeft={marginLeft}
                setOption={setOption}
                setDataContext={setDataContext}
                HasCaroussel={HasCaroussel}
              />
            );
          }

          if (element?.type === "playlist_listing") {
            return (
              <ListingPlaylist
                key={index}
                element={element}
                index={index}
                WidthVideos={WidthVideos}
                expandedItems={expandedItems}
                ChannelHome={ChannelHome}
                setExpandedItems={setExpandedItems}
                Data={Data}
                setSelect={setSelect}
                select={select}
                value={value}
                responsive={responsive}
                MarginRight={MarginRight}
                marginLeft={marginLeft}
              />
            );
          }
          if (element?.type === "player") {
            return (
              <ElementPlayer
                key={index}
                element={element}
                responsive={responsive}
                ChannelHome={ChannelHome}
                index={index}
              />
            );
          }
          if (element?.type === "playlist") {
            return (
              <ElementPlaylist
                key={index}
                element={element}
                index={index}
                responsive={responsive}
                ChannelHome={ChannelHome}
                WidthVideos={WidthVideos}
                marginLeft={marginLeft}
                MarginRight={MarginRight}
                setSelect={setSelect}
                select={select}
                Data={Data}
              />
            );
          }
          if (element?.type === "channel") {
            return (
              <ElementChannel
                key={index}
                element={element}
                index={index}
                responsive={responsive}
                ChannelHome={ChannelHome}
              />
            );
          }
          return null;
        })
      )}
    </React.Fragment>
  );
};
