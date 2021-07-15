import { useEffect, useRef } from "react";
import "./Tile.scss";

const Tile = ({ i, j, image, setTileSizes }) => {
  const tileRef = useRef(null);

  const handleSetTileSizes = () => {
    setTileSizes({
      height: tileRef.current?.clientHeight,
      width: tileRef.current?.clientWidth,
    });
  };

  useEffect(() => {
    handleSetTileSizes();
  }, []);

  return (
    <div ref={tileRef} className={`tile ${(i + j) % 2 ? "white" : ""}`}>
      {image && (
        <div
          className="piece"
          style={{ backgroundImage: `url(${image}) ` }}
        ></div>
      )}
    </div>
  );
};

export default Tile;
