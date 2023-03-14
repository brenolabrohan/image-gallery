import styles from "./gallery-view.module.css";

const GalleryView = ({ images, lastImageElementRef, onImageClick }) => {
    return <div>
    <div className={styles.galleryContainer}>
      {images?.map((item, index) => {
        if (images.length === index + 1) {
          return (
            <figure key={item.id} ref={lastImageElementRef}>
              <img
                src={item.urls.regular}
                className={styles.eachImg}
                onClick={() => onImageClick(item)}
              />
            </figure>
          );
        } else {
          return (
            <figure key={item.id}>
              <img
                src={item.urls.regular}
                className={styles.eachImg}
                onClick={() => onImageClick(item)}
              />
            </figure>
          );
        }
      })}
    </div>
  </div>
}

export default GalleryView;