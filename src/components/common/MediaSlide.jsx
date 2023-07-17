import { useEffect, useState } from "react";
import AutoSwiper from "./AutoSwiper";
import { SwiperSlide } from "swiper/react";
import MediaItem from "./MediaItem";
import mediaApi from "../../api/modules/media.api";
import { toast } from "react-toastify";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMedias(response.results);
      if (err) toast.error(err.message);
    };

    getMedias();
  }, [mediaType, mediaCategory]);

  return (
    <AutoSwiper>
      {medias.map((media, index) => {
        return (
          <SwiperSlide key={index}>
            <MediaItem media={media} mediaType={mediaType} />
          </SwiperSlide>
        );
      })}
    </AutoSwiper>
  );
};

export default MediaSlide;
