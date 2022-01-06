// variabler oprettes
let point;
let liv;
let myRandom;
let myRand;

// spilelementer oprettes som konstanter.
const bacon = document.querySelector("#bacon_container");
const tomat = document.querySelector("#tomat_container");
const svamp = document.querySelector("#svamp_container");
const pepper = document.querySelector("#pepperoni_container");
const peber = document.querySelector("#peberfrugt_container");
const rotte = document.querySelector("#rotte_container");
const spider = document.querySelector("#edderkop_container");

// venter på at siden indlæses
window.addEventListener("load", sidenVises);

//siden indlæses.
function sidenVises() {
  console.log("sidenVises");

  // afspil baggrundsmusik

  // skjul andre skærme
  document.querySelector("#game").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");

  // vis start skærm og pulse animation på start knap
  document.querySelector("#start").classList.remove("hide");
  document.querySelector("#start_knap").classList.add("pulse");

  // klik på start_knap
  document.querySelector("#start_knap").addEventListener("click", startGame);

  window.addEventListener("resize", windowResize);
  windowResize();
}

// skriftstørrelsen ændres afhængigt af window size
function windowResize() {
  console.log("windowResize");
  let widthScreen = document.querySelector("#screen").clientWidth;
  let myFontInProcent = 5;
  let myFont = (widthScreen / 100) * myFontInProcent;
  document.querySelector("#point").style.fontSize = myFont + "px";

  let myFontInProcent2 = 4;
  let myFont2 = (widthScreen / 100) * myFontInProcent2;
  document.querySelector("#level_complete_points").style.fontSize =
    myFont2 + "px";
  document.querySelector("#game_over_points").style.fontSize = myFont2 + "px";
}

// spillet begynder
function startGame() {
  console.log("startGame");

  // stop game over og level complete musik
  document.querySelector("#lyd_levelComplete_musik").pause();
  document.querySelector("#lyd_levelComplete").pause();
  document.querySelector("#lyd_levelComplete2").pause();
  document.querySelector("#lyd_gameOver_musik").pause();
  document.querySelector("#lyd_gameOver_musik2").pause();
  document.querySelector("#lyd_gameOver").pause();

  // skjul alle andre skærme
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");

  // vis spilskærm
  document.querySelector("#game").classList.remove("hide");

  // afspil baggrundsmusik
  if (Math.random() < 0.5) {
    document.querySelector("#lyd_startGame").volume = 0.25;
    document.querySelector("#lyd_startGame").currentTime = 0;
    document.querySelector("#lyd_startGame").play();
  } else {
    document.querySelector("#lyd_startGame2").volume = 0.25;
    document.querySelector("#lyd_startGame2").currentTime = 0;
    document.querySelector("#lyd_startGame2").play();
  }

  // nulstil point og udskriv
  point = 0;
  console.log("antal point " + point);
  document.querySelector("#point").textContent = point;

  // reset liv til 3 og udskriv
  liv = 3;
  console.log("antal liv " + liv);

  // vis alle liv
  document.querySelector("#liv1").classList.remove("hide");
  document.querySelector("#liv2").classList.remove("hide");
  document.querySelector("#liv3").classList.remove("hide");

  // tiden sættes igang og lytter efter en animation-end for at slutte spillet derefter
  document.querySelector("#ur_sprite").classList.add("tid");
  document
    .querySelector("#ur_container")
    .addEventListener("animationend", endGame);

  // alle gode elementer får falling animation og en tilfældig position
  myRandom = Math.floor(Math.random() * 4) + 1;
  bacon.classList.add(
    "falling",
    "speed" + myRandom,
    "delay" + myRandom,
    "pos_god_" + myRandom
  );

  myRandom = Math.floor(Math.random() * 4) + 1;
  tomat.classList.add(
    "falling",
    "speed" + myRandom,
    "delay" + myRandom,
    "pos_god_" + myRandom
  );

  myRandom = Math.floor(Math.random() * 4) + 1;
  svamp.classList.add(
    "falling",
    "speed" + myRandom,
    "delay" + myRandom,
    "pos_god_" + myRandom
  );

  myRandom = Math.floor(Math.random() * 4) + 1;
  pepper.classList.add(
    "falling",
    "speed" + myRandom,
    "delay" + myRandom,
    "pos_god_" + myRandom
  );

  myRandom = Math.floor(Math.random() * 4) + 1;
  peber.classList.add(
    "falling",
    "speed" + myRandom,
    "delay" + myRandom,
    "pos_god_" + myRandom
  );

  // alle dårlige elementer får pattern animation og tilfældig position
  myRand = Math.floor(Math.random() * 2) + 1;
  myRandom = Math.floor(Math.random() * 4) + 1;
  rotte.classList.add(
    "pattern" + myRand,
    "speed" + myRandom,
    "pos_ond_" + myRandom
  );

  myRand = Math.floor(Math.random() * 2) + 1;
  myRandom = Math.floor(Math.random() * 4) + 1;
  spider.classList.add(
    "pattern" + myRand,
    "speed" + myRandom,
    "pos_ond_" + myRandom
  );

  // venter på klik på godt element
  bacon.addEventListener("mousedown", clickGood);
  tomat.addEventListener("mousedown", clickGood);
  svamp.addEventListener("mousedown", clickGood);
  pepper.addEventListener("mousedown", clickGood);
  peber.addEventListener("mousedown", clickGood);

  // venter på klik på dårligt element
  rotte.addEventListener("mousedown", clickBad);
  spider.addEventListener("mousedown", clickBad);

  // hver gang et godt element rammer bunden
  bacon.addEventListener("animationiteration", lostGood);
  tomat.addEventListener("animationiteration", lostGood);
  svamp.addEventListener("animationiteration", lostGood);
  pepper.addEventListener("animationiteration", lostGood);
  peber.addEventListener("animationiteration", lostGood);
}

