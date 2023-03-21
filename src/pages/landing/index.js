import styles from "./landing.module.css";
import logo from "../../assets/img/logo-no-background.png";
import search from "../../assets/img/search.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { getImages } from "../../apis/gallery.apis";
import Loader from "../../components/loader";
import GalleryView from "../../components/gallery-view";
import LightBox from "../../components/lightBox";

const Landing = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [showLightBox, setShowLightBox] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const getPhotos = async (page) => {
    setLoading(true);
    setError(false);
    getImages(page)
      .then((res) => {
        setImages((prevImages) => {
          return [...new Set([...prevImages, ...res.data])];
        });
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
      });
  };

  const observer = useRef();
  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entires) => {
        if (entires[0].isIntersecting) {
          getNextImages();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    getPhotos(pageNumber);
  }, []);

  const handleSearch = (e) => {
    navigate(`/dashboard/${query}`);
  };

  const onImageClick = (imageIndex) => {
    setSelectedImage(imageIndex);
    setShowLightBox(true);
  };

  const imageChange = (newIndex) => {
    setSelectedImage(newIndex);
  }

  const getNextImages = () => {
    setPageNumber(pageNumber + 1);
    getPhotos(pageNumber + 1);
  }

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logoBox}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.headerContent}>
          <h1 className={styles.headingPrimary}>
            <span className={styles.headingPrimaryMain}>Galería</span>
            <span className={styles.headingPrimarySub}>Life in frames</span>
          </h1>

          <form action="" className={styles.searchBar}>
            <input
              type="text"
              placeholder="search collections"
              onChange={(e) => setQuery(e.target.value)}
            ></input>
            <button type="submit" onClick={handleSearch}>
              <img src={search} />
            </button>
          </form>
        </div>
      </header>
      <GalleryView images={images} lastImageElementRef={lastImageElementRef} onImageClick={onImageClick} searchText={"Editorial"}/>
      {showLightBox && (
        <LightBox setShowLightBox={setShowLightBox} data={images} image={selectedImage} imageChange={imageChange} nextApiCall={getNextImages} />
      )}
      {loading && (
        <Loader visible={loading} />
      )}
    </div>
  );
};

export default Landing;
