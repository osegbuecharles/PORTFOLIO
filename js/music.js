/*  play button */
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const playBtn = document.querySelector('.circle__btn');
const wave1 = document.querySelector('.circle__back-1');
const wave2 = document.querySelector('.circle__back-2');
const audio= new Audio("../assets/Grant Averill - Barely Breathing.mp3");
$(document).ready(()=>{
    audio.loop=true;
    var status=0;
    /*  play button  */
    playBtn.addEventListener('click', function(e) {        
        e.preventDefault();
        pause.classList.toggle('visibility');
        play.classList.toggle('visibility');
        playBtn.classList.toggle('shadow');
        wave1.classList.toggle('paused');
        wave2.classList.toggle('paused');                
        status=!status;
        music(status);
    });

})

function music(status){    
    if(status){        
        // audio.load();
        audio.play();            
    }
    else{
        audio.pause();
    }
}
