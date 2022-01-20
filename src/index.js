/**
 * Converts a string of HTML into nodes.
 *
 * @param {string} string HTML in string form
 * @returns {DocumentFragment} Nodes parsed from the HTML string
 */
function stringToElements (string) {
  return document.createRange().createContextualFragment(string);
}

/**
 * @param {TemplateStringsArray} strings
 * @param {any[]} rest
 * @returns {CSSStyleSheet}
 */
function css (strings, ...rest) {
  const text = Array.isArray(strings) ?
    strings.reduce((acc, curr, i) => {
      return acc + (rest[i] ? curr + rest[i] : curr);
    }, '') :
    strings.toString();
  const sheet = new CSSStyleSheet();

  // @ts-ignore
  sheet.replace(text);

  return sheet;
}

/**
 * @export
 * @param {TemplateStringsArray} strings
 * @param {any[]} rest
 * @returns {DocumentFragment}
 */
function html (strings, ...rest) {
  const text = Array.isArray(strings) ?
    strings.reduce((acc, curr, i) => {
      return acc + (rest[i] ? curr + rest[i] : curr);
    }, '') :
    strings.toString();

  return stringToElements(text);
}

const cssStyleSheetToText = sheet => Object.values(sheet.cssRules).reduce((acc, curr) => acc + curr.cssText, '');

class WebComponent extends HTMLElement {
  constructor () {
    super();
    this._sDOM = this.attachShadow({ mode: 'closed' });
  }

  connectedCallback () {
    const style = css`
      :host {
        color: red;
      }
    `;

    if ('adoptedStyleSheets' in this._sDOM) {
      // @ts-ignore
      this._sDOM.adoptedStyleSheets = [style];
    } else {
      this._sDOM.appendChild(
        html`
          <style>
            ${cssStyleSheetToText(style)}
          </style>
        `
      );
    }

    this._sDOM.appendChild(
      html`
        <p>Hello World</p>
      `
    );
  }
}

customElements.define('web-component', WebComponent);