// ved klik på godt element tilføj 1 point (opdateres på pointtavlen), pauser animationen og den forsvinder
function clickGood() {
  console.log("clickGood");

  bacon.removeEventListener("mousedown", clickGood);
  tomat.removeEventListener("mousedown", clickGood);
  svamp.removeEventListener("mousedown", clickGood);
  pepper.removeEventListener("mousedown", clickGood);
  peber.removeEventListener("mousedown", clickGood);

  // afspil mums-lyd herunder
  if (Math.random() < 0.5) {
    document.querySelector("#lyd_god").currentTime = 0;
    document.querySelector("#lyd_god").play();
  } else {
    document.querySelector("#lyd_god2").currentTime = 0;
    document.querySelector("#lyd_god2").play();
  }

  // tilføj 1 point, pause animation og forsvind
  point++;
  console.log(point);
  document.querySelector("#point").textContent = point;
  this.classList.add("pause");
  this.firstElementChild.classList.add("forsvind_god");

  // venter på godt element er forsvundet
  bacon.addEventListener("animationend", goodEnd);
  tomat.addEventListener("animationend", goodEnd);
  svamp.addEventListener("animationend", goodEnd);
  pepper.addEventListener("animationend", goodEnd);
  peber.addEventListener("animationend", goodEnd);
}

//ved klik på dårligt element fjern 1 liv (fjern 1 stjerne), pauser animationen og den forsvinder
function clickBad() {
  console.log("clickBad");

  // afspil enten ad-/skrig-lyd herunder
  if (Math.random() < 0.5) {
    document.querySelector("#lyd_ond").currentTime = 0;
    document.querySelector("#lyd_ond").play();
  } else {
    document.querySelector("#lyd_ond2").currentTime = 0;
    document.querySelector("#lyd_ond2").play();
  }

  // liv trækkes fra og forsvind animation
  document.querySelector("#liv" + liv).classList.add("hide");
  liv--;
  console.log("antal liv " + liv);
  this.classList.add("pause");
  this.firstElementChild.classList.add("forsvind_ond");

  // hvis der er 0 eller mindre liv tilbage, så stopper spillet
  if (liv <= 0) {
    console.log("zeroLiv");
    endGame();
  }
  // venter på dårligt element er forsvundet
  rotte.addEventListener("animationend", badEnd);
  spider.addEventListener("animationend", badEnd);
}

