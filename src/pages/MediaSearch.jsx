import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import { useCallback, useEffect, useState } from "react";
import mediaApi from "../api/modules/media.api";
import { toast } from "react-toastify";
import MediaGrid from "../components/common/MediaGrid";
import { LoadingButton } from "@mui/lab";

const mediaTypes = ["movie", "tv", "people"];
let timer;
const timeout = 500;

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);

  const search = useCallback(async () => {
    setOnSearch(true);

    const { response, err } = await mediaApi.search({
      mediaType,
      query,
      page,
    });

    setOnSearch(false);

    if (err) toast.error(err.message);
    if (response) {
      if (page > 1) {
        setMedias((m) => [...m, ...response.results]);
      } else {
        setMedias([...response.results]);
      }
    }
  }, [mediaType, query, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else {
      search();
    }
  }, [search, query, mediaType, page]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  const onCategoryChange = (selectedCategory) => setMediaType(selectedCategory);

  const onQueryChange = (event) => {
    const newQuery = event.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };
  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction={"row"}
            justifyContent={"center"}
            sx={{ width: "100%" }}
          >
            {mediaTypes.map((item, index) => {
              return (
                <Button
                  key={index}
                  size="large"
                  variant={mediaType === item ? "contained" : "text"}
                  sx={{
                    color:
                      mediaType === item
                        ? "primary.contrastText"
                        : "text.primary",
                  }}
                  onClick={() => onCategoryChange(item)}
                >
                  {item}
                </Button>
              );
            })}
          </Stack>
          <TextField
            color="success"
            placeholder="Search NetFlix"
            sx={{ width: "100%" }}
            autoFocus
            onChange={onQueryChange}
          />

          <MediaGrid medias={medias} mediaType={mediaType} />

          {medias.length > 0 && (
            <LoadingButton loading={onSearch} onClick={() => setPage(page + 1)}>
              load more
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;
