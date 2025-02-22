const renderContentWinBlock = (container) => {
  const contentWinTemplate = {
    block: "div",
    cls: "content",
  };

  const content = browserTemplateEngine(contentWinTemplate);

  container.appendChild(content);
};

window.application.blocks["content"] = renderContentWinBlock;

const renderHeaderWinPage = (container) => {
  const headerWinPageTemplate = {
    block: "header",
    cls: "rivals-wrapper",
    content: [
      {
        block: "div",
        cls: ["nickname-image-wrapper", "nickname-image-wrapper__player"],
        content: [
          {
            block: "p",
            cls: "nickname-image-wrapper__text",
            content: window.application.me,
          },
          {
            block: "img",
            cls: "nickname-image-wrapper__avatar",
            attrs: {
              alt: "avatar",
              src: "./components/page-game/images-page-game/ava-one.png",
            },
          },
        ],
      },
      {
        block: "div",
        cls: "rivals-wrapper__text-VS",
        content: "VS",
      },
      {
        block: "div",
        cls: ["nickname-image-wrapper", "nickname-image-wrapper__rival"],
        content: [
          {
            block: "img",
            cls: "nickname-image-wrapper__avatar",
            attrs: {
              alt: "avatar",
              src: "./components/page-game/images-page-game/ava-two.png",
            },
          },
          {
            block: "p",
            cls: "nickname-image-wrapper__text",
            content: window.application.enemy,
          },
        ],
      },
    ],
  };

  const headerWinPage = browserTemplateEngine(headerWinPageTemplate);

  container.appendChild(headerWinPage);
};

window.application.blocks["rivals-wrapper"] = renderHeaderWinPage;

const renderFigureNameRivals = (container) => {
  const figureNameRivalsTemplate = {
    block: "div",
    cls: "figure-name-rivals__position",
    content: [
      {
        block: "div",
        cls: "figure-name-rivals__image",
        content: [
          {
            block: "img",
            cls: "image-figure-rival",
            attrs: {
              alt: "figure",
              src: "",
            },
          },
        ],
      },
      {
        block: "p",
        cls: "figure-name-rivals__text",
        content: "",
      },
    ],
  };

  const figureNameRivals = browserTemplateEngine(figureNameRivalsTemplate);

  container.appendChild(figureNameRivals);

  const imageFigureRival = figureNameRivals.querySelector(
    ".image-figure-rival"
  );
  const textFigureRival = figureNameRivals.querySelector(
    ".figure-name-rivals__text"
  );

  const figurePlayer = window.application.gameMove;

  if (figurePlayer === "rock") {
    imageFigureRival.src = "./components/page-win/images-page-win/rival-scissors-lose.svg";

    textFigureRival.textContent = "Ножницы";
  }

  if (figurePlayer === "scissors") {
    imageFigureRival.src = "./components/page-win/images-page-win/rival-paper-lose.svg";

    textFigureRival.textContent = "Бумага";
  }

  if (figurePlayer === "paper") {
    imageFigureRival.src = "./components/page-win/images-page-win/rival-rock-lose.svg";

    textFigureRival.textContent = "Камень";
  }
};

window.application.blocks["figureNameRivals"] = renderFigureNameRivals;

const renderFigureNamePlayerWin = (container) => {
  const figureNamePlayerTemplate = {
    block: "div",
    cls: "figure-name-player-win__position",
    content: [
      {
        block: "div",
        cls: "figure-name-player-border",
        content: [
          {
            block: "img",
            cls: "figure-name-player-win",
            attrs: {
              alt: "figure",
              src: "",
            },
          },
          {
            block: "p",
            cls: "figure-name-player-win__text",
            content: "",
          },
        ],
      },
    ],
  };

  const figureNamePlayer = browserTemplateEngine(figureNamePlayerTemplate);

  container.appendChild(figureNamePlayer);

  const imageFigurePlayer = figureNamePlayer.querySelector(
    ".figure-name-player-win"
  );
  const textFigurePlayer = figureNamePlayer.querySelector(
    ".figure-name-player-win__text"
  );

  const figurePlayer = window.application.gameMove;

  if (figurePlayer === "rock") {
    imageFigurePlayer.src = "./components/page-win/images-page-win/player-rock-win.svg";

    textFigurePlayer.textContent = "Камень";
  }

  if (figurePlayer === "scissors") {
    imageFigurePlayer.src = "./components/page-win/images-page-win/player-scissors-win.svg";

    textFigurePlayer.textContent = "Ножницы";
  }

  if (figurePlayer === "paper") {
    imageFigurePlayer.src = "./components/page-win/images-page-win/player-paper-win.svg";

    textFigurePlayer.textContent = "Бумага";
  }
};

window.application.blocks["figureNamePlayer"] = renderFigureNamePlayerWin;

const renderResultGame = (container) => {
  const resultGameTemplate = {
    block: "div",
    cls: ["result-game", "result-game__position"],
    content: [
      {
        block: "p",
        cls: "result-game__text",
        content: "Ты выиграл",
      },
      {
        block: "img",
        attrs: {
          alt: "fire",
          src: "./components/page-win/images-page-win/fire.svg",
        },
      },
    ],
  };

  const resultGame = browserTemplateEngine(resultGameTemplate);

  container.appendChild(resultGame);
};

window.application.blocks["result-game"] = renderResultGame;

const renderButtonsPageWin = (container) => {
  const buttonsPageWinTemplate = {
    block: "div",
    cls: ["buttons-page-win", "buttons-page-win__position"],
    content: [
      {
        block: "button",
        cls: ["button", "button_theme_primary"],
        content: "играть снова",
      },
      {
        block: "button",
        cls: ["button", "button_theme_secondary"],
        content: "В лобби",
      },
    ],
  };

  const buttonsPageWin = browserTemplateEngine(buttonsPageWinTemplate);

  container.appendChild(buttonsPageWin);

  const buttonRestart = buttonsPageWin.querySelector(".button_theme_primary");
  const buttonLobby = buttonsPageWin.querySelector(".button_theme_secondary");

  buttonRestart.addEventListener("click", async () => {
    const startMatch = await getStartMatch(window.application.token);
    window.application.gameId = startMatch[`player-status`].game.id;
    window.application.renderScreen('waitingPage');
  });

  buttonLobby.addEventListener("click", () => {
    window.application.renderScreen("lobbyPage");
  });
};

window.application.blocks["buttons-page-win"] = renderButtonsPageWin;

function renderWinPage() {
  const fragment = new DocumentFragment();

  window.application.renderBlock("content", fragment);

  const content = fragment.querySelector(".content");

  window.application.renderBlock("rivals-wrapper", content);

  window.application.renderBlock("figureNameRivals", content);
  window.application.renderBlock("figureNamePlayer", content);
  window.application.renderBlock("result-game", content);
  window.application.renderBlock("buttons-page-win", content);

  const app = document.querySelector(".app");

  app.appendChild(fragment);
}

window.application.screens["win-page"] = renderWinPage;
