const dino = document.querySelector('.dino');
const back = document.querySelector('.background');
const fim = document.querySelector('.fim');
let iniciar = document.querySelector('.iniciar');
let aviso = document.querySelector('.aviso');
let position = 0;
let jump, down, jogando = false, fimDeJogo = false;
let pontos = document.querySelector('#pontos');
let pontuacao = 0;
let score;
let sinal = 1;

iniciar.addEventListener('click', ()=>{
    back.style.display = 'block';
    score = setInterval(()=>{ 
        pontuacao += 10;
        pontos.innerHTML = pontuacao;
    }, 100);
    iniciar.style.display = 'none';
    aviso.style.display = 'none';
    
    document.addEventListener('keyup', (e)=>{
        if(e.keyCode === 32 && sinal === 1){
            sinal = 0;
            jogando = true;
            jump = setInterval(()=>{
                position += 20;
                dino.style.bottom = position + 'px';
                if( position >= 200 ){
                    clearInterval(jump);
                    down = setInterval(()=>{
                        position -= 20;
                        dino.style.bottom = position + 'px';
                        if( position <= 0){
                            sinal = 1;
                            clearInterval(down);
                            position = 0;
                            dino.style.bottom = position;
                        }
                    }, 20)
                }
            }, 20)
        }
    })

    function createCactus(){
        const cactus = document.createElement('div');
        let cactusPosition = 1000;
        let randomCactus = Math.random() * 600;

        if( fimDeJogo == true){
            return;
        }

        cactus.classList.add('cactus');
        cactus.style.left = cactusPosition + 'px';
        back.appendChild(cactus);


        let leftPosition = setInterval(()=>{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';

            if( cactusPosition > 0 && cactusPosition < 60 && position < 60){
                clearInterval(leftPosition);
                clearInterval(score);
                fim.innerHTML = `<h1 class="game-over">Fim de jogo! Total de pontos: &#10013 ${pontuacao} &#10013</h1>
                                <div class="voltar" onClick="location.reload()"><p>Voltar para o início</p></div>`;
                fimDeJogo = true;   
                back.style.display = 'none';
                pontos.style.display = 'none';
            }
            if(cactusPosition < -60 ){
                back.removeChild(cactus)
                clearInterval(leftPosition);
            }
        }, 20);    
        setTimeout(createCactus, randomCactus+1000);
    }
    createCactus();
})
