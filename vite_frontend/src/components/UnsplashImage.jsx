import { useEffect, useState } from "react";

function UnsplashImage({ desti, className, style }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!desti) return;
    fetchImage();
  }, [desti]);

  const fetchImage = async () => {
    const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

      console.log("API KEY:", accessKey); 

    try {
const response = await fetch(
  `https://api.unsplash.com/search/photos?query=${desti}&per_page=1&client_id=${accessKey}`
);

const data = await response.json();

setImageUrl(data.results[0]?.urls?.regular);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  if (!imageUrl) {
    return (
      <div
        className={className}
        style={{
          ...style,
          backgroundColor: "#eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <span>Cargando imagen...</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={desti}
      className={className}
      style={style}
    />
  );
}

export default UnsplashImage;