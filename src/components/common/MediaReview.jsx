import { useSelector } from "react-redux";
import Container from "./Container";
import { useEffect, useState } from "react";
import reviewApi from "../../api/modules/review.api";
import { toast } from "react-toastify";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import TextAvatar from "./TextAvatar";
import dayjs from "dayjs";

const ReviewItem = ({ review = {}, onRemoved }) => {
  const { user } = useSelector((state) => state.user);

  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) {
      return;
    }
    setOnRequest(true);

    const { response, err } = await reviewApi.remove({ reviewId: review.id });

    if (err) toast.error(err.message);
    if (response) {
      onRemoved(review.id);
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 5,
        position: "relative",
        opacity: onRequest ? 0.6 : 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Stack direction={"row"} spacing={2}>
        {/* avatar */}
        <TextAvatar text={review.user?.displayName} />
        {/* avatar */}
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight={"700"}>
              {review.user?.displayName}
            </Typography>
            <Typography variant="caption">
              {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="center">
            {review.content}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

const MediaReview = ({ reviews = [], media = {}, mediaType }) => {
  const { user } = useSelector((state) => state.user);
  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [onRequest, setOnRequest] = useState(false);
  const [content, setContent] = useState("");
  const [reviewCount, setReviewCount] = useState(0);

  const skip = 4;

  useEffect(() => {
    setListReviews([...reviews]);
    setFilteredReviews([...reviews].splice(0, skip));
    setReviewCount(reviews.length);
  }, [reviews]);

  const onAddReview = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const body = {
      content,
      mediaId: media.id,
      mediaType,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
    };

    const { response, err } = await reviewApi.add(body);

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Post review successful");
      setFilteredReviews([...filteredReviews, response]);
      setReviewCount(reviewCount + 1);
      setContent("");
    }
  };

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...listReviews].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    if (listReviews.findIndex((e) => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter((e) => e.id !== id);
      setListReviews(newListReviews);
      setFilteredReviews([...newListReviews].splice(0, page * skip));
    } else {
      setFilteredReviews([...filteredReviews.filter((e) => e.id !== id)]);
    }

    setReviewCount(reviewCount - 1);
    toast.success("Remove reviews successfully");
  };

  return (
    <>
      <Container header={`Reviews (${reviewCount})`}>
        <Stack spacing={4} marginBottom={2}>
          {filteredReviews.map((item) => {
            return (
              <Box key={item.id}>
                <ReviewItem />
                <Divider
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                />
              </Box>
            );
          })}
          {filteredReviews.length < listReviews.length && (
            <Button onClick={onLoadMore}>load more</Button>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default MediaReview;