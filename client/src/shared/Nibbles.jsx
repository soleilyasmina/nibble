import Nibble from "./Nibble.jsx";

const Nibbles = (props) => {
  const { posts, ...rest } = props;
  return (
    <>
      {posts.map((n) => (
        <Nibble {...rest} n={n} />
      ))}
    </>
  )
}

export default Nibbles;
