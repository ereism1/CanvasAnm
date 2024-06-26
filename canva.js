const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const CANVAS_HEIGHT = canvas.height;
        const CANVAS_WIDTH = canvas.width;
        const fundo = document.getElementById('fundo');
        const cblack = document.getElementById('cblack');
        const cred = document.getElementById('cred');
        var x = 0;
        var x2 = 960;
        var velocityF = 5;
        var isJumping = false;
        var squareX = 50;
        var squareY = 280;
        var square2Y = 320;
        var square4Y = 280;
        var square2X = 500;
        var square3X = 2823;
        var square4X = 11225;
        let velocidadeX = 10;
        let velocidade2X = 5;
        let pontuacao = 0;

        let passouPeloVermelho1 = false;
        let passouPeloVermelho2 = false;
        let passouPeloVermelho3 = false;


        function animate() {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            if (x < -960) {
                x = 960;
            }
            if (x2 < -960) {
                x2 = 960;
            }
            ctx.drawImage(fundo, x2, 0);
            ctx.drawImage(fundo, x, 0);
            x -= velocityF;
            x2 -= velocityF;
            drawSquare(); // Desenha o quadrado a cada quadro
            rodar(); // Move os quadrados pretos e vermelhos
            detectCollision(); // Detecta colisão entre o quadrado azul e os obstáculos
            requestAnimationFrame(animate);
        }

        function drawSquare() {
            // Limpa o quadrado anterior
            ctx.fillStyle = 'blue';
            ctx.drawImage(cblack,squareX, squareY, 50, 100);
        }

        function rodar() {
            ctx.fillStyle = 'black';
            square2X -= velocidade2X;
            ctx.drawImage(cred,square2X, square2Y, 50, 50);
            //
            ctx.fillStyle = 'red';
            square3X -= velocidade2X;
            ctx.drawImage(cred,square3X, square2Y, 50, 50);
            //
            square4X -= velocidadeX;
            ctx.drawImage(cred, square4X, square4Y, 30, 100);
    
            // Verifica se o quadrado preto passou pelo quadrado vermelho
    if (square2X + 50 < squareX && !passouPeloVermelho1) {
        pontuacao++;
        passouPeloVermelho1 = true;
        atualizarPlacar();
    }

    if (square3X + 50 < squareX && !passouPeloVermelho2) {
        pontuacao++;
        passouPeloVermelho2 = true;
        atualizarPlacar();
    }

    if (square4X + 30 < squareX && !passouPeloVermelho3) {
        pontuacao++;
        passouPeloVermelho3 = true;
        atualizarPlacar();
    }

    if (square2X < -150 ){
        square2X = 700;
        passouPeloVermelho1 = false;
    }

    if (square3X < -150) {
        square3X = 900;
        passouPeloVermelho2 = false;
    }

    if (square4X < -150) {
        square4X = 6000;
        passouPeloVermelho3 = false;
    }
}
        function detectCollision() {
            if (squareY + 50 > square4Y && squareY < square4Y + 50) {
                if ((squareX < square2X + 10 && squareX + 10 > square2X) || (squareX < square3X + 10 && squareX + 10 > square3X) || (squareX < square4X + 30 && squareX + 30 > square4X)) {
                    window.alert('Você perdeu! Pontuação: ' + pontuacao);
                    atualizarPagina();
                    square2X = 500;
                    square3X = 2823;
                    square4X = 11225;
                }
            }
        }
        document.addEventListener('keydown', function (event) {
            if (event.code === 'Space') {
                jump();
            }
            if (event.keyCode === 39) {
                squareX += 10;
            }
            if (event.keyCode === 37) {
                squareX -= 10 ;
            }
        });

        function jump() {
            if (!isJumping) {
                isJumping = true;
                var jumpInterval = setInterval(function () {
                    squareY -= 15;
                    drawSquare();
                    if (squareY <= 50) {
                        clearInterval(jumpInterval);
                        var descentInterval = setInterval(function () {
                            squareY += 20;
                            drawSquare();
                            if (squareY >= 280) {
                                clearInterval(descentInterval);
                                isJumping = false; // Reseta a variável de controle de pulo
                            }
                        }, 20);
                    }
                }, 20);
            }
        }

        function atualizarPagina(){
            location.reload();
        }

        function aumentarPontuacao() {
            pontuacao++;
            atualizarPlacar();
        }

        function atualizarPlacar() {
    const placarElemento = document.getElementById('pontuacao');
    placarElemento.textContent = pontuacao;
}
        animate();