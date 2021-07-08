import React from "react";
import { render, screen, contextRender, fireEvent, wait } from "./__test__/test-utils";
import { App } from "./App";
import { testTodoList } from "./__test__/testTodos";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

let response;
let buttonName: string;

describe("fetch button", () => {
  it("should render a button", async () => {
    contextRender(<App buttonName={buttonName} />);
    response = await screen.findByRole("button");
    expect(response).toBeTruthy();
  });

  it("should render a load button with individual name", async () => {
    buttonName = "Fetch";
    contextRender(<App buttonName={buttonName} />);
    response = await screen.findByText(buttonName);
    expect(response).toBeTruthy();

    buttonName = "Load";
    contextRender(<App buttonName={buttonName} />);
    response = await screen.findByText(buttonName);
    expect(response).toBeTruthy();
  });

  describe("todo list", () => {
    it("should fetch a single task when button is pressed", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: testTodoList });

      contextRender(<App buttonName={buttonName} />);

      response = await screen.findByRole("button");
      fireEvent.click(response);
      response = await screen.findByText(testTodoList[0].title);
      expect(response).toBeTruthy();
    });

    it("should fetch multiple tasks when button is pressed", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: testTodoList });

      contextRender(<App buttonName={buttonName} />);

      response = await screen.findByRole("button");
      fireEvent.click(response);
      response = await screen.findAllByRole("listitem");

      expect(response.length).toBe(testTodoList.length);
    });

    it("should delete a single todo from a list when clicked", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: testTodoList });

      contextRender(<App buttonName={buttonName} />);

      response = await screen.findByRole("button");
      fireEvent.click(response);
      response = await screen.findByText(testTodoList[1].title);
      fireEvent.click(response);

      response = await screen.queryByRole("listitem", { name: testTodoList[1].title });

      expect(response).not.toBeInTheDocument();

      response = await screen.queryByRole("listitem", { name: testTodoList[0].title });
      expect(response).toBeTruthy();
      response = await screen.queryByRole("listitem", { name: testTodoList[2].title });
      expect(response).toBeTruthy();
    });
  });
});
