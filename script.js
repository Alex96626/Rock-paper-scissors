// function renderExampleButton(container) {
//     const button = document.createElement('button');
  
//     button.addEventListener('click', () => {
//       console.log('click');
//     });
  
//     container.appendChild(button);
// }

// window.application.blocks['example-button'] = renderExampleButton; 


// window.application.renderBlock('example-button', document.querySelector('.app')); 
function browserTemplateEngine(block) {
  if ((block === undefined) || (block === null) || (block === false)) {
      return document.createTextNode('');
  }

  if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
      return document.createTextNode(block);
  }

  if (Array.isArray(block)) {
      const fragment = document.createDocumentFragment();

      for (const item of block) {
          const itemElem = browserTemplateEngine(item);

          fragment.appendChild(itemElem);
      }

      return fragment;
  }

  const elem = document.createElement(block.block);

  elem.appendChild(browserTemplateEngine(block.content));

  if (block.cls) {
      const classes = [].concat(block.cls);

      elem.classList.add(...classes);
  }

  if (block.attrs) {
      for (const [key, value] of Object.entries(block.attrs)) {
          elem.setAttribute(key, value);
      }
  }

  return elem;
}

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
        },
      },
      {
        block: 'button',
        cls: ['button', 'button_theme-primary'],
        attrs: {
          'type': 'text',
        },
        content: 'Начать игру'
      }
    ],
  };

  const fomtLogin = browserTemplateEngine(formLoginTemplate);

  container.appendChild(fomtLogin);
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

window.application.renderBlock('content', document.querySelector('.app'));

window.application.renderBlock('rpc-picture', document.querySelector('.content'));
window.application.renderBlock('title', document.querySelector('.content'));
window.application.renderBlock('text', document.querySelector('.content'));
window.application.renderBlock('fomtLogin', document.querySelector('.content'));


