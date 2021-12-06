import React from "react";
import ReactDOM from "react-dom";
import { TodoListContainer } from "./index";
import { render } from "@testing-library/react";

it("renders without crashing,", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TodoListContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders TodoListContainer correctly", () => {
  render(<TodoListContainer />);
});
