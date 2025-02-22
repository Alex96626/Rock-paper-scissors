const renderContentLoseBlock = (container) => {
  const contentLoseTemplate = {
    block: "div",
    cls: "content",
  };

  const content = browserTemplateEngine(contentLoseTemplate);

  container.appendChild(content);
};

window.application.blocks["content-lose"] = renderContentLoseBlock;

const renderHeaderLosePage = (container) => {
  const headerLosePageTemplate = {
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
            content: window.application.enemy.login,
          },
        ],
      },
    ],
  };

  const headerLosePage = browserTemplateEngine(headerLosePageTemplate);

  container.appendChild(headerLosePage);
};

window.application.blocks["rivals-wrapper-lose"] = renderHeaderLosePage;

const renderFigureNameRival = (container) => {
  const figureNameRivalTemplate = {
    block: "div",
    cls: "figure-name-rival__position",
    content: [
      {
        block: "div",
        cls: "figure-name-rival-border",
        content: [
          {
            block: "img",
            cls: "figure-name-rival",
            attrs: {
              alt: "figure",
              src: "./components/page-lose/images-page-lose/rock-win.png",
            },
          },
          {
            block: "p",
            cls: "figure-name-rival__text",
            content: "",
          },
        ],
      },
    ],
  };

  const figureNameRival = browserTemplateEngine(figureNameRivalTemplate);

  container.appendChild(figureNameRival);

  const imageFigureRival = figureNameRival.querySelector(".figure-name-rival");
  const textFigureRival = figureNameRival.querySelector(
    ".figure-name-rival__text"
  );

  const figurePlayer = window.application.gameMove;

  if (figurePlayer === "rock") {
    imageFigureRival.src = "./components/page-lose/images-page-lose/rival-paper-win.svg";

    textFigureRival.textContent = "Бумага";
  }

  if (figurePlayer === "scissors") {
    imageFigureRival.src ="./components/page-lose/images-page-lose/rival-rock-win.svg";

    textFigureRival.textContent = "Камень";
  }

  if (figurePlayer === "paper") {
    imageFigureRival.src = "./components/page-lose/images-page-lose/rival-scissors-win.svg";

    textFigureRival.textContent = "Ножницы";
  }
};

window.application.blocks["figureNameRival-lose"] = renderFigureNameRival;

const renderFigureNamePlayerLose = (container) => {
  const figureNamePlayerTemplate = {
    block: "div",
    cls: "figure-name-player__position",
    content: [
      {
        block: "div",
        cls: "figure-name-player__image",
        content: [
          {
            block: "img",
            cls: "image-figure-player",
            attrs: {
              alt: "figure",
              src: "",
            },
          },
        ],
      },
      {
        block: "p",
        cls: "figure-name-player__text",
        content: "",
      },
    ],
  };

  const figureNamePlayer = browserTemplateEngine(figureNamePlayerTemplate);

  container.appendChild(figureNamePlayer);

  const imageFigurePlayer = figureNamePlayer.querySelector(
    ".image-figure-player"
  );
  const textFigurePlayer = figureNamePlayer.querySelector(
    ".figure-name-player__text"
  );

  const figurePlayer = window.application.gameMove;

  if (figurePlayer === "rock") {
    imageFigurePlayer.src = "./components/page-lose/images-page-lose/player-rock-lose.svg";

    textFigurePlayer.textContent = "Камень";
  }

  if (figurePlayer === "scissors") {
    imageFigurePlayer.src = "./components/page-lose/images-page-lose/player-scissors-lose.svg";

    textFigurePlayer.textContent = "Ножницы";
  }

  if (figurePlayer === "paper") {
    imageFigurePlayer.src = "./components/page-lose/images-page-lose/player-paper-lose.svg";

    textFigurePlayer.textContent = "Бумага";
  }
};

window.application.blocks["figureNamePlayer-lose"] = renderFigureNamePlayerLose;

const renderResultGameLose = (container) => {
  const resultGameLoseTemplate = {
    block: "div",
    cls: ["result-game", "result-game__position"],
    content: [
      {
        block: "p",
        cls: "result-game__text",
        content: "Ты проиграл",
      },
      {
        block: "img",
        attrs: {
          alt: "lose",
          src: "./components/page-lose/images-page-lose/image-lose.svg",
        },
      },
    ],
  };

  const resultGameLose = browserTemplateEngine(resultGameLoseTemplate);

  container.appendChild(resultGameLose);
};

window.application.blocks["result-game-lose"] = renderResultGameLose;

const renderButtonsPageLose = (container) => {
  const buttonsPageLoseTemplate = {
    block: "div",
    cls: ["buttons-page-finish", "buttons-page-finish__position"],
    content: [
      {
        block: "button",
        cls: ["button", "button_theme_primary"],
        content: "Играть снова",
      },
      {
        block: "button",
        cls: ["button", "button_theme_secondary"],
        content: "В лобби",
      },
    ],
  };

  const buttonsPageLose = browserTemplateEngine(buttonsPageLoseTemplate);

  container.appendChild(buttonsPageLose);

  const buttonRestart = buttonsPageLose.querySelector(".button_theme_primary");
  const buttonLobby = buttonsPageLose.querySelector(".button_theme_secondary");

  buttonRestart.addEventListener("click", async () => {
    console.log("клик рестарт");
    const startMatch = await getStartMatch(window.application.token);
    window.application.gameId = startMatch[`player-status`].game.id;
    window.application.renderScreen('waitingPage');
  });

  buttonLobby.addEventListener("click", () => {
    console.log("клик лобби");

    window.application.renderScreen("lobbyPage");
  });
};

window.application.blocks["buttons-page-lose-finish"] = renderButtonsPageLose;

function renderLosePage() {
  const fragment = new DocumentFragment();

  window.application.renderBlock("content-lose", fragment);

  const content = fragment.querySelector(".content");

  window.application.renderBlock("rivals-wrapper-lose", content);
  window.application.renderBlock("figureNameRival-lose", content);
  window.application.renderBlock("figureNamePlayer-lose", content);
  window.application.renderBlock("result-game-lose", content);
  window.application.renderBlock("buttons-page-lose-finish", content);

  const app = document.querySelector(".app");

  app.appendChild(fragment);
}

window.application.screens["lose-page"] = renderLosePage;
