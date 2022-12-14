import React, { useState } from "react";
import PropTypes from "prop-types";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const LightBoxGallery = ({ images, children }) => {
  const [imgIndex, setImgIndex] = useState(null);
  return (
    <div>
      {children(setImgIndex)}
      {imgIndex !== null && (
        <Lightbox
          mainSrc={images[imgIndex]}
          nextSrc={
            imgIndex + 1 > images.length ? undefined : images[imgIndex + 1]
          }
          prevSrc={imgIndex - 1 < 0 ? undefined : images[imgIndex - 1]}
          onCloseRequest={() => setImgIndex(null)}
          onMovePrevRequest={() =>
            setImgIndex((imgIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() => setImgIndex((imgIndex + 1) % images.length)}
          reactModalStyle={{ overlay: { zIndex: 999999 } }}
        />
      )}
    </div>
  );
};

LightBoxGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.func.isRequired,
};

export default LightBoxGallery;
