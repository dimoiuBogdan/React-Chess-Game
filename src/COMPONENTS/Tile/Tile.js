import "./Tile.scss";

const Tile = ({ i, j, xAxis, yAxis }) => {
  return (
    <div
      className={`tile ${(i + j) % 2 ? "white" : ""}`}
      key={`${xAxis[i]}${yAxis[j]}`}
    >
      <span className="tile-details">
        {xAxis[i].toUpperCase()}
        {yAxis[j]}
      </span>
    </div>
  );
};

export default Tile;
