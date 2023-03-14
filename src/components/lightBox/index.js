import styles from "./lightbox.module.css";

const LightBox = ({ setShowLightBox, image }) => {
  return (
    <div
      className={styles.lightboxContainer}
      onClick={() => setShowLightBox(false)}
    >
      <span>
        <div className={styles.imageBox}>
          <img src={image.urls.regular} />
          <div className={styles.imgDetails}>
            <div style={{ width: "30%" }}>
              <p className={styles.boldText}>User</p>
              <p>{image.user.name}</p>
            </div>
            <div style={{ width: "30%" }}>
              <p className={styles.boldText}>Description</p>
              <p>{image.alt_description}</p>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default LightBox;
