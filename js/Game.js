(function () {
    'use strict';

    let arr1 = [],
        arr2 = [],
        arr3 = [],
        arr4 = [];

    let deck = new Deck();
    deck.deckList(arr1, arr2, arr3, arr4);

    let deckList = arr1.concat(arr2, arr3, arr4),
        gameDeck = deck.randomDeck(deckList);
    deck.suitValue(gameDeck);
    console.log(gameDeck);

    let computerHand = [],
        playerHand = [];
    let deckForGame = document.querySelector('#deck'),
        deck1 = document.querySelector('.deck1'),
        deck2 = document.querySelector('.deck2');
    let players = new Players();
    players.handPlayers(computerHand, playerHand, gameDeck, deck1, deck2, deckForGame);
    console.log(computerHand);
    console.log(playerHand);


    function Game() {

    }

    Object.defineProperties(Game.prototype, {
        cardPosition: {
            value: function (computerHand, playerHand, gameDeck) {

                let cardsForGame = document.querySelectorAll('#deck img');
                let src = 'images/cardback.jpg';
                cardsForGame = [...cardsForGame];
                let position = 1120;
                cardsForGame.forEach(function (v) {
                    v.src = src;
                    v.style.left = `${position}px`;
                    position += 1
                });
                console.log(cardsForGame);
                cardsForGame[0].src = gameDeck[0].card;
                cardsForGame[0].classList.add('suit');
                cardsForGame[0].style.left = '1080px';


                let computerCards = document.querySelectorAll('.deck1 img');
                let playerCards = document.querySelectorAll('.deck2 img');
                let position1 = 100;
                computerCards.forEach(function (v) {
                    v.src = src;
                    v.style.left = `${position1}px`;
                    position1 += 40
                });
                let position2 = 100;
                playerCards.forEach(function (v, i) {
                    v.src = playerHand[i].card;
                    v.style.left = `${position2}px`;
                    position2 += 40
                });
                console.log(computerCards);
                console.log(playerCards);
            }
        },

        startGame: {
          value: function () {

          }
        },

        turnPlayer: {
          value: function () {

          }
        },

        turnComputer: {
            value: function () {

            }
        }

    });


    let gameDurak = new Game();

    gameDurak.cardPosition(computerHand, playerHand, gameDeck);
}());
