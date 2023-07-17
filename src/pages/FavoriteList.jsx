import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/globalLoadingSlice";
import favoriteApi from "../api/modules/favorite.api";
import { toast } from "react-toastify";
import { Box, Button, Grid } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import { removeFavorite } from "../redux/userSlice";
import MediaItem from "../components/common/MediaItem";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";

const FavoriteItem = ({ media = [], onRemoved }) => {
  const dispatch = useDispatch();

  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await favoriteApi.remove({
      favoriteId: media.id,
    });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Remove favorite successfully");
      dispatch(removeFavorite({ mediaId: media.mediaId }));
      onRemoved(media.id);
    }
  };
  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType} />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={onRequest}
        onClick={onRemove}
      >
        remove
      </LoadingButton>
    </>
  );
};

const FavoriteList = () => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const skip = 8;

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await favoriteApi.getList();
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        setCount(response.length);
        setMedias([...response]);
        setFilteredMedias([...response].splice(0, skip));
      }
    };

    getFavorites();
  }, []);

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newMedias = [...medias].filter((e) => e.id !== id);
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your favorite (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: "-8px !important" }}>
          {filteredMedias.map((media, index) => {
            return (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <FavoriteItem media={media} onRemoved={onRemoved} />
              </Grid>
            );
          })}
          {filteredMedias.length < medias.length && (
            <Button onClick={onLoadMore}>load more</Button>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default FavoriteList;
