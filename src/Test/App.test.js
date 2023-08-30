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

test("Test du rendu composant Home version desktop", async () => {
  
  render(<App />);
  await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
  act(() => {
    global.innerWidth = 1600;
    global.innerHeight = 768;
    global.dispatchEvent(new Event("resize"));
  });
  expect(screen.getByTestId("MenuDesktop")).toBeInTheDocument();
  expect(screen.getByTestId("MenuSecondaireDesktop")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Rechercher")).toBeInTheDocument();
  expect(
    screen.getByRole("link", { description: "Acceuil" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { description: "Shorts" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { description: "Abonnements" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { description: "Bibliothèque" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { description: "Historique" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Helios Deep")).toBeInTheDocument();
  expect(screen.getByText("We Adopted an Orphanage")).toBeInTheDocument();
});

test("Test du rendu composant Home version mobile/tablette", async () => {
  render(<App />);
  act(() => {
    global.innerWidth = 425;
    global.innerHeight = 850;
    global.dispatchEvent(new Event("resize"));
  });
  const progressBar = screen.queryByRole("progressbar");
  if (progressBar) {
    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
    expect(screen.getByTestId("MenuMobile")).toBeInTheDocument();
    expect(screen.getByTestId("MenuSecondaireMobile")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { description: "Acceuil" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { description: "Shorts" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { description: "Bibliothèque" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { description: "Abonnements" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { description: "Historique" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("LateralMenu")).not.toBeInTheDocument();
    expect(screen.getByText("Helios Deep")).toBeInTheDocument();
    //In Home Youtube the version mobile, only videos and shorts_listing are display
    expect(
      screen.queryByText("We Adopted an Orphanage"),
    ).not.toBeInTheDocument();
  } else {
    expect(screen.getByTestId("MenuMobile")).toBeInTheDocument();
    expect(screen.getByTestId("MenuSecondaireMobile")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { description: "Acceuil" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { description: "Shorts" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { description: "Bibliothèque" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { description: "Abonnements" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { description: "Historique" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("LateralMenu")).not.toBeInTheDocument();
    expect(screen.getByText("Helios Deep")).toBeInTheDocument();
    //In Home Youtube the version mobile, only videos and shorts_listing are display
    expect(
      screen.queryByText("We Adopted an Orphanage"),
    ).not.toBeInTheDocument();
  }
});
test("Test du menu déroulant pour la version desktop", async () => {
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
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.click(MenuButton);
    expect(screen.getByTestId("Shadow")).toBeInTheDocument();
    await user.click(screen.getByTestId("Shadow"));
    expect(screen.queryByTestId("Shadow")).not.toBeInTheDocument();
    await user.click(MenuButton);
    expect(screen.getByTestId("Shadow")).toBeInTheDocument();
    await user.click(screen.getByTestId("imgForTranslateMenu"));
    expect(screen.queryByTestId("Shadow")).not.toBeInTheDocument();
  } else {
    const MenuButton = screen.getByRole("menu");
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.click(MenuButton);
    expect(screen.getByTestId("Shadow")).toBeInTheDocument();
    await user.click(screen.getByTestId("Shadow"));
    expect(screen.queryByTestId("Shadow")).not.toBeInTheDocument();
    await user.click(MenuButton);
    expect(screen.getByTestId("Shadow")).toBeInTheDocument();
    await user.click(screen.getByTestId("imgForTranslateMenu"));
    expect(screen.queryByTestId("Shadow")).not.toBeInTheDocument();
  }
});
test("Test du responsive de la page", async () => {
  render(<App />);
  act(() => {
    global.innerWidth = 1600;
    global.innerHeight = 850;
    global.dispatchEvent(new Event("resize"));
  });
  const progressBar = screen.queryByRole("progressbar");
  if (progressBar) {
    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
    expect(screen.getByTestId("MenuDesktop")).toBeInTheDocument();
    expect(screen.queryByTestId("MenuMobile")).not.toBeInTheDocument();
    act(() => {
      global.innerWidth = 500;
      global.innerHeight = 850;
      global.dispatchEvent(new Event("resize"));
    });
    expect(screen.queryByTestId("MenuDesktop")).not.toBeInTheDocument();
    expect(screen.getByTestId("MenuMobile")).toBeInTheDocument();
  } else {
    expect(screen.getByTestId("MenuDesktop")).toBeInTheDocument();
    expect(screen.queryByTestId("MenuMobile")).not.toBeInTheDocument();
    act(() => {
      global.innerWidth = 500;
      global.innerHeight = 850;
      global.dispatchEvent(new Event("resize"));
    });
    expect(screen.queryByTestId("MenuDesktop")).not.toBeInTheDocument();
    expect(screen.getByTestId("MenuMobile")).toBeInTheDocument();
  }
});

test("Redirection vers la page Tendance", async () => {
  const user = userEvent.setup();
  const SecondButton = "musique";
  const ThirdButton = "jeux vidéo";
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
    await user.click(screen.getByRole("link", { name: "Tendances" }));
    expect(screen.getByText("Armored Core 6 Is Fantastic")).toBeInTheDocument();
    expect(
      screen.queryByText("Oliver Anthony - Rich Men North Of Richmond"),
    ).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: SecondButton.toLocaleUpperCase() }),
    );
    expect(
      screen.getByText("Oliver Anthony - Rich Men North Of Richmond"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Armored Core 6 Is Fantastic"),
    ).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: ThirdButton.toLocaleUpperCase() }),
    );
    expect(screen.getByText("skibidi toilet 58")).toBeInTheDocument();
    expect(screen.getByText("Armored Core 6 Is Fantastic")).toBeInTheDocument();
  } else {
    const MenuButton = screen.getByRole("menu");
    await user.click(MenuButton);
    await user.click(screen.getByRole("link", { name: "Tendances" }));
    expect(screen.getByText("Armored Core 6 Is Fantastic")).toBeInTheDocument();
    expect(
      screen.queryByText("Oliver Anthony - Rich Men North Of Richmond"),
    ).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: SecondButton.toLocaleUpperCase() }),
    );
    expect(
      screen.getByText("Oliver Anthony - Rich Men North Of Richmond"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Armored Core 6 Is Fantastic"),
    ).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: ThirdButton.toLocaleUpperCase() }),
    );
    expect(screen.getByText("skibidi toilet 58")).toBeInTheDocument();
    expect(screen.getByText("Armored Core 6 Is Fantastic")).toBeInTheDocument();
  }
  //screen.debug()
}, 60000);
test("Redirection vers la page musique", async () => {
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
    await user.click(screen.getByRole("link", { name: "Musique" }));
    expect(screen.getByText("Classements")).toBeInTheDocument();
    expect(screen.getByText("Nouveaux clips")).toBeInTheDocument();
    expect(screen.getByText("Playlist")).toBeInTheDocument();
    expect(screen.getByText("Performances Uniques")).toBeInTheDocument();
  } else {
    const MenuButton = screen.getByRole("menu");
    await user.click(MenuButton);
    await user.click(screen.getByRole("link", { name: "Musique" }));
    expect(screen.getByText("Classements")).toBeInTheDocument();
    expect(screen.getByText("Nouveaux clips")).toBeInTheDocument();
    expect(screen.getByText("Playlist")).toBeInTheDocument();
    expect(screen.getByText("Performances Uniques")).toBeInTheDocument();
  }
  //screen.debug()
}, 60000);
