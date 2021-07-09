import "./Tile.scss";

const Tile = ({ i, j, xAxis, yAxis, image }) => {
  return (
    <div className={`tile ${(i + j) % 2 ? "white" : ""}`}>
      <span className="tile-details">
        {xAxis[i].toUpperCase()}
        {yAxis[j]}
      </span>
      <img className="piece" src={image} alt="" />
    </div>
  );
};

export default Tile;
