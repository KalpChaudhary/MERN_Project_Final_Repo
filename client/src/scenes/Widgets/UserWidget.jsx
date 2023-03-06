import { UserWidgetWithData } from "./UserWidgetWithData";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { API_URL } from "config";
import UserWidgetSkeleton from "scenes/Skeletons/UserWidgetSkeleton";

const UserWidget = ({ userId= null }) => {
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

 
  const token = useSelector((state) => state.token);
  const totalFriends = useSelector((state) => state.user.friends.length);
  const storedUser = useSelector((state) => state.user);

  const getUser = async () => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    console.log("User data fetched");
    setUser(data);

    if (data) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userId || userId === storedUser._id) {
      setUser(storedUser);
      storedUser && setIsLoading(false);
    } else {
      getUser();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isLoading ? (
        <UserWidgetSkeleton />
      ) : (
        <UserWidgetWithData
          totalFriends={totalFriends}
          user={user}
          userId={userId ? userId : storedUser._id}
        />
      )}
    </>
  );
};

export default UserWidget;
