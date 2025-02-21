const renderContentPageGameBlock = (container) => {
  const contentPageGameTemplate = {
    block: 'div',
    cls: 'content',
  };

  const content = browserTemplateEngine(contentPageGameTemplate);

  container.appendChild(content);
};

window.application.blocks['content'] = renderContentPageGameBlock;

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
            content: window.application.me,
          },
          {
            block: 'img',
            cls: 'nickname-image-wrapper__avatar',
            attrs: {
              alt: 'avatar',
              src: './components/page-game/images-page-game/ava-one.png',
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
              src: './components/page-game/images-page-game/ava-two.png',
            },
          },
          {
            block: 'p',
            cls: 'nickname-image-wrapper__text',
            content: window.application.enemy.login,
          },
        ],
      },
    ],
  };

  const header = browserTemplateEngine(headerTemplate);

  container.appendChild(header);

};

window.application.blocks['rivals-wrapper'] = renderHeader;

const renderImageTimer = (container) => {
  const imageTimerTemplate = {
    block: 'div',
    cls: ['image-timer', 'image-timer__position'],
    content: [
      {
        block: 'div',
        cls: 'image-timer__background',
        content: 
          {
            block: 'p',
            cls: 'image-timer__text-timer',
            content: '120',
          },
      },
    ],
  };
  const imageTimer = browserTemplateEngine(imageTimerTemplate);
 
  container.appendChild(imageTimer);

  const textTimer = imageTimer.querySelector('.image-timer__text-timer');

  let timerGame = 120;

  const timer = setInterval( async ()=> {
    timerGame --;
    textTimer.textContent = timerGame + 's';
    if (timerGame <= 0) {
      clearInterval(timer);

      const figures = ['rock', 'scissors', 'paper'];
      const randomFigure = figures[Math.floor(Math.random() * figures.length )];
      console.log(randomFigure);
      const token = window.application.token;
      const gameId = window.application.gameId;
      const gameMove = randomFigure;
      await game({token, gameId, gameMove});  
    }
  }, 1000);
};

window.application.blocks['image-timer'] = renderImageTimer;

const renderImageFigureInitial = (container) => {
  const imageFigureInitialTemplate = {
    block: 'div',
    cls: 'game-wrapper__image-figure-initial',
    content: [
      {
        block: 'img',
        attrs: {
          alt: 'Rock',
          src: './components/page-game/images-page-game/rock-initial.svg',
        },
      },
    ],
  };

  const imageFigureInitial = browserTemplateEngine(imageFigureInitialTemplate);

  container.appendChild(imageFigureInitial);
};

window.application.blocks['game-wrapper__image-figure-initial'] = renderImageFigureInitial;

const renderTitlePageGame = (container) => {
  const titlePageGameTemplate = {
    block: 'h2',
    cls: ['title', 'title__position'],
    content: 'Choose the position of your hands',
  };

  const  titlePageGame = browserTemplateEngine(titlePageGameTemplate);

  container.appendChild(titlePageGame);
};

window.application.blocks['title'] = renderTitlePageGame;

const renderThreeButton = (container) => {
  const threeButtonTemplate = {
    block: 'div',
    cls: ['three-buttons', 'three-buttons__position'],
    content: [
      {
        block: 'button',
        cls: ['button', 'button_theme_third'],
        attrs : {
          'data-figure': 'rock'
        },
        content: [
          {
            block: 'img',
            cls: 'button__image-size',
            attrs: {
              alt: 'Rock',
              src: './components/page-game/images-page-game/rock.svg',
            },
          },
          {
            block: 'span',
            cls: 'button__text',
            content: 'Камень',
          },
        ],
      },
      {
        block: 'button',
        cls: ['button', 'button_theme_third'],
        attrs : {
          'data-figure': 'scissors'
        },
        content: [
          {
            block: 'img',
            cls: ['button__image-size'], 
            attrs: {
              alt: 'Scissors',
              src: './components/page-game/images-page-game/scissors.svg',
            },
          },
          {
            block: 'span',
            cls: 'button__text',
            content: 'Ножницы',
          },
        ],
      },
      {
        block: 'button',
        cls: ['button', 'button_theme_third',],
        attrs : {
          'data-figure': 'paper'
        },
        content: [
          {
            block: 'img',
            cls: 'button__image-size',
            attrs: {
              alt: 'Paper',
              src: './components/page-game/images-page-game/paper.svg',
            },
          },
          {
            block: 'span',
            cls: 'button__text',
            content: 'Бумага',
          },
        ],
      },
    ],
  };

  const  threeButton = browserTemplateEngine(threeButtonTemplate);

  container.appendChild(threeButton);

  const handlerGame =  async (event) => {

    const targetBlock = event.target.closest('.button_theme_third');
    if (!targetBlock && !event.target.classList.contains('button_theme_third') ) return;
      
    figureName = event.target.closest('button').dataset.figure;
    
    console.log(figureName);

    window.application.gameMove = figureName;

    const token = window.application.token;
    const gameId = window.application.gameId;
    const gameMove = figureName
    await game ({token, gameId, gameMove});
  };
  
    threeButton.addEventListener('click', handlerGame);

};

window.application.blocks['three-buttons'] = renderThreeButton;

function renderGamePage() {
  const fragment = new DocumentFragment();

  window.application.renderBlock('content', fragment);

  const content = fragment.querySelector('.content');

  window.application.renderBlock('rivals-wrapper', content);
  window.application.renderBlock('image-timer', content);
  window.application.renderBlock('game-wrapper__image-figure-initial', content);
  window.application.renderBlock('title', content);
  window.application.renderBlock('three-buttons', content);
  
  const app = document.querySelector('.app');

  app.appendChild(fragment);
}

window.application.screens['game-page'] = renderGamePage;

// window.application.renderScreen('game-page');




