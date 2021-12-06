import React from "react";
import ReactDOM from "react-dom";
import { NewTodoComponent } from "./index";
import { render } from "@testing-library/react";

it("renders without crashing,", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NewTodoComponent onCreate={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders NewTodoComponent correctly", () => {
  render(<NewTodoComponent onCreate={() => {}} />);
});