// når godt element er forsvundet bliver animationerne reset og der tildeles en ny position
function goodEnd() {
  console.log("goodEnd");

  // fjerner eventlistner på forsvind-animation
  this.removeEventListener("animationend", goodEnd);

  bacon.addEventListener("mousedown", clickGood);
  tomat.addEventListener("mousedown", clickGood);
  svamp.addEventListener("mousedown", clickGood);
  pepper.addEventListener("mousedown", clickGood);
  peber.addEventListener("mousedown", clickGood);

  // fjerner klasser og reset element
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;

  // falling animation på godt element og får en random position
  myRandom = Math.floor(Math.random() * 4) + 1;
  this.classList.add(
    "falling",
    "speed" + myRandom,
    "delay" + myRandom,
    "pos_god_" + myRandom
  );
}

// når dårligt element er forsvundet bliver animationerne reset og der tildeles en ny position
function badEnd() {
  console.log("badEnd");
  // fjerner eventlistner på forsvind-animation
  this.removeEventListener("animationend", badEnd);

  // fjerner klasser og reset element
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;

  // pattern animation på dårligt element og får en random position
  myRand = Math.floor(Math.random() * 2) + 1;
  myRandom = Math.floor(Math.random() * 4) + 1;
  this.classList.add(
    "pattern" + myRand,
    "speed" + myRandom,
    "pos_ond_" + myRandom
  );
}

// når godt element rammer bunden mister man 1 point (opdateres på pointtavlen)
function lostGood() {
  console.log("lostGood");

  // hvis man har flere end 0 point trækkes der et point fra
  if (point > 0) {
    point--;
    console.log(point);
    document.querySelector("#point").textContent = point;

    // reset animation
    this.classList = "";
    this.firstElementChild.classList = "";
    this.offsetLeft;

    // falling animation på godt element og får en random position
    myRandom = Math.floor(Math.random() * 4) + 1;
    this.classList.add(
      "falling",
      "speed" + myRandom,
      "delay" + myRandom,
      "pos_god_" + myRandom
    );
  }
  // hvis man 0 point trækkes der ikke et point fra
  else {
    console.log(point);
    document.querySelector("#point").textContent = point;

    // reset animation
    this.classList = "";
    this.firstElementChild.classList = "";
    this.offsetLeft;

    // falling animation på godt element og får en random position
    myRandom = Math.floor(Math.random() * 4) + 1;
    this.classList.add(
      "falling",
      "speed" + myRandom,
      "delay" + myRandom,
      "pos_god_" + myRandom
    );
  }
}

