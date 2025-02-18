

const renderRpcPicture = (container) => {
    const pictureTemplate = { 
      block: 'div', 
      cls: ['rps-picture'],
      content: [
        {
          block: 'img',
          attrs: {
            alt: 'Rock',
            src: './src/images/rock.svg',
          }
        }
      ]
    }
    
    const picture = browserTemplateEngine(pictureTemplate);
  
    container.appendChild(picture);
  }
  
  window.application.blocks['rpc-picture'] = renderRpcPicture;
  
  const renderTitle = (container) => {
    const titleTemplate = { 
      block: 'h2',
      cls: ['title', 'title__rps'],
      content: 'Камень ножницы бумага',
    };
  
    const title = browserTemplateEngine(titleTemplate);
  
    container.appendChild(title);
  }
  
  window.application.blocks['title'] = renderTitle;
  
  const renderText = (container) => {
    const textTemplate = { 
      block: 'p',
      cls: 'rps-text',
      content: 'Rock-Paper-Scissors.Fight in the big arena in front of a million spectators',
    };
  
    const text = browserTemplateEngine(textTemplate);
  
    container.appendChild(text);
  }
  
  window.application.blocks['text'] = renderText;
  
  const renderFormLogin = (container) => {
    const formLoginTemplate = { 
      block: 'form',
      cls: ['form-login', 'form-login__theme__primary'],
      content: [
        {
          block: 'input',
          cls: ['form-login__value', 'button', 'button_theme-secondary'],
          attrs: {
            'type': 'text',
            'placeholder': 'Login',
            'name': 'login',
            'required': true
          },
        },
        {
          block: 'button',
          cls: ['button', 'button_theme-primary', 'button__start-game'],
          attrs: {
            'type': 'text',
          },
          content: 'Начать игру'
        }
      ],
    };
  
    const formLogin = browserTemplateEngine(formLoginTemplate);
  
    const handlerLogin = async (event) => {
      const target = event.target;
  
      event.preventDefault();
  
      const formData = new FormData(target);
      const loginValue = formData.get('login'); 

      window.application.me = loginValue;

      const params = new URLSearchParams({
        login: loginValue
      }).toString()
  
      const login = await fetch(`${BACKEND_URL}/login?${params}`)
      .then(response => response.json())
      .then(data => {
        window.application.token = data.token;
        window.application.renderScreen('lobbyPage');
      })
      // .catch(error => {
      //   throw Error(error);
      // })

  
    }
  
    formLogin.addEventListener('submit', handlerLogin)  
  
    container.appendChild(formLogin);
  }
  
  window.application.blocks['fomtLogin'] = renderFormLogin;
  
  const rendercontentBlock = (container) => {
    const contentTemplate = { 
      block: 'div', 
      cls: ['content', 'content__login'],
    };
  
    const content = browserTemplateEngine(contentTemplate);
    
    container.appendChild(content);
  }
  
  window.application.blocks['content'] = rendercontentBlock; 
  
  function renderStartPage () {
    const fragment = new DocumentFragment();
  
    window.application.renderBlock('content', fragment);
  
    const content = fragment.querySelector('.content');
  
    window.application.renderBlock('rpc-picture', content);
    window.application.renderBlock('title', content);
    window.application.renderBlock('text', content);
    window.application.renderBlock('fomtLogin', content);
  
    const app = document.querySelector('.app');
  
    app.appendChild(fragment);
    
  }
  
  window.application.screens['start-page'] = renderStartPage; 
  
  window.application.renderScreen('start-page');