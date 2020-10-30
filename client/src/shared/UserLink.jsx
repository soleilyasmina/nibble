import { Link } from "react-router-dom";

const UserLink = (props) => {
  const { user_id: linkedUser } = props.linkedUser;
  return (
    <Link className="text-dark d-inline font-weight-bold" to={`/users/${linkedUser._id}`}>
      {linkedUser.username}
    </Link>
  )
};

export default UserLink;
