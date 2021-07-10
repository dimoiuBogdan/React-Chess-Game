import "./Tile.scss";

const Tile = ({ i, j, xAxis, yAxis, image }) => {
  return (
    <div className={`tile ${(i + j) % 2 ? "white" : ""}`}>
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
