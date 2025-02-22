const handlerWaitingOpponents = async () => {
  const checkGameStatusParams = new URLSearchParams({
    token: window.application.token,
    id: window.application.gameId,
  }).toString();

  const status = await fetch(
    `${BACKEND_URL}/game-status?${checkGameStatusParams}`
  ).then((response) => response.json());

  const statusValue = status["game-status"].status;
  console.log(console.log(status["game-status"]));
  if (statusValue === "waiting-for-your-move") {
    window.application.enemy = status["game-status"].enemy;
    window.application.renderScreen("game-page");
    // console.log('Игра началась!!!')
  }

  if (statusValue === "lose") {
    window.application.renderScreen("lose-page");
  }

  if (statusValue === "win") {
    window.application.renderScreen("win-page");
  }

  if (statusValue === "waiting-for-your-move") {
    return;
  }
};

const renderContentWaitingPage = (container) => {
  const contentTemplate = {
    block: "div",
    cls: ["content", "content__waiting"],
  };

  const contentWaiting = browserTemplateEngine(contentTemplate);

  container.appendChild(contentWaiting);
};

window.application.blocks["contentWaitingPage"] = renderContentWaitingPage;

const renderWaitingBlock = (container) => {
  const waitingBlock = {
    block: "div",
    cls: "waiting-animation",
    content: [
      {
        block: "span",
        cls: [
          "waiting-animation__item",
          "waiting-animation__item_type-secondary",
        ],
        content: [
          {
            block: "span",
            cls: [
              "waiting-animation__item",
              "waiting-animation__item_type-secondary",
            ],
            content: [
              {
                block: "span",
                cls: [
                  "waiting-animation__item",
                  "waiting-animation__item_type-secondary",
                ],
                content: [
                  {
                    block: "span",
                    cls: [
                      "waiting-animation__item",
                      "waiting-animation__item_type-secondary",
                    ],
                    content: [
                      {
                        block: "span",
                        cls: [
                          "waiting-animation__item",
                          "waiting-animation__item_type-secondary",
                        ],
                        content: [
                          {
                            block: "span",
                            cls: [
                              "waiting-animation__item",
                              "waiting-animation__item_type-secondary",
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const waitingBlockAnimation = browserTemplateEngine(waitingBlock);

  container.appendChild(waitingBlockAnimation);
};

window.application.blocks["waitingBlock"] = renderWaitingBlock;

const renderWaitingPageText = (container) => {
  const waitingPageTextTemplate = {
    block: "p",
    cls: "waiting__text",
    content: "Ожидание другого игрока",
  };

  const contentWaiting = browserTemplateEngine(waitingPageTextTemplate);

  container.appendChild(contentWaiting);
};

window.application.blocks["waitingBlockText"] = renderWaitingPageText;

const renderWaitingPage = async () => {
  const fragment = new DocumentFragment();

  window.application.renderBlock("contentWaitingPage", fragment);

  const content = fragment.querySelector(".content");

  await window.application.renderBlock("userInfo", content);

  window.application.renderBlock("waitingBlock", content);

  window.application.renderBlock("waitingBlockText", content);

  const app = document.querySelector(".app");

  app.appendChild(fragment);

  // setInterval( handlerWaitingOpponents, 1000);

  window.application.timers.push(setInterval(handlerWaitingOpponents, 5000));
};

window.application.screens["waitingPage"] = renderWaitingPage;
