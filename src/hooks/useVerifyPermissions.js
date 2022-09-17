import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/auth";

export function useVerifyPermissions(allowedRoles) {
  const [isAllowed, setIsAllowed] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const { role } = user.userInfo;
    if (allowedRoles.includes(role)) {
      setIsAllowed(true);
    }
  }, [user, allowedRoles]);
  return { isAllowed };
}