// spillet er stoppet
function endGame() {
  console.log("endGame");

  //Stop timer
  document.querySelector("#ur_sprite").classList.remove("tid");
  document
    .querySelector("#ur_container")
    .removeEventListener("animationend", endGame);

  //fjern alle klasser på alle elementers container og sprite
  bacon.classList = "";
  bacon.firstElementChild.classList = "";
  tomat.classList = "";
  tomat.firstElementChild.classList = "";
  svamp.classList = "";
  svamp.firstElementChild.classList = "";
  pepper.classList = "";
  pepper.firstElementChild.classList = "";
  peber.classList = "";
  peber.firstElementChild.classList = "";

  rotte.classList = "";
  rotte.firstElementChild.classList = "";
  spider.classList = "";
  spider.firstElementChild.classList = "";

  //fjern alle eventlistener på alle containere
  bacon.removeEventListener("mousedown", clickGood);
  tomat.removeEventListener("mousedown", clickGood);
  svamp.removeEventListener("mousedown", clickGood);
  pepper.removeEventListener("mousedown", clickGood);
  peber.removeEventListener("mousedown", clickGood);

  bacon.removeEventListener("animationiteration", lostGood);
  tomat.removeEventListener("animationiteration", lostGood);
  svamp.removeEventListener("animationiteration", lostGood);
  pepper.removeEventListener("animationiteration", lostGood);
  peber.removeEventListener("animationiteration", lostGood);

  bacon.removeEventListener("animationend", goodEnd);
  tomat.removeEventListener("animationend", goodEnd);
  svamp.removeEventListener("animationend", goodEnd);
  pepper.removeEventListener("animationend", goodEnd);
  peber.removeEventListener("animationend", goodEnd);

  rotte.removeEventListener("mousedown", clickBad);
  spider.removeEventListener("mousedown", clickBad);

  rotte.removeEventListener("animationend", badEnd);
  spider.removeEventListener("animationend", badEnd);

  // hvis man har 0 liv tilbage, senedes man til game over. Har man mere end 1 point vinder man og ellers er spillet tabt.
  if ((liv <= 0, point >= 5)) {
    levelComplete();
  } else if (point >= 5) {
    levelComplete();
  } else {
    gameover();
  }
}

function gameover() {
  console.log("Game Over");

  // pulse animation på genstart knap
  document.querySelector("#genstart1").classList.add("pulse");

  // pauser baggrundsmusik
  document.querySelector("#lyd_startGame").pause();
  document.querySelector("#lyd_startGame2").pause();

  // afspil oh no-lyd
  document.querySelector("#lyd_gameOver").currentTime = 0;
  document.querySelector("#lyd_gameOver").play();

  // afspil game over musik herunder
  if (Math.random() < 0.5) {
    document.querySelector("#lyd_gameOver_musik").volume = 0.25;
    document.querySelector("#lyd_gameOver_musik").currentTime = 0;
    document.querySelector("#lyd_gameOver_musik").play();
  } else {
    document.querySelector("#lyd_gameOver_musik2").volume = 0.25;
    document.querySelector("#lyd_gameOver_musik2").currentTime = 0;
    document.querySelector("#lyd_gameOver_musik2").play();
  }

  // vis game over skærm
  document.querySelector("#game_over").classList.remove("hide");
  document.querySelector("#game").classList.add("hide");

  // udskriv point
  document.querySelector("#game_over_points").innerHTML =
    "Oh no! Du fik kun " + point + " point";
  // klik på genstart1
  document.querySelector("#genstart1").addEventListener("click", startGame);
}

function levelComplete() {
  console.log("Winner");

  // pulse animation på genstart knap
  document.querySelector("#genstart2").classList.add("pulse");

  // pauser baggrundsmusik
  document.querySelector("#lyd_startGame").pause();
  document.querySelector("#lyd_startGame2").pause();

  // afspil wuuhuu-lyd
  if (Math.random() < 0.5) {
    document.querySelector("#lyd_levelComplete").currentTime = 0;
    document.querySelector("#lyd_levelComplete").play();
  } else {
    document.querySelector("#lyd_levelComplete2").currentTime = 0;
    document.querySelector("#lyd_levelComplete2").play();
  }

  // afspil level complete musik
  document.querySelector("#lyd_levelComplete_musik").volume = 0.15;
  document.querySelector("#lyd_levelComplete_musik").play();

  // vis levelComplete skærm
  document.querySelector("#level_complete").classList.remove("hide");
  document.querySelector("#game").classList.add("hide");

  // udskriv point
  document.querySelector("#level_complete_points").innerHTML =
    "HURRA! Du fik " + point + " point";

  // klik på genstart2
  document.querySelector("#genstart2").addEventListener("click", startGame);
}
