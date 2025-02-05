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

const getStartMatch = async (token) => {
    const params = new URLSearchParams({
        token,
    }).toString();

    return fetch(`${BACKEND_URL}/start?${params}`)
    .then(response => response.json());
}

const getUserStatus = async ({token, gameId}) => {
    const params = new URLSearchParams({
        token,
        id: gameId
    }).toString();

    return fetch(`${BACKEND_URL}/game-status?${params}`)
    .then(response => response.json());
}
const BACKEND_URL = 'https://skypro-rock-scissors-paper-backend.vercel.app/';
