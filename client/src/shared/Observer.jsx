import { useEffect } from "react";

const Observer = ({ cb }) => {

  useEffect(() => {
    const options = {
      root: null,
      threshold: 1.0,
    };
    const loader = document.querySelector('.observer');
    const newObserver = new IntersectionObserver(cb, options);
    newObserver.observe(loader);
  }, []); // eslint-disable-line

  return (
    <div className="observer"></div>
  )
}

export default Observer;
