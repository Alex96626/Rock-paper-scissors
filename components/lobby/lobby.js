const getPlayerList = async () => {
  const params = new URLSearchParams({
    'token': window.application.token,
  }).toString();
  
  return fetch(`${BACKEND_URL}/player-list?${params}`)
  .then(response => response.json())
  .then(data => data.list); 
}

const handlerUpdateOpponents = async () => {
  const currentOpponentsList = document.querySelector('.opponents');
    
    const opponentsList = await getPlayerList(); 
    
    const opponentsListWithoutPlayer = Object.values(opponentsList).filter((opponent) => opponent.you === undefined);

    const newOpponentsList = new DocumentFragment();

    for (const opponent of opponentsListWithoutPlayer) {
      newOpponentsList.append(browserTemplateEngine(oppontntTemplate(opponent)))
    }

    currentOpponentsList.innerHTML = '';
    currentOpponentsList.appendChild(newOpponentsList);
}

const renderContentBlockLobby = (container) => {
  const contentTemplate = { 
    block: 'div', 
    cls: 'content',
  };

  const contentLobby = browserTemplateEngine(contentTemplate);
  
  container.appendChild(contentLobby);
}

window.application.blocks['contentLobby'] = renderContentBlockLobby; 

const renderUserInfo = async (container) => {
  const currentOpponentsList = await getPlayerList();
  const getPlayer = currentOpponentsList.find(player => player.you);
  const playerName = getPlayer.login;

    const userInfoTemplate = { 
      block: 'header', 
      cls: 'user-info',
      content: [
        {
            block: 'p',
            cls: 'user-info__nickname',
            content: playerName,
        },
        {
          block: 'img',
          cls: 'user-info__avatar',
          attrs: {
            alt: '',
            src: '',
          }
        }
      ]
    }
    
    const userInfo = browserTemplateEngine(userInfoTemplate);
  
    container.appendChild(userInfo);
}
  
window.application.blocks['userInfo'] = renderUserInfo;

const renderTitleLobby = (container) => {
    const titleTemplate = { 
      block: 'h2',
      cls: ['title', 'title_lobby'],
      content: 'Выберите опонента',
    };
  
    const title = browserTemplateEngine(titleTemplate);
  
    container.appendChild(title);
}

window.application.blocks['titleLobby'] = renderTitleLobby;

const renderTextLobby = (container) => {
  const textLobbyTemplate = { 
    block: 'p',
    cls: ['rps-text', 'rps-text__lobby'],
    content: 'Битва на большой арене под взгляды миллиона спеткторов',
  };

  const text = browserTemplateEngine(textLobbyTemplate);

  container.appendChild(text);
}
  
window.application.blocks['textLobby'] = renderTextLobby;

const oppontntTemplate = (opponentData) => {
  return {
    block: 'li',
    cls: 'opponents__item',
    content: [
      {
        block: 'span',
        cls: 'opponents__username',
        content: opponentData?.login
      }
    ]
  }
}

const renderOpponents = async (container) => {
  const opponentsList = await getPlayerList(); 
  const opponentsListWithoutPlayer = Object.values(opponentsList).filter((opponent) => opponent.you === undefined);

  const currentOpponentsList = document.querySelector('.opponents');
  if(currentOpponentsList) {
    currentOpponentsList.remove();
  }

  const opponentsTemplate = { 
        block: 'ul',
        cls: 'opponents',
        content: opponentsListWithoutPlayer.map( (opponent) =>oppontntTemplate(opponent))
  };

  const opponents = browserTemplateEngine(opponentsTemplate);
  
  container.appendChild(opponents);
}

window.application.blocks['opponents'] = renderOpponents;

const renderStartMatchButton = (container) => {
  const startMatchButtonTemplate = { 
    block: 'button',
    cls: ['button', 'button_theme-primary', 'button_start-match'],
    content: 'Начать битву',
  };

  const startMatchButton = browserTemplateEngine(startMatchButtonTemplate);

  startMatchButton.addEventListener('click', async () => {
    const token =  window.application.token;
    const startMatch = await getStartMatch(token);

    if (startMatch.status === 'error') {
      alert(startMatch.message);
      return;
    }

    window.application.gameId = startMatch[`player-status`].game.id;  

    window.application.renderScreen('waitingPage');
  })

  container.appendChild(startMatchButton);
}

window.application.blocks['startMatch'] = renderStartMatchButton;

const renderLobbyPage = async () => {
  const fragment = new DocumentFragment();

  window.application.renderBlock('contentLobby', fragment);

  const content = fragment.querySelector('.content');
  
  await window.application.renderBlock('userInfo', content);
  window.application.renderBlock('titleLobby', content);
  window.application.renderBlock('textLobby', content);
  await (() =>  window.application.renderBlock('opponents', content))()
  window.application.renderBlock('startMatch', content);

  const app = document.querySelector('.app');
  app.appendChild(fragment);
  
  window.application.timers.push(setInterval(handlerUpdateOpponents, 1000));
  
}

window.application.screens['lobbyPage'] = renderLobbyPage; 


