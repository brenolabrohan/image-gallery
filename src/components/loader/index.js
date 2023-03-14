import styles from "./loader.module.css";
import { ColorRing } from "react-loader-spinner";

const Loader = (visible) => {
  return (
    <div className={styles.loaderContainer}>
      <ColorRing
        visible={visible}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};

export default Loader;
