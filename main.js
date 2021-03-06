const urlRequest = "https://api.random.org/json-rpc/4/invoke";
const apiKey = "2ed0b785-d639-4128-8ab5-101f5f726e33";

function copyArr(arr1, arr2) {
    for (let item of arr2) {
        arr1.push(item);
    }
    return arr1;
}

async function sendRequest(newArr) {
    const response = await fetch(urlRequest, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            method: "generateIntegers",
            params: {
                apiKey: apiKey,
                n: 5,
                min: 1,
                max: 25,
                replacement: false,
                base: 10,
                pregeneratedRandomization: null
            },
            id: 22490
        })
    });
    const data = await response.json();

    newArr = Array();
    for (let item of data.result.random.data) {
        newArr.push(item);
    }

    return await newArr;
}





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
    currentWin.textContent = `??????????????: ${currentWinMonet} ??????????`;
    currentBalance.textContent = `?????? ????????????: ${balance} ??????????`;

    startBtn.addEventListener('click', () => {
        if (+bidInput.value < 10 || +bidInput.value > balance) {
            bidInput.classList.add('inp-error');
        }
        else {
            balance -= +bidInput.value;
            localStorage.setItem("currBalance" , balance);
            currentBalance.textContent = `?????? ????????????: ${balance} ??????????`;
            bidInput.classList.remove('inp-error');
            gameStatus.textContent = '???????? ????????????????!';
            startGame();
        }
    });

    function startGame() {
        let o = generateRandomNum();
        let indKeff = 0;


        getWinBtn.addEventListener('click', () => {
            balance += currentWinMonet;
            location.reload();
            localStorage.setItem("currBalance" , balance);
            resetGame();
        });

        gameFields.forEach(el => {
            el.addEventListener('click', () => {
                if (!el.classList.contains('green')) {
                    if (+el.textContent == o[1] || +el.textContent == o[2] || +el.textContent == o[3] || +el.textContent == o[4] || +el.textContent == o[5]) {
                        el.classList.add('red');
                        stopGame();
                    } else {
                        currentWinMonet += Math.floor(+bidInput.value * kfc[indKeff]);
                        indKeff++;
                        el.classList.add('green');
                        currentWin.textContent = `??????????????: ${currentWinMonet} ??????????`;
                    }
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

        let bombArr = [];

        let res = sendRequest([]);
        res.then((result) => {
            copyArr(bombArr, result);

            for (let i = 0; i < bombArr.length; i++) {
                obj[i+1] = bombArr[i];
            }
        });

        return obj;
    }
}

game();

function stopGame() {
    endGame.classList.remove('hide');
}

function resetGameFunc() {
    location.reload();
    endGame.classList.add('hide');
    bidInput.value = '';
    gameFields.forEach(el => {
        el.classList.remove('red');
        el.classList.remove('green');
    });
}

resetGame.addEventListener('click', () => {
    resetGameFunc();
});