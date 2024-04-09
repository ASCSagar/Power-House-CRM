import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFromLocalStorage } from "../helpers/helper";
import { authAction } from "../store/authStore";

// this is just for checking whether we have localData or not and if yes do loggedIn
const useIsLogIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // redux hook
  const dispatch = useDispatch();

  useEffect(() => {
    // get localdata and if not available then logout and if available set it, then it will give us If session expired then
    const localData = getFromLocalStorage("loginInfo", true);
    if (localData === -1) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      dispatch(
        authAction.setAuthStatus({
          ...localData,
          loggedIn: true,
          logInOperation: 1,
        })
      );
    }
  }, [dispatch]);

  return isLoggedIn;
};

export default useIsLogIn;