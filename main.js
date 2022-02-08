const gameStatus = document.querySelector('.status');

const gameFields = document.querySelectorAll('.gamefield__item');

const currentBalance = document.querySelector('.current-balance'),
      bidInput = document.querySelector('.bid-input'),
      startBtn = document.querySelector('.game-start');

const currentWin = document.querySelector('.current-win'),
      getWinBtn = document.querySelector('.get-win');

const endGame = document.querySelector('.end'),
      resetGame = document.querySelector('.reset-game');

const kfc = [1.14, 1.30, 1.49, 1.73, 2.02, 2.37, 2.82, 5.05, 6.32, 8.04, 10.45, 13.94, 19.17, 27.38, 41.07, 65,71, 115, 230, 575, 2300];


if(localStorage.getItem("currBalance") == undefined || localStorage.getItem("currBalance") < 10 ){
    localStorage.setItem("currBalance" , 1000);
    location.reload();
}
else if(typeof localStorage.getItem("currBalance") == undefined)
{
    localStorage.setItem("currBalance" , 1000);
    location.reload();
}


function game() {
    let balance = +localStorage.getItem("currBalance");
    let currentWinMonet = 0;
    currentWin.textContent = `Выигрыш: ${currentWinMonet} монет`;
    currentBalance.textContent = `Ваш баланс: ${balance} монет`;

    startBtn.addEventListener('click', () => {
        if (+bidInput.value < 10 || +bidInput.value > balance) {
            bidInput.classList.add('inp-error');
        }
        else {
            balance -= +bidInput.value;
            currentBalance.textContent = `Ваш баланс: ${balance} монет`;
            bidInput.classList.remove('inp-error');
            gameStatus.textContent = 'Игра началась!';
            startGame();
        }
    });

    function startGame() {
        let o = generateRandomNum();

        gameFields.forEach(el => {
            el.addEventListener('click', () => {
                if (+el.textContent == o[1] || +el.textContent == o[2] || +el.textContent == o[3] || +el.textContent == o[4] || +el.textContent == o[5]) {
                    el.classList.add('red');
                    stopGame();
                } else {

                    el.classList.add('green');
                    currentWinMonet += +bidInput.value;
                    currentWin.textContent = `Выигрыш: ${currentWinMonet} монет`;
                    // увеличение
                }
            });
        });

    }

    function generateRandomNum() {
        let obj = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        };

        let i = 1;
        while (obj[1] == 0 || obj[2] == 0 || obj[3] == 0 || obj[4] == 0 || obj[5] == 0) {
            let rand = Math.round(1 - 0.5 + Math.random() * (25 - 1 + 1));

            if (rand == obj[1] || rand == obj[2] || rand == obj[3] || rand == obj[4] || rand == obj[5]) {
                continue;
            }
            else {
                obj[i] = rand;
                i += 1;
            }
        }

        return obj;
    }
}

game();

function stopGame() {
    endGame.classList.remove('hide');
}

resetGame.addEventListener('click', () => {
    location.reload();
    endGame.classList.add('hide');
    bidInput.value = '';
    gameFields.forEach(el => {
        el.classList.remove('red');
        el.classList.remove('green');
    });
});