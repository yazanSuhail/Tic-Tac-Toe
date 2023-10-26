import { useEffect, useState } from "react";

const GenerateBoard = (size) => {
  let newBoard = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
    }
    newBoard.push(row);
  }
  return newBoard;
};

function App() {
  const [board, setBoard] = useState(GenerateBoard(3));
  const [player, setPlayer] = useState("");
  const [turn, setTurn] = useState(true);
  const [shouldStopClickEvent, setShouldStopClickEvent] = useState(false);

  useEffect(() => {
    let hasNumbersLeft = false;
    for (const row of board) {
      for (const cellValue of row) {
        if (Number.isInteger(cellValue)) {
          hasNumbersLeft = true;
          break;
        }
      }
      if (hasNumbersLeft) {
        break;
      }
    }
    setShouldStopClickEvent(!hasNumbersLeft);
  }, [board]);

  const handleClick = (cell) => {
    if (typeof cell === "number") {
      const newBoard = board.map((row) => {
        return row.map((cellValue) => {
          if (cellValue === cell) {
            if (typeof cellValue === "number") {
              setPlayer(turn ? "x" : "o");
              return turn ? "o" : "x";
            }
          }
          return cellValue;
        });
      });

      setBoard(newBoard);
      setTurn(!turn);
    }
  };

  const handleReset = () => {
    setPlayer("");
    setBoard(GenerateBoard(3));
  };

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(217,217,227)",
        height: "100vh",
        flexWrap: "wrap",
      }}>
      <div>
        {player === "" ? (
          <div style={{ fontSize: "3rem", paddingBottom: "2rem" }}>
            {" "}
            Let the game begin!{" "}
          </div>
        ) : (
          <div style={{ fontSize: "3rem", paddingBottom: "2rem" }}>
            it's
            <strong
              style={{
                textTransform: "uppercase",
                color: "green",
                padding: "0 .5rem 0 .5rem",
              }}>
              {player}
            </strong>
            turn
          </div>
        )}
        {board.map((row, index) => {
          return (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${board.length}, 1fr)`,
              }}>
              {row.map((cell, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      border: "1px solid black",
                      width: "10rem",
                      height: "10rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "5rem",
                      cursor: "pointer",
                    }}
                    onClick={() => handleClick(cell)}>
                    {typeof cell === "number" ? "" : cell}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <button
        style={{
          width: "10rem",
          padding: "1rem",
          borderRadius: "5px",
          cursor: "pointer",
          color: "Green",
        }}
        onClick={handleReset}>
        Start a new game
      </button>
    </div>
  );
}

export default App;
