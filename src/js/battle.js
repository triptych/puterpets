import { petdata } from './petdata.js';
export class BattleComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(document.getElementById('battle-template').content.cloneNode(true));

    this.playerIcon = this.shadowRoot.querySelector('.player-icon');
    this.playerName = this.shadowRoot.querySelector('.player-name');
    this.playerHP = this.shadowRoot.querySelector('.player-hp');
    this.opponentIcon = this.shadowRoot.querySelector('.opponent-icon');
    this.opponentName = this.shadowRoot.querySelector('.opponent-name');
    this.opponentHP = this.shadowRoot.querySelector('.opponent-hp');
    this.fightButton = this.shadowRoot.querySelector('.fight-button');
    this.resultMessage = this.shadowRoot.querySelector('.result-message');

    this.fightButton.addEventListener('click', () => this.fight());
  }

  connectedCallback() {
    const adoptedPet = JSON.parse(localStorage.getItem('adoptedPet'));
    this.playerPet = adoptedPet;
    this.opponentPet = this.getRandomPet();

    this.updatePetDisplay(this.playerPet, this.playerIcon, this.playerName, this.playerHP);
    this.updatePetDisplay(this.opponentPet, this.opponentIcon, this.opponentName, this.opponentHP);
  }

  getRandomPet() {
    const randomIndex = Math.floor(Math.random() * petdata.data.length);
    return petdata.data[randomIndex];
  }

  updatePetDisplay(pet, icon, name, hp) {
    icon.src = pet.iconUrl;
    name.textContent = pet.name;
    hp.textContent = `HP: ${pet.stats.hp}`;
  }

  fight() {
    // Add the 'shakePlayer' class to the player's pet icon
    this.playerIcon.classList.add('shakePlayer');

    // Add the 'shakeOpponent' class to the opponent's pet icon
    this.opponentIcon.classList.add('shakeOpponent');


    // Remove the 'shakePlayer' and 'shakeOpponent' classes after the animation ends
    setTimeout(() => {
      this.playerIcon.classList.remove('shakePlayer');
      this.opponentIcon.classList.remove('shakeOpponent');
    }, 500);

    // Player attacks opponent
    const playerDamage = Math.floor(Math.random() * 8) + 1;
    this.opponentPet.stats.hp -= playerDamage;
    this.updatePetDisplay(this.opponentPet, this.opponentIcon, this.opponentName, this.opponentHP);

    if (this.opponentPet.stats.hp <= 0) {
      this.resultMessage.textContent = "You win!";
      this.updateWinsLosses('wins');
      this.awardExperience(); // Award experience for winning
      this.resetPetHP();
      return;
    }

 

    // Opponent attacks player
    const opponentDamage = Math.floor(Math.random() * 8) + 1;
    this.playerPet.stats.hp -= opponentDamage;
    this.updatePetDisplay(this.playerPet, this.playerIcon, this.playerName, this.playerHP);

    if (this.playerPet.stats.hp <= 0) {
      this.resultMessage.textContent = "You lose!";
      this.updateWinsLosses('losses');
      this.resetPetHP();

    }



    localStorage.setItem('adoptedPet', JSON.stringify(this.playerPet));

  }

  awardExperience() {
    const experienceGained = Math.floor(Math.random() * 10) + 1; // Random experience between 1 and 10
    this.playerPet.experience = (this.playerPet.experience || 0) + experienceGained;
    localStorage.setItem('adoptedPet', JSON.stringify(this.playerPet));
    console.log(`Pet gained ${experienceGained} experience. Total experience: ${this.playerPet.experience}`);
  }

  updateWinsLosses(result) {
    const winsLosses = JSON.parse(localStorage.getItem('winsLosses')) || {};
    const petId = this.playerPet.id;

    if (!winsLosses[petId]) {
      winsLosses[petId] = { wins: 0, losses: 0 };
    }

    winsLosses[petId][result]++;
    localStorage.setItem('winsLosses', JSON.stringify(winsLosses));
  }


  resetPetHP() {
    const originalPet = petdata.data.find(pet => pet.id === this.playerPet.id);
    if (originalPet) {
      this.playerPet.stats.hp = originalPet.stats.hp;
      localStorage.setItem('adoptedPet', JSON.stringify(this.playerPet));
      this.updatePetDisplay(this.playerPet, this.playerIcon, this.playerName, this.playerHP);
    }
  }

}

customElements.define('battle-component', BattleComponent);