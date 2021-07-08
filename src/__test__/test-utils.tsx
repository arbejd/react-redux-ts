import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import thunk from "redux-thunk";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducers } from "../reducers";

const store = createStore(reducers, applyMiddleware(thunk));

const Wrapper: FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const contextRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";
export { contextRender };
