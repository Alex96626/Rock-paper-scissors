function renderExampleButton(container) {
    const button = document.createElement('button');
  
    button.addEventListener('click', () => {
      console.log('click');
    });
  
    container.appendChild(button);
}

window.application.blocks['example-button'] = renderExampleButton; 


window.application.renderBlock('example-button', document.querySelector('.app')); 