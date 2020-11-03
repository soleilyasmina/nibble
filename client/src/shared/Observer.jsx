import { useEffect } from "react";

const Observer = (props) => {

  useEffect(() => {
    const options = {
      root: null,
      threshold: 1.0,
    };
    const loader = document.querySelector('.observer');
    const newObserver = new IntersectionObserver(props.cb, options);
    newObserver.observe(loader);
  }, []);

  return (
    <div className="observer"></div>
  )
}

export default Observer;
