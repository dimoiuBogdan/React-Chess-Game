import "./Tile.scss";

const Tile = ({ i, j, xAxis, yAxis, image }) => {
  return (
    <div className={`tile ${(i + j) % 2 ? "white" : ""}`}>
      <span className="tile-details">
        {xAxis[i].toUpperCase()}
        {yAxis[j]}
      </span>
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
