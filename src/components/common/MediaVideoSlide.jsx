import { SwiperSlide } from "swiper/react";
import NavigationSwiper from "./NavigationSwiper";
import { Box } from "@mui/material";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import { useEffect, useRef } from "react";

const MediaVideo = ({ video = {} }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, [video]);

  return (
    <>
      <Box sx={{ height: "max-content" }}>
        <iframe
          key={video.key}
          src={tmdbConfigs.youtubePath(video.key)}
          ref={iframeRef}
          width="100%"
          title={video.id}
          style={{ border: 0 }}
        ></iframe>
      </Box>
    </>
  );
};

const MediaVideosSlide = ({ videos = [] }) => {
  return (
    <NavigationSwiper>
      {videos.map((video, index) => {
        return (
          <SwiperSlide key={index}>
            <MediaVideo video={video} />
          </SwiperSlide>
        );
      })}
    </NavigationSwiper>
  );
};

export default MediaVideosSlide;
