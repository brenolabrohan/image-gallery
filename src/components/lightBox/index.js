import styles from "./lightbox.module.css";

const LightBox = ({ setShowLightBox, data, image, imageChange, nextApiCall }) => {
  const onButtonClick = (buttonType) => {
    if (buttonType === "left" && image !== 0) {
      imageChange(image - 1);
    } else if (buttonType === "right") {
      if (image + 2 === data.length) {
        nextApiCall();
      }
      imageChange(image + 1);
    }
  };
  return (
    <div className={styles.lightboxContainer}>
      <div
        className={styles.cancelStyle}
        onClick={() => setShowLightBox(false)}
      >
        &#x2716;
      </div>
      <span>
        <div className={styles.imageBox}>
          <div className={styles.imageContainer}>
            <div
              className={styles.leftArrowStyle}
              onClick={() => onButtonClick("left")}
            >
              &#8249;
            </div>
            <img src={data[image].urls.regular} />
            <div
              className={styles.rightArrowStyle}
              onClick={() => onButtonClick("right")}
            >
              &#8250;
            </div>
          </div>

          <div className={styles.imgDetails}>
            <div style={{ width: "30%" }}>
              <p className={styles.boldText}>User</p>
              <p>{data[image].user.name}</p>
            </div>
            <div style={{ width: "30%" }}>
              <p className={styles.boldText}>Description</p>
              <p>{data[image].alt_description}</p>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default LightBox;
