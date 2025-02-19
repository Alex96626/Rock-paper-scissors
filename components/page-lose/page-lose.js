const renderContentLoseBlock = (container) => {
  const contentLoseTemplate = {
    block: "div",
    cls: "content",
  };

  const content = browserTemplateEngine(contentLoseTemplate);

  container.appendChild(content);
};

window.application.blocks["content"] = renderContentLoseBlock;

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
              src: "/components/page-game/images-page-game/ava-one.png",
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
              src: "/components/page-game/images-page-game/ava-two.png",
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

  const headerLosePage = browserTemplateEngine(headerLosePageTemplate);

  container.appendChild(headerLosePage);
};

window.application.blocks["rivals-wrapper"] = renderHeaderLosePage;

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
              src: "/components/page-lose/images-page-lose/rock-win.png",
            },
          },
          {
            block: "p",
            cls: "figure-name-rival__text",
            content: "Rock",
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
    imageFigureRival.src = "/components/page-lose/images-page-lose/rival-paper-win.svg";

    textFigureRival.textContent = "Paper";
  }

  if (figurePlayer === "scissors") {
    imageFigureRival.src ="/components/page-lose/images-page-lose/rival-rock-win.svg";

    textFigureRival.textContent = "Rock";
  }

  if (figurePlayer === "paper") {
    imageFigureRival.src = "/components/page-lose/images-page-lose/rival-scissors-win.svg";

    textFigureRival.textContent = "Scissors";
  }
};

window.application.blocks["figureNameRival"] = renderFigureNameRival;

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
    imageFigurePlayer.src = "/components/page-lose/images-page-lose/player-rock-lose.svg";

    textFigurePlayer.textContent = "Rock";
  }

  if (figurePlayer === "scissors") {
    imageFigurePlayer.src = "/components/page-lose/images-page-lose/player-scissors-lose.svg";

    textFigurePlayer.textContent = "Scissors";
  }

  if (figurePlayer === "paper") {
    imageFigurePlayer.src = "/components/page-lose/images-page-lose/player-paper-lose.svg";

    textFigurePlayer.textContent = "Paper";
  }
};

window.application.blocks["figureNamePlayer"] = renderFigureNamePlayerLose;

const renderResultGameLose = (container) => {
  const resultGameLoseTemplate = {
    block: "div",
    cls: ["result-game", "result-game__position"],
    content: [
      {
        block: "p",
        cls: "result-game__text",
        content: "You lost",
      },
      {
        block: "img",
        attrs: {
          alt: "lose",
          src: "/components/page-lose/images-page-lose/image-lose.svg",
        },
      },
    ],
  };

  const resultGameLose = browserTemplateEngine(resultGameLoseTemplate);

  container.appendChild(resultGameLose);
};

window.application.blocks["result-game"] = renderResultGameLose;

const renderButtonsPageLose = (container) => {
  const buttonsPageLoseTemplate = {
    block: "div",
    cls: ["buttons-page-finish", "buttons-page-finish__position"],
    content: [
      {
        block: "button",
        cls: ["button", "button_theme_primary"],
        content: "Next round",
      },
      {
        block: "button",
        cls: ["button", "button_theme_secondary"],
        content: "Cancel",
      },
    ],
  };

  const buttonsPageLose = browserTemplateEngine(buttonsPageLoseTemplate);

  container.appendChild(buttonsPageLose);

  const buttonRestart = buttonsPageLose.querySelector(".button_theme_primary");
  const buttonLobby = buttonsPageLose.querySelector(".button_theme_secondary");

  buttonRestart.addEventListener("click", () => {
    console.log("клик рестарт");

    window.application.renderScreen("game-page");
  });

  buttonLobby.addEventListener("click", () => {
    console.log("клик лобби");

    window.application.renderScreen("lobbyPage");
  });
};

window.application.blocks["buttons-page-finish"] = renderButtonsPageLose;

function renderLosePage() {
  const fragment = new DocumentFragment();

  window.application.renderBlock("content", fragment);

  const content = fragment.querySelector(".content");

  window.application.renderBlock("rivals-wrapper", content);
  window.application.renderBlock("figureNameRival", content);
  window.application.renderBlock("figureNamePlayer", content);
  window.application.renderBlock("result-game", content);
  window.application.renderBlock("buttons-page-finish", content);

  const app = document.querySelector(".app");

  app.appendChild(fragment);
}

window.application.screens["lose-page"] = renderLosePage;
