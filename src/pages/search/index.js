import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./search.module.css";
import { useParams } from "react-router-dom";
import { searchImage } from "../../apis/gallery.apis";
import search from "../../assets/img/search.png";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-no-background.png";
import LightBox from "../../components/lightBox";
import Loader from "../../components/loader";
import GalleryView from "../../components/gallery-view";

const Search = () => {
  const navigate = useNavigate();
  let { search: searchText } = useParams();
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [showLightBox, setShowLightBox] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const options = ["Animals", "Nature", "Travel", "Film", "Fashion & Beauty"];

  useEffect(() => {
    if (searchText) {
      imageSearch(searchText, pageNumber);
    }
  }, [searchText]);

  const imageSearch = async (query, pageNumber) => {
    setLoading(true);
    setError(false);
    searchImage(query, pageNumber)
      .then((res) => {
        if (pageNumber === 1) {
          setImages([...res.data.results]);
        } else {
          setImages((prevImages) => {
            return [...new Set([...prevImages, ...res.data.results])];
          });
        }
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
      });
    return { loading, error, images };
  };

  const observer = useRef();
  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entires) => {
        if (entires[0].isIntersecting) {
          setPageNumber(pageNumber + 1);
          imageSearch(searchText, pageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const handleSearch = (e) => {
    navigate(`/dashboard/${query}`);
  };

  const onImageClick = (image) => {
    setSelectedImage(image);
    setShowLightBox(true);
  };

  return (
    <div>
      <header className={styles.header2}>
        <div style={{ width: "20%" }}>
          <a href="/">
            <img src={logo} alt="Logo" className={styles.logo2} />
          </a>
        </div>
        <div className={styles.helperArea}>
          <form action="" className={styles.searchBar2}>
            <input
              type="text"
              placeholder="search collections"
              onChange={(e) => setQuery(e.target.value)}
            ></input>
            <button type="submit" onClick={handleSearch}>
              <img src={search} />
            </button>
          </form>
          <div className={styles.filterArea}>
            <ul>
              <li>
                <a href="#">Collections</a>
                <ul>
                  {options.map((element) => {
                    return (
                      <li>
                        <a href={`/dashboard/${element}`}>{element}</a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className={styles.helperclass}>
        {images.length !== 0 && (
          <GalleryView
            images={images}
            lastImageElementRef={lastImageElementRef}
            onImageClick={onImageClick}
            searchText={searchText}
          />
        )}
      </div>
      {showLightBox && (
        <LightBox setShowLightBox={setShowLightBox} image={selectedImage} />
      )}
      {loading && <Loader visible={loading} />}
    </div>
  );
};

export default Search;
