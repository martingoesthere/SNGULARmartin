import { LitElement, html, css } from "lit-element";

class MartinElement extends LitElement {
  static get properties() {
    return {
      characters: { type: Array },
      selectedCharacter: { type: Object },
    };
  }

  constructor() {
    super();
    this.characters = [];
    this.selectedCharacter = null;
    this.loadCharacters();
  }

  async loadCharacters() {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      if (!response.ok) {
        throw new Error("Error");
      }
      const data = await response.json();
      this.characters = data.results;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  static get styles() {
    return css`
      :host {
        font-family: Arial, sans-serif;
        display: block;
        padding: 16px;
        box-sizing: border-box;
      }

      h1 {
        font-size: 24px;
        margin-bottom: 16px;
        text-align: center;
      }

      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
      }

      li {
        border: 1px solid #ccc;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        transition: box-shadow 0.3s ease;
      }

      li:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 5px 5px 0 0;
      }

      .character-details {
        padding: 16px;
        background-color: #f9f9f9;
        border-top: 1px solid #ccc;
        border-radius: 0 0 5px 5px;
      }

      .show {
        display: block;
      }

      .hide {
        display: none;
      }
    `;
  }

  render() {
    return html`
      <h1>List of Characters by Martin</h1>
      <ul>
        ${this.characters.map(
          (character) => html`
            <li @click=${() => this.toggleDetails(character)}>
              <img src="${character.image}" alt="${character.name}" />
              <div
                class="character-details ${this.isSelected(character)
                  ? "show"
                  : "hide"}"
              >
                <div><strong>ID:</strong> ${character.id}</div>
                <div><strong>Name:</strong> ${character.name}</div>
                <div><strong>Status:</strong> ${character.status}</div>
                <div><strong>Species:</strong> ${character.species}</div>
              </div>
            </li>
          `
        )}
      </ul>
    `;
  }

  toggleDetails(character) {
    this.selectedCharacter =
      this.selectedCharacter === character ? null : character;
  }

  isSelected(character) {
    return this.selectedCharacter === character;
  }
}

customElements.define("martin-element", MartinElement);
