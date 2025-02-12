const renderContentWinBlock = (container) => {
    const contentWinTemplate = {
      block: 'div',
      cls: 'content',
    };
  
    const content = browserTemplateEngine(contentWinTemplate);
  
    container.appendChild(content);
  };
  
  window.application.blocks['content'] = renderContentWinBlock;
  
  const renderHeaderWin = (container) => {
    const headerWinTemplate = {
      block: 'header',
      cls: 'rivals-wrapper',
      content: [
        {
          block: 'div',
          cls: ['nickname-image-wrapper', 'nickname-image-wrapper__player'],
          content: [
            {
              block: 'p',
              cls: 'nickname-image-wrapper__text',
              content: 'You',
            },
            {
              block: 'img',
              cls: 'nickname-image-wrapper__avatar',
              attrs: {
                alt: 'avatar',
                src: '/components/page-game/images-page-game/ava-one.png',
              },
            },
          ],
        },
        {
          block: 'div',
          cls: 'rivals-wrapper__text-VS',
          content: 'VS',
        },
        {
          block: 'div',
          cls: ['nickname-image-wrapper', 'nickname-image-wrapper__rival'],
          content: [
            {
              block: 'img',
              cls: 'nickname-image-wrapper__avatar',
              attrs: {
                alt: 'avatar',
                src: '/components/page-game/images-page-game/ava-two.png',
              },
            },
            {
              block: 'p',
              cls: 'nickname-image-wrapper__text',
              content: 'Machalka',
            },
          ],
        },
      ],
    };
  
    const headerWin = browserTemplateEngine(headerWinTemplate);
  
    container.appendChild(headerWin);
  };
  
  window.application.blocks['rivals-wrapper'] = renderHeaderWin;
  
  const renderFigureNameRivals = (container) => {
    const figureNameRivalsTemplate = {
      block: 'div',
      cls: 'figure-name-rivals__position',
      content: [
        {
          block: 'div',
          cls: 'figure-name-rivals__image',
          content: [
            {
              block: 'img',
              attrs: {
              alt: 'figure',
                src: '/components/page-win/images-page-win/scissors.png',
              },
            },
          ],
        },
        {
          block: 'p',
          cls: 'figure-name-rivals__text',
          content: 'Scissors',
        },
      ],   
    };
  
    const figureNameRivals = browserTemplateEngine(figureNameRivalsTemplate);
  
    container.appendChild(figureNameRivals);
  };
  
  window.application.blocks['figureNameRivals'] = renderFigureNameRivals;
  
  const renderFigureNamePlayer = (container) => {
    const figureNamePlayerTemplate = {
      block: 'div',
      cls: 'figure-name-player__position',
      content: [
        {
          block: 'div',
          cls: 'figure-name-player__image',
          content: [
            {
              block: 'p',
              cls: 'figure-name-player__text',
              content: 'Rock',
            },
          ],
        },
      ],
    };
  
    const figureNamePlayer = browserTemplateEngine(figureNamePlayerTemplate);
  
    container.appendChild(figureNamePlayer);
  };
  
  window.application.blocks['figureNamePlayer'] = renderFigureNamePlayer;
  
  const renderResultGame = (container) => {
    const resultGameTemplate = {
      block: 'div',
      cls: ['result-game', 'result-game__position'],
      content: [
        {
          block: 'p',
          cls: 'result-game__text',
          content: 'You won',
        },
        {
          block: 'img',
          attrs: {
            alt: 'fire',
            src: '/components/page-win/images-page-win/fire.svg',
          },
        },
      ],
    };
  
    const resultGame = browserTemplateEngine(resultGameTemplate);
  
    container.appendChild(resultGame);
  
  };
  
  window.application.blocks['result-game'] = renderResultGame;
  
  const renderButtonsPageWin = (container) => {
    const buttonsPageWinTemplate = {
      block: 'div',
      cls: ['buttons-page-win', 'buttons-page-win__position'],
      content: [
        {
          block: 'button',
          cls: ['button', 'button_theme_primary'],
          content: 'Next round',
        },
        {
          block: 'button',
          cls: ['button', 'button__position', 'button_theme_secondary'],
          content: 'Cancel',
        },
      ],
    };
  
    const buttonsPageWin = browserTemplateEngine(buttonsPageWinTemplate);
  
    container.appendChild(buttonsPageWin);
  };
  
  window.application.blocks['buttons-page-win'] = renderButtonsPageWin ;
  
  function renderWinPage() {
    const fragment = new DocumentFragment();
  
    window.application.renderBlock('content', fragment);
  
    const content = fragment.querySelector('.content');
  
    window.application.renderBlock('rivals-wrapper', content);
    window.application.renderBlock('figureNameRivals', content);
    window.application.renderBlock('figureNamePlayer', content);
    window.application.renderBlock('result-game', content);
    window.application.renderBlock('buttons-page-win', content);
  
    const app = document.querySelector('.app');
  
    app.appendChild(fragment);
  }
  
  window.application.screens['win-page'] = renderWinPage;
  
  // window.application.renderScreen('win-page');
  