import { Card } from "react-bootstrap";
import { follow, unfollow } from "../services/follows";

const Follow = (props) => {
  const changeFollowStatus = async (following, user_id) => {
    if (following) {
      const user = await unfollow(user_id);
      console.log(user)
      props.setUser(user);
    } else {
      const user = await follow(user_id);
      props.setUser(user);
    }
  }

  const { nibble, user, userId } = props;
  const id = userId || nibble.user_id._id;
  if (!user || user.id === id) {
    return null;
  }
  const following = props.user.following.includes(id);
  return (
    <Card.Subtitle role="button" onClick={() => changeFollowStatus(following, id)} className={`mt-0 cursor-pointer d-inline ml-2 ${userId ? 'text-light' : 'text-muted'}`}>
      {following ? userId ? 'Unfollow' : '' : 'Follow'}
    </Card.Subtitle>
  )
}

export default Follow;
