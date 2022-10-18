import { useState,useCallback, useEffect } from "react";
import "./App.css";
import "./Styles.css";
import Box from "./Components/Box";
import Move from "./Components/Move";
import { Card, Col, Row } from "reactstrap";

function Boxes({ deleteHandeler, id, index }) {
  const [selectedid, setSelected] = useState(id);
  const [isActive, setIsActive] = useState(false);
  const [color, setColor] = useState("red");

  const getRgb = () => Math.floor(Math.random() * 256);
  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");

  const handleGenerate = () => {
    const color = {
      r: getRgb(),
      g: getRgb(),
      b: getRgb(),
    };

    setColor(rgbToHex(color.r, color.g, color.b));
  };

  const handleSelected = (value) => {
    setSelected(value);
    setIsActive((current) => !current);
    console.log("selectid", isActive);
  };

  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        <Box
          id={id}
          key={index}
          onClick={() => {
            handleSelected(id);
            handleGenerate();
          }}
          selected={selectedid}
          zIndex={id}
          color={color}
          backgroundColor={color}
          border={isActive === true ? "solid 6px white" : null}
        />

        {isActive === true ? (
          <button
            type="button"
            id="delete"
            value="Delete"
            onClick={deleteHandeler}
          >
            Delete
          </button>
        ) : (
          <button
            type="button"
            id="delete"
            value="Delete"
            onClick={() =>
              alert("Select the box first if you need to delete it.")
            }
          >
            Delete
          </button>
        )}
      </div>
    </>
  );
}

let number = 0;

function BoxGenerator() {
  const [ids, setIds] = useState([]);

  const addHandeler = () => {
    const newId = number + 1;
    number = newId;
    console.log("number", number);
    setIds((ids) => [...ids, newId]);
  };

  const [color, setColor] = useState("skyblue");
  const getRgb = () => Math.floor(Math.random() * 256);
  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");

  const handleGenerate = () => {
    const color = {
      r: getRgb(),
      g: getRgb(),
      b: getRgb(),
    };

    setColor(rgbToHex(color.r, color.g, color.b));
  };

  const deleteHandeler = (removeId) =>
    setIds((ids) => ids.filter((id) => id !== removeId));

  let deletedId = ids.length - 0;
  console.log("deletedId==>", deletedId);

  return (
    <div style={{ backgroundColor: color, display: "block" }}>
      <h1 style={{ textAlign: "center", top: 10 }}>
        Boxes Count : {deletedId}
      </h1>
      <button
        type="button"
        style={{ padding: "25px", fontWeight: "bold" }}
        id="add"
        value="Add"
        color="black"
        onClick={() => {
          addHandeler();
          handleGenerate();
        }}
      >
        ADD
      </button>
      {ids.map((id, e, index) => (
        <Boxes
          style={{ backgroundColor: color }}
          key={id}
          id={id}
          deleteHandeler={() => {
            deleteHandeler(id);
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [top, setTop] = useState(100);
  const [left, setLeft] = useState(100);

  const [theme, setTheme] = useState(0);
  const handleClick = () => {
    setTheme(!theme);
  };

  console.log("theme==>", theme);
  const pixelDistance = 5;

  const move = useCallback((direction, theme) => {
    switch (direction) {
      case "up":
        setTop((top) => (top - pixelDistance >= 0 ? top - pixelDistance : 0));

        break;
      case "down":
        setTop((top) =>
          top + pixelDistance <= 280 ? top + pixelDistance : 280
        );
        break;
      case "left":
        setLeft((left) =>
          left - pixelDistance >= 0 ? left - pixelDistance : 0
        );
        break;
      default:
        setLeft((left) =>
          left + pixelDistance <= 280 ? left + pixelDistance : 280
        );
        break;
    }
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      switch (e.code) {
        case "ArrowUp":
          move("up");
          break;
        case "ArrowDown":
          move("down");
          break;
        case "ArrowLeft":
          move("left");
          break;
        case "ArrowRight":
          move("right");
          break;
        default:
          console.log("Do nothing", e.code);
      }
    },
    [move]
  );
  
  let toggleTheme = theme;
  console.log("toggleTheme", toggleTheme);

  useEffect(() => {
    if (toggleTheme === true) {
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.removeEventListener("keydown", onKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown, toggleTheme]);

  return (
    <div className="container">
      <h3>
        Task Name : Moveable Box Generator || Created By : Asmita Margaje{" "}
      </h3>

      <div
        style={{
          backgroundColor: theme ? "black" : "white",
          height: "100vh",
          width: "100vw",
          overflow: "auto",
        }}
      >
        <div className="toggle-slide" onClick={handleClick}>
          <div className={`switch ${theme ? "slide " : ""}`}>
            {theme === true ? (
              <small
                style={{
                  position: "absolute",
                  top: "13px",
                  left: "11px",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                On
              </small>
            ) : (
              <small
                style={{
                  position: "absolute",
                  top: "13px",
                  left: "11px",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Off
              </small>
            )}
          </div>
        </div>
        <div
          className="controller"
          style={{
            backgroundColor: "#d99b9b",
            borderRadius: 20,
            marginLeft: 30,
            position: "absolute",
          }}
        >
          <button onClick={() => move("up")}>Up</button>
          <button onClick={() => move("down")}>Down</button>
          <button onClick={() => move("left")}>Left</button>
          <button onClick={() => move("right")}>Right</button>

          <Move top={top} left={left} />
        </div>

        <div
          style={{
            display: "grid",
            borderRadius: 20,
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: 100,
          }}
        >
          <Row>
            <Col xs="2">
              <Card>
                <h1 style={{ textAlign: "center" }}>ADD BOXES </h1>
                <BoxGenerator/>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card></Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
