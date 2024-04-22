import { items } from './items.js';

export class ItemReveal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .question-mark {
          font-size: 48px;
          cursor: pointer;
          transition: transform 2s;
        }
        .item-details {
          margin-top: 20px;

        }
        .shown{
          border: 1px solid black;
          padding: 4px;
        }
      </style>
      <div class="question-mark">?</div>
      <div class="item-details"></div>
    `;
    this.questionMark = this.shadowRoot.querySelector('.question-mark');
    this.itemDetails = this.shadowRoot.querySelector('.item-details');
    this.questionMark.addEventListener('click', this.revealItem.bind(this));
  }

  revealItem() {
    const randomIndex = Math.floor(Math.random() * items.length);
    const selectedItem = items[randomIndex];

    this.questionMark.style.transform = 'rotateY(1080deg)';

    setTimeout(() => {
      this.itemDetails.innerHTML = `
        <h3>${selectedItem.name}</h3>
        <p>Gold Value: ${selectedItem.goldValue}</p>
        <p>Food Value: ${selectedItem.foodValue}</p>
        <p>Attack Value: ${selectedItem.attackValue}</p>
      `;
      this.itemDetails.classList.add('shown')
      this.questionMark.style.display = 'none';

      // Get the existing inventory from localStorage or initialize an empty array
      let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

      // Add the selected item to the inventory array
      inventory.push(selectedItem);

      // Store the updated inventory array in localStorage
      localStorage.setItem('inventory', JSON.stringify(inventory));


    }, 2000);
  }
}

customElements.define('item-reveal', ItemReveal);