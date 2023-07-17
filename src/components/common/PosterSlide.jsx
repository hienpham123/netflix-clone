import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import { Box } from "@mui/material";
import tmdbConfigs from "../../api/configs/tmdb.configs";

const PosterSlide = ({ posters = [] }) => {
  return (
    <>
      <AutoSwiper>
        {posters.map((poster, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                paddingTop: "160%",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(${tmdbConfigs.posterPath(
                  poster.file_path
                )})`,
              }}
            ></Box>
          </SwiperSlide>
        ))}
      </AutoSwiper>
    </>
  );
};

export default PosterSlide;
