const getPlayerList = async () => {
  const params = new URLSearchParams({
    'token': localStorage.getItem('token'),
  }).toString();
  
  return fetch(`${BACKEND_URL}player-list?${params}`)
  .then(response => response.json())
  .then(data => data.list); 
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

const renderUserInfo = (container) => {
    const userInfoTemplate = { 
      block: 'header', 
      cls: 'user-info',
      content: [
        {
            block: 'p',
            cls: 'user-info__nickname',
            content: 'User',
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

const renderOpponents = async (container) => {
  const opponentsList = await getPlayerList(); 

  const currentOpponentsList = document.querySelector('.opponents');
  if(currentOpponentsList) {
    currentOpponentsList.remove();
  }

  const opponentsTemplate = { 
        block: 'ul',
        cls: 'opponents',
        content: opponentsList.map( opponent =>({
            block: 'li',
            cls: 'opponents__item',
            content: [
            {
                block: 'img',
                cls: 'opponents__avatar',
                attrs: {
                  alt:  opponent.login,
                  src: opponent.avatar,
                }
            },
            {
              block: 'span',
              cls: 'opponents__username',
              content: opponent.login
            }
          ]
        }))
  };

  const opponents = browserTemplateEngine(opponentsTemplate);
  
  container.appendChild(opponents);
}

window.application.blocks['opponents'] = renderOpponents;

const renderLobbyPage  = () => {
  const fragment = new DocumentFragment();

  window.application.renderBlock('contentLobby', fragment);

  const content = fragment.querySelector('.content');
  
  window.application.renderBlock('userInfo', content);
  window.application.renderBlock('titleLobby', content);
  window.application.renderBlock('textLobby', content);
  (() => window.application.renderBlock('opponents', content))();

  setInterval(() => {
    window.application.renderBlock('opponents', content);
  }, 1000)
 
  const app = document.querySelector('.app');

  app.appendChild(fragment);
  
}

window.application.screens['lobbyPage'] = renderLobbyPage; 

