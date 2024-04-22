import { Header } from './header.js';
import { petdata } from './petdata.js';
import { PetBox } from './petbox.js';
import { BattleComponent } from './battle.js';
import { ItemReveal } from './item-reveal.js';
import { HomePage } from './homepage.js';

console.log(petdata)

function renderIconTable(spriteSheetUrl, rows, cols, iconWidth, iconHeight) {
    const table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('td');
            const canvas = document.createElement('canvas');
            canvas.width = iconWidth * 2;
            canvas.height = iconHeight * 2;

            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            const spriteSheet = new Image();
            spriteSheet.onload = function () {
                ctx.drawImage(
                    spriteSheet,
                    j * iconWidth,
                    i * iconHeight,
                    iconWidth,
                    iconHeight,
                    0,
                    0,
                    iconWidth * 2,
                    iconHeight * 2
                );
            };
            spriteSheet.src = spriteSheetUrl;

            cell.appendChild(canvas);
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    return table;
}

// const tableContainer = document.getElementById('tableContainer');
// const iconTable = renderIconTable('sprites/creature-icons.png', 11, 11, 32, 32);
// tableContainer.appendChild(iconTable);

document.addEventListener('DOMContentLoaded', () => {
    const theDiv = document.createElement('div');
    theDiv.innerHTML = `<div id="particles"></div>`;
    document.body.appendChild(theDiv)
})
document.addEventListener('mousemove', function (event) {
    var particles = document.getElementById('particles');
    var particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = event.clientX + 'px';
    particle.style.top = event.clientY + 'px';
    // Generate a random color
    var randomColor = getRandomColor();
    particle.style.backgroundColor = randomColor;
    particles.appendChild(particle);

    setTimeout(function () {
        particles.removeChild(particle);
    }, 1000);
});

// Function to generate a random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }