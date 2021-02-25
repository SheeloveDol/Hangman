$(document).ready(()=>{
  const words = ['ironman', 'avengers', 'electron', 'golden', 'avatar', 'magnetic', 'jupiter', 'collection', 'pleasure', 'codemaster', 'commander', 'joyful']

  const wordToGuess = ()=> words[Math.floor(Math.random()*words.length)].split('')
  const refreshImage = n=> $("#hang").attr("src",`./images/gallows-${n}.jpg`);
  let success = new Audio("sounds/applause-8.mp3"); 
  const failure = ()=> new Audio("sounds/fail-buzzer-02.wav");
  const keyboardClick = ()=> new Audio("sounds/keyboard-click.mp3")


  let word = wordToGuess(); 
  let guessed = []; 
  let incorrectLetter = 0; 
  let results = [];

  results = word.map(x => '__')
  $('.blank').append(`<span id="blank" class="px-2"><h1>${word.map(x => '__').join(' ')}</h1></span>`)

  const restart = () => {
      refreshImage(0)
      results = word.map(x => '__')
      $('.key').removeClass('highlight')
      $("#blank").replaceWith(`<span id="blank" class="px-2"><h1>${word.map(x => '__').join(' ')}</h1></span>`);
  }


  function wordCheck() {
      for (let i = 0; i < word.length; i++){
          for (let j = 0; j < guessed.length; j++){
              if (word[i] == guessed[j]) results[i] = word[i];
          }
      }
      $("#blank").replaceWith(`<span id="blank" class="px-2"><h1>${results.join(' ').toUpperCase()}</h1></span>`);
  }
  function primary(letter) {

    keyboardClick().play()
    if(!word.includes(letter.toLowerCase()) && incorrectLetter < 6) 
    incorrectLetter+=1

    if(word.includes(letter.toLowerCase())) 
    guessed.push(letter.toLowerCase())
    wordCheck()

    if(word.join('') == results.join('') && incorrectLetter < 6) { 
      success.play(); 
      setTimeout(() => {
        if(confirm("Yay! You've won!") ) {
          restart(); 
          incorrectLetter = 0; 
          word = wordToGuess(); 
          guessed = []; 
          results = word.map(x => '__')
        } 
      }, 1000);
    }

    $(`#${letter.toUpperCase()}`).addClass('highlight')
    refreshImage(incorrectLetter)
    if(incorrectLetter>5) { 
      failure().play(); 
      setTimeout(() => {
        if(confirm("You're out of rope!")) {
          restart(); 
          incorrectLetter = 0; 
          word = wordToGuess(); 
          guessed = []; 
          results = word.map(x => '__') 
        } 
      }, 1000);
    }
  }
  $(".key").on("click", function(e){
      primary(this.innerText)
  })
  $(this).keypress(e=>{
      primary(e.key)
  })
})


