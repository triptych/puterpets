import { petdata } from './petdata.js';
export class PetBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.getElementById('pet-template').content.cloneNode(true));

        this.petIcon = this.shadowRoot.querySelector('.pet-icon');
        this.petName = this.shadowRoot.querySelector('.pet-name');
        this.petHP = this.shadowRoot.querySelector('.pet-hp');
        this.petMana = this.shadowRoot.querySelector('.pet-mana');
        this.prevButton = this.shadowRoot.querySelector('.prev-button');
        this.nextButton = this.shadowRoot.querySelector('.next-button');
        this.adoptButton = this.shadowRoot.querySelector('.adopt-button');

        this.currentIndex = 0;

        this.prevButton.addEventListener('click', () => this.showPreviousPet());
        this.nextButton.addEventListener('click', () => this.showNextPet());
        this.adoptButton.addEventListener('click', () => this.adoptPet());
    }

    connectedCallback() {
        const adoptedPet = JSON.parse(localStorage.getItem('adoptedPet'));
        if (adoptedPet) {
          this.showPet(adoptedPet);
          this.displayWinsLosses(adoptedPet.id);
        } else {
          this.showPet(petdata.data[this.currentIndex]);
        }
      }

      showPet(pet) {
        this.petIcon.src = pet.iconUrl;
        this.petName.textContent = pet.name;
        this.petHP.textContent = pet.stats.hp;
        this.petMana.textContent = pet.stats.mana;
      }

    showPreviousPet() {
        this.currentIndex = (this.currentIndex - 1 + petdata.data.length) % petdata.data.length;
        this.showPet(petdata.data[this.currentIndex]);
    }

    showNextPet() {
        this.currentIndex = (this.currentIndex + 1) % petdata.data.length;
        this.showPet(petdata.data[this.currentIndex]);
    }

    adoptPet() {
      const pet = petdata.data[this.currentIndex];
      pet.experience = 0; // Initialize experience to 0
      localStorage.setItem('adoptedPet', JSON.stringify(pet));
      console.log(`Adopted pet: ${pet.name}`);
    }

    displayWinsLosses(petId) {
        const winsLosses = JSON.parse(localStorage.getItem('winsLosses')) || {};
        const petWinsLosses = winsLosses[petId];

        if (petWinsLosses) {
            const winsElement = document.createElement('div');
            winsElement.textContent = `Wins: ${petWinsLosses.wins}`;
            this.shadowRoot.appendChild(winsElement);

            const lossesElement = document.createElement('div');
            lossesElement.textContent = `Losses: ${petWinsLosses.losses}`;
            this.shadowRoot.appendChild(lossesElement);
        }
    }
}

customElements.define('pet-box', PetBox);