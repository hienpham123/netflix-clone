import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/authModalSlice";

const ProtectedPage = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuthModalOpen(!user));
  }, [user, dispatch]);
  return user ? children : null;
};

export default ProtectedPage;
