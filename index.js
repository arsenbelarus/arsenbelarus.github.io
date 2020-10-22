const gameStart = () => {
  debugger;
  const pieces = [
    "whitepawn.png",
    "whitepawn.png",
    "whiteknight.png",
    "whiteknight.png",
    "whitebishop.png",
    "whitebishop.png",
    "whiterook.png",
    "whiterook.png",
    "whiteking.png",
    "whiteking.png",
    "whitequeen.png",
    "whitequeen.png",
    "blackpawn.png",
    "blackpawn.png",
    "blackknight.png",
    "blackknight.png",
    "blackbishop.png",
    "blackbishop.png",
    "blackrook.png",
    "blackrook.png",
    "blackking.png",
    "blackking.png",
    "blackqueen.png",
    "blackqueen.png",
  ];

  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = pieces[i];
    pieces[i] = pieces[j];
    pieces[j] = temp;
  }

  let count = document.getElementById("count");
  let countHeader = document.getElementById("countHeader");
  let cards = document.getElementsByClassName("card");
  let button = document.getElementById("button");

  let turnsCounter = 0;
  let isFirst = true;
  let lock = false;
  let pairs = pieces.length / 2;
  let firstCardNumber;

  // 5 seconds to remember cards position
  const initialCardsOpening = () => {
    lock = true;
    for (let card of cards) {
      //document.getElementById(card.id).style.opacity = 0.7;
      card.style.background = `url(./img/${pieces[card.id.substring(4)]})`;
      card.style.backgroundPosition = "center";
      card.style.backgroundSize = "contain";
      card.style.backgroundRepeat = "no-repeat";
    }
    setTimeout(() => {
      for (let card of cards) {
        card.style.background = "url(./img/logo.png)";
        card.style.backgroundPosition = "center";
        card.style.backgroundSize = "cover";
        card.style.backgroundRepeat = "no-repeat";
      }
      lock = false;
    }, 5000);
  };

  initialCardsOpening();

  for (let card of cards) {
    card.addEventListener("click", () => cardOpenHandler(card));
  }

  const cardOpenHandler = (card) => {
    button.setAttribute("disabled", "true");
    const singleCard = document.getElementById(card.id);
    const numberFromId = card.id.substring(4);
    const opacityValue = window
      .getComputedStyle(singleCard)
      .getPropertyValue("opacity");

    if (opacityValue != 0 && !lock) {
      lock = true;

      singleCard.style.background = `url(./img/${pieces[numberFromId]})`;
      singleCard.style.backgroundPosition = "center";
      singleCard.style.backgroundSize = "contain";
      singleCard.style.backgroundRepeat = "no-repeat";
      singleCard.setAttribute("class", "cardRevealed");

      if (isFirst) {
        // first card opened

        isFirst = !isFirst;
        firstCardNumber = numberFromId;
        lock = false;
      } else {
        // second card opened

        if (pieces[numberFromId] === pieces[firstCardNumber]) {
          // pair found

          setTimeout(() => {
            hideCards(numberFromId, firstCardNumber);
          }, 1000);
        } else {
          // not a pair

          setTimeout(() => {
            restoreCards(numberFromId, firstCardNumber);
          }, 1000);
        }
        turnsCounter++;
        count.innerHTML = turnsCounter;
        isFirst = !isFirst;
      }
    }
  };

  const hideCards = (firstCard, secondCard) => {
    document.getElementById(`card${firstCard}`).style.opacity = 0;
    document.getElementById(`card${secondCard}`).style.opacity = 0;

    pairs--;

    // Game over
    if (pairs === 0) {
      button.removeAttribute("disabled", "true");
      countHeader.innerHTML = `Победа!!! Потрачено ${turnsCounter} ходов`;
      count.innerHTML = "";
      button.innerHTML = "Ещё раз";
      button.setAttribute("onclick", "document.location.reload()");
    }

    lock = false;
  };

  const restoreCards = (firstCard, secondCard) => {
    document.getElementById(`card${firstCard}`).style.background =
      "url(./img/logo.png)";
    document.getElementById(`card${firstCard}`).style.backgroundPosition =
      "center";
    document.getElementById(`card${firstCard}`).style.backgroundSize = "cover";
    document.getElementById(`card${firstCard}`).setAttribute("class", "card");

    document.getElementById(`card${secondCard}`).style.background =
      "url(./img/logo.png)";
    document.getElementById(`card${secondCard}`).style.backgroundPosition =
      "center";
    document.getElementById(`card${secondCard}`).style.backgroundSize = "cover";
    document.getElementById(`card${secondCard}`).setAttribute("class", "card");

    lock = false;
  };
};
