export class HomePage extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(document.getElementById('home-template').content.cloneNode(true));
    }

    connectedCallback() {
      const adoptedPet = JSON.parse(localStorage.getItem('adoptedPet'));
      const winsLosses = JSON.parse(localStorage.getItem('winsLosses')) || {};
      const inventory = JSON.parse(localStorage.getItem('inventory')) || [];

      const emptyCard = this.shadowRoot.getElementById('emptyCard');
      const petInfo = this.shadowRoot.getElementById('petInfo');
      const petIcon = this.shadowRoot.getElementById('petIcon');
      const petName = this.shadowRoot.getElementById('petName');
      const petWins = this.shadowRoot.getElementById('petWins');
      const petHP = this.shadowRoot.getElementById('petHP');
      const petMana = this.shadowRoot.getElementById('petMana');
      const petLosses = this.shadowRoot.getElementById('petLosses');
      const inventoryTable = this.shadowRoot.getElementById('inventoryTable');
      const inventoryTableBody = inventoryTable.querySelector('tbody');
      const petExperience = this.shadowRoot.getElementById('petExperience');


      if (adoptedPet) {
        emptyCard.style.display = 'none';
        petInfo.style.display = 'flex';
        petIcon.src = adoptedPet.iconUrl;
        petName.textContent = adoptedPet.name;
        petHP.textContent = adoptedPet.stats.hp;
        petMana.textContent = adoptedPet.stats.mana;
        petWins.textContent = winsLosses[adoptedPet.id]?.wins || 0;
        petLosses.textContent = winsLosses[adoptedPet.id]?.losses || 0;
        petExperience.textContent = ` ${adoptedPet.experience || 0}`;

      }

      inventory.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.goldValue}</td>
          <td>${item.foodValue}</td>
          <td>${item.attackValue}</td>
        `;
        inventoryTableBody.appendChild(row);
      });
    }
  }

  customElements.define('home-page', HomePage);