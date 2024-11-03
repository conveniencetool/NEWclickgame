let score = 0;
let time = 10;
let timer;

function startGame() {
    resetGame();
    moveCircle();
    timer = setInterval(() => {
        time--;
        document.getElementById('time').textContent = time;
        if (time <= 0) {
            clearInterval(timer);
            endGame('タイムアウト！ゲームオーバー');
        }
    }, 1000);
}

function resetGame() {
    score = 0;
    time = 10;
    document.getElementById('score').textContent = score;
    document.getElementById('time').textContent = time;
    document.getElementById('circle').style.display = 'block';
    document.getElementById('message').textContent = '';
    document.getElementById('continueButton').style.display = 'none';
}

function moveCircle() {
    const gameArea = document.getElementById('gameArea');
    const circle = document.getElementById('circle');

    const maxX = gameArea.clientWidth - circle.clientWidth;
    const maxY = gameArea.clientHeight - circle.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    circle.style.left = randomX + 'px';
    circle.style.top = randomY + 'px';
}

document.getElementById('circle').addEventListener('click', (event) => {
    const circle = event.currentTarget;
    const rect = circle.getBoundingClientRect();
    const centerX = rect.left + circle.clientWidth / 2;
    const centerY = rect.top + circle.clientHeight / 2;

    const clickedInside = Math.hypot(event.clientX - centerX, event.clientY - centerY) <= circle.clientWidth / 2;

    if (clickedInside) {
        score += (event.clientX === centerX && event.clientY === centerY) ? 2 : 1;
        document.getElementById('score').textContent = score;
        moveCircle();
    } else {
        endGame('外をクリック！ゲームオーバー');
    }
});

function endGame(message) {
    clearInterval(timer);
    document.getElementById('message').textContent = message;
    document.getElementById('circle').style.display = 'none';
    document.getElementById('continueButton').style.display = 'block';
}

document.getElementById('continueButton').addEventListener('click', () => {
    startGame();
});

// スペースキーでコンティニュー機能を追加
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && document.getElementById('continueButton').style.display === 'block') {
        startGame();
    }
});

// ゲーム開始
startGame();
