const renderHeader = (container) => {
    const headerTemplate = {
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
  
    const header = browserTemplateEngine(headerTemplate);
  
    container.appendChild(header);
  };
  
  window.application.blocks['rivals-wrapper'] = renderHeader;
  
  const renderGameWrapper = (container) => {
    const gameWrapperTemplate = {
      block: 'div',
      cls: ['game-wrapper', 'game-wrapper__position'],
      content: [
        {
          block: 'div',
          cls: 'image-timer',
          content: [
            {
              block: 'div',
              cls: 'image-timer__background',
              content: [
                {
                  block: 'p',
                  cls: 'image-timer__text-timer',
                  content: '2s',
                },
              ],
            },
          ],
        },
        {
          block: 'div',
          cls: 'game-wrapper__image-figure-initial',
          content: [
            {
              block: 'img',
              attrs: {
                alt: 'Rock',
                src: '/components/page-game/images-page-game/Image-figure-initial.svg',
              },
            },
          ],
        },
        {
          block: 'h2',
          cls: ['title', 'title__position'],
          content: 'Choose the position of your hands',
        },
        {
          block: 'div',
          cls: ['three-buttons', 'three-buttons__position'],
          content: [
            {
              block: 'button',
              cls: ['button', 'button_theme_third'],
              content: [
                {
                  block: 'img',
                  cls: 'button__image-size',
                  attrs: {
                    alt: 'Rock',
                    src: '/components/page-game/images-page-game/rock.svg',
                  },
                },
                {
                  block: 'span',
                  cls: 'button__text',
                  content: 'Rock',
                },
              ],
            },
            {
              block: 'button',
              cls: ['button', 'button_theme_third'],
              content: [
                {
                  block: 'img',
                  cls: 'button__image-size',
                  attrs: {
                    alt: 'Scissors',
                    src: '/components/page-game/images-page-game/scissors.svg',
                  },
                },
                {
                  block: 'span',
                  cls: 'button__text',
                  content: 'Scissors',
                },
              ],
            },
            {
              block: 'button',
              cls: ['button', 'button_theme_third'],
              content: [
                {
                  block: 'img',
                  cls: 'button__image-size',
                  attrs: {
                    alt: 'Paper',
                    src: '/components/page-game/images-page-game/paper.svg',
                  },
                },
                {
                  block: 'span',
                  cls: 'button__text',
                  content: 'Paper',
                },
              ],
            },
          ],
        },
        {
          block: 'button',
          cls: ['button', 'button__position', 'button_theme_secondary'],
          content: 'Cancel',
        },
      ],
    };
  
    const gameWrapper = browserTemplateEngine(gameWrapperTemplate);
  
    container.appendChild(gameWrapper);
  };
  
  window.application.blocks['game-wrapper'] = renderGameWrapper;
  
  const renderContentPageGameBlock = (container) => {
    const contentPageGameTemplate = {
      block: 'div',
      cls: 'content',
    };
  
    const content = browserTemplateEngine(contentPageGameTemplate);
  
    container.appendChild(content);
  };
  
  window.application.blocks['content'] = renderContentPageGameBlock;
  
  function renderGamePage() {
    const fragment = new DocumentFragment();
  
    window.application.renderBlock('content', fragment);
  
    const content = fragment.querySelector('.content');
  
    window.application.renderBlock('rivals-wrapper', content);
    window.application.renderBlock('game-wrapper', content);
  
    const app = document.querySelector(".app");
  
    app.appendChild(fragment);
  }
  
  window.application.screens['game-page'] = renderGamePage;
  
  
  