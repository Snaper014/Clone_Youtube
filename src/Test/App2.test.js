import * as React from "react";
import {
  screen,
  waitForElementToBeRemoved,
  render,
  act,
} from "@testing-library/react";
import { App } from "../App";
import { server } from "./server";
import userEvent from "@testing-library/user-event";

beforeAll(() => server.listen());
// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
afterEach(() => {
  server.resetHandlers();
});

// Don't forget to clean up afterwards.
afterAll(() => server.close());

test("Redirection vers la page Jeux vidéos", async () => {
  const user = userEvent.setup();
  render(<App />);
  act(() => {
    global.innerWidth = 1600;
    global.innerHeight = 850;
    global.dispatchEvent(new Event("resize"));
  });
  const progressBar = screen.queryByRole("progressbar");
  if (progressBar) {
    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
    const MenuButton = screen.getByRole("menu");
    await user.click(MenuButton);
    await user.click(screen.getByRole("link", { name: "Jeux vidéos" }));
    expect(screen.getByText("skibidi toilet 58")).toBeInTheDocument();

  } else {
    const MenuButton = screen.getByRole("menu");
    console.log("Avant l'apuui du bouton menu", document.body.children);
    await user.click(MenuButton);
    await user.click(screen.getByRole("link", { name: "Jeux vidéos" }));
    expect(screen.getByText("skibidi toilet 58")).toBeInTheDocument();
    console.log("Après l'apuui du bouton menu", document.body.children);
  }
}, 20000);

test("Redirection vers la page Actualités", async () => {
  const user = userEvent.setup();
  render(<App />);
  act(() => {
    global.innerWidth = 1600;
    global.innerHeight = 850;
    global.dispatchEvent(new Event("resize"));
  });
  const progressBar = screen.queryByRole("progressbar");
  if (progressBar) {
    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
    const MenuButton = screen.getByRole("menu");
    await user.click(MenuButton);
    await user.click(screen.getByRole("link", { name: "Actualités" }));
    expect(
      screen.getByText("Mort du patron de Wagner Evgueni Prigojine"),
    ).toBeInTheDocument();
  } else {
    const MenuButton = screen.getByRole("menu");
    await user.click(MenuButton);
    await user.click(screen.getByRole("link", { name: "Actualités" }));
    expect(
      screen.getByText("Mort du patron de Wagner Evgueni Prigojine"),
    ).toBeInTheDocument();
  }
}, 20000);

test("Redirection vers la page Sport", async () => {
  const user = userEvent.setup();
  render(<App />);
  act(() => {
    global.innerWidth = 1600;
    global.innerHeight = 850;
    global.dispatchEvent(new Event("resize"));
  });
  const progressBar = screen.queryByRole("progressbar");
  if (progressBar) {
    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
    const MenuButton = screen.getByRole("menu");
    await user.click(MenuButton);
    await user.click(screen.getByRole("link", { name: "Sport" }));
    expect(screen.getByText("A SPOR CANLI YAYIN")).toBeInTheDocument();
  } else {
    const MenuButton = screen.getByRole("menu");
    await user.click(MenuButton);
    await user.click(screen.getByRole("link", { name: "Sport" }));
    expect(screen.getByText("A SPOR CANLI YAYIN")).toBeInTheDocument();
  }
}, 20000);

test("Redirection vers la page Savoir et culture", async () => {
  const user = userEvent.setup();
  render(<App />);
  act(() => {
    global.innerWidth = 1600;
    global.innerHeight = 850;
    global.dispatchEvent(new Event("resize"));
  });
  const progressBar = screen.queryByRole("progressbar");
  if (progressBar) {
    await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));
    const MenuButton = screen.getByRole("menu");
    await user.click(MenuButton);
    await user.click(screen.getByRole("link", { name: "Savoir et culture" }));
    expect(screen.getByText("📖 Pause littéraire")).toBeInTheDocument();
  } else {
    const MenuButton = screen.getByRole("menu");
    await user.click(MenuButton);
    await user.click(screen.getByRole("link", { name: "Savoir et culture" }));
    expect(screen.getByText("📖 Pause littéraire")).toBeInTheDocument();
  }
}, 20000);

test("Redirection vers la page Mode et Beauté", async () => {
  const user = userEvent.setup();
  render(<App />);
  act(() => {
    global.innerWidth = 1600;
    global.innerHeight = 850;
    global.dispatchEvent(new Event("resize"));
  });
  const progressBar = screen.queryByRole("progressbar");
  if (progressBar) {
    await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));
    const MenuButton = screen.getByRole("menu");
    await user.click(MenuButton);
    await user.click(screen.getByRole("link", { name: "Mode et Beauté" }));
    expect(
      screen.getByText("Haute Couture Week Fall/Winter 2023-2024"),
    ).toBeInTheDocument();
  } else {
    const MenuButton = screen.getByRole("menu");
    await user.click(MenuButton);
    await user.click(screen.getByRole("link", { name: "Mode et Beauté" }));
    expect(
      screen.getByText("Haute Couture Week Fall/Winter 2023-2024"),
    ).toBeInTheDocument();
  }
}, 20000);
