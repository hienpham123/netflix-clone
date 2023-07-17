import { useState } from "react";
import { useDispatch } from "react-redux";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  return <div>UserMenu</div>;
};
export default UserMenu;
