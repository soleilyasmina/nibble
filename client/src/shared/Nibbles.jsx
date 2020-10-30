import Nibble from "./Nibble.jsx";

const Nibbles = (props) => {
  const { posts, ...rest } = props;
  return (
    <>
      {posts.map((n) => (
        <Nibble key={n._id} {...rest} n={n} />
      ))}
    </>
  )
}

export default Nibbles;
