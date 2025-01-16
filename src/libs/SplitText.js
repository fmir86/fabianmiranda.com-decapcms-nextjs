class SplitText {

  constructor(container, options = {}) {
    if (!container) throw new Error("A container element must be provided.");
    this.container = container;
    this.options = Object.assign(
      {
        selector: '.tag', // Selector for elements to split
        wrapper: 'div', // Wrapper element for each letter
        className: 'letter', // Class for the letter wrapper
      },
      options
    );
  }

  split() {
    const elements = this.container.querySelectorAll(this.options.selector);

    console.log('elements', elements)

    elements.forEach((element) => {
      const text = element.textContent;
      const fragment = document.createDocumentFragment();

      text.split('').forEach((char) => {
        const wrapper = document.createElement(this.options.wrapper);
        wrapper.className = this.options.className;
        wrapper.textContent = char === ' ' ? '\u00A0' : char; // Replace spaces with non-breaking spaces
        fragment.appendChild(wrapper);
      });

      element.textContent = ''; // Clear the original text
      element.appendChild(fragment); // Append the new structure
    });
  }
}

export default SplitText;

// Usage example
// import SplitText from './SplitText';
// const tagsContainer = document.querySelector('.tags-container');
// const splitter = new SplitText(tagsContainer, { selector: '.tag', wrapper: 'span', className: 'letter' });
// splitter.split();