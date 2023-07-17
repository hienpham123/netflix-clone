import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/authModalSlice";
import { Box, Modal } from "@mui/material";
import Logo from "./Logo";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignupForm";

const actionState = {
  signIn: "signIn",
  signUp: "signUp",
};
const AuthModal = () => {
  const { authModalOpen } = useSelector((state) => state.authModal);

  const dispatch = useDispatch();

  const [action, setAction] = useState(actionState.signIn);

  useEffect(() => {
    if (authModalOpen) setAction(actionState.signIn);
  }, [authModalOpen]);

  const handleClose = () => dispatch(setAuthModalOpen(false));

  const switchAuthState = (state) => setAction(state);
  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "600px",
          padding: 4,
          outline: "none",
        }}
      >
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            backgroundColor: "background.paper",
          }}
        >
          <Box sx={{ textAlignL: "center", marginBottom: "2rem" }}>
            <Logo />

            {action === actionState.signIn && (
              <SignInForm
                switchAuthState={() => switchAuthState(actionState.signUp)}
              />
            )}
            {action === actionState.signUp && (
              <SignUpForm
                switchAuthState={() => switchAuthState(actionState.signIn)}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
