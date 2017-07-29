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
    //console.log(gameDeck);

    let computerHand = [],
        playerHand = [];
    let deckForGame = document.querySelector('#deck'),
        deck1 = document.querySelector('.deck1'),
        deck2 = document.querySelector('.deck2');
    let players = new Players();
    players.handPlayers(computerHand, playerHand, gameDeck, deck1, deck2, deckForGame);
    let cardsForTurnTop = document.querySelector('#turn1');
    let cardsForTurnBottom = document.querySelector('#turn2');

    //console.log(computerHand);
    //console.log(playerHand);
    let cardsForTurnJS = [];
    let topOrBottom;
    let styleLeftForTurn = 10;
    let endTurn = document.querySelector('#end'),
        takeAllCards = document.querySelector('#take');

    deck2.addEventListener('click', function (event) {
        let imgCardsForTurnTop = cardsForTurnTop.querySelectorAll('img'),
            imgCardsForTurnBottom = cardsForTurnBottom.querySelectorAll('img');
        if (imgCardsForTurnTop.length > imgCardsForTurnBottom.length) {
            topOrBottom = cardsForTurnBottom
        } else {
            topOrBottom = cardsForTurnTop;
        }
        let target = event.target;


        if (target.localName === "img")
            for (let i = 0; i < playerHand.length; i++) {


                if (target.id === `${playerHand[i].id}`) {

                    topOrBottom.appendChild(target);

                    target.style.marginLeft = `${styleLeftForTurn}px`;

                    cardsForTurnJS.push(playerHand.splice(i, 1))
                }
            }
        console.log(playerHand);
    });
    endTurn.addEventListener('click', function () {
        if (cardsForTurnJS.length !== 0) {
            cardsForTurnJS.splice(0, cardsForTurnJS.length);
            let a = cardsForTurnTop.querySelectorAll('img');
            let b = cardsForTurnBottom.querySelectorAll('img');
            a = [...a];
            b = [...b];
            a.forEach(function (v) {
                v.remove();
            });
            b.forEach(function (v) {
                v.remove()
            });
        }
        console.log(cardsForTurnJS);
        gameDurak.cardPosition(computerHand, playerHand, gameDeck);

    });
    takeAllCards.addEventListener('click', function () {
        let forPush = cardsForTurnJS.splice(0, cardsForTurnJS.length);
        forPush.forEach(function (v, i) {
           forPush.splice(i, 1, v.pop());
        });
        playerHand = playerHand.concat(forPush);
        let a = cardsForTurnTop.querySelectorAll('img');
        let b = cardsForTurnBottom.querySelectorAll('img');
        a = [...a];
        b = [...b];
        a.forEach(function (v) {
            deck2.appendChild(v);
        });
        b.forEach(function (v) {
            deck2.appendChild(v);
        });
        console.log(playerHand);
        gameDurak.cardPosition(computerHand, playerHand, gameDeck);

    });


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
                computerCards.forEach(function (v, i) {
                    v.src = src;
                    v.id = computerHand[i].id;
                    v.style.left = `${position1}px`;
                    v.style.marginLeft = 0 + 'px';
                    position1 += 40
                });
                let position2 = 100;
                playerCards.forEach(function (v, i) {
                    v.src = playerHand[i].card;
                    v.id = playerHand[i].id;
                    v.style.left = `${position2}px`;
                    v.style.marginLeft = 0 + 'px';
                    position2 += 40
                });

            }
        },

        startGame: {
            value: function (computerHand, playerHand) {
                let deck1 = [],
                    deck2 = [];

                computerHand.forEach(function (v) {
                    for (let i = 10; i <= 90; i += 10) {
                        if (v.val === i) {
                            deck1.push(v.val)
                        }
                    }
                });
                playerHand.forEach(function (v) {
                    for (let i = 10; i <= 90; i += 10) {
                        if (v.val === i) {
                            deck2.push(v.val)
                        }
                    }
                });

                function getMinValue(array) {
                    let min = array[0];
                    for (let i = 0; i < array.length; i++) {
                        if (min > array[i]) min = array[i];
                    }
                    return min;
                }

                console.log(deck1);
                console.log(deck2);
                if (getMinValue(deck1) < getMinValue(deck2)) {
                    return 1;
                } else {
                    return 2;
                }
            }
        },

        turnComputer: {
            value: function (computerHand, playerHand, cardsForTurnComputer, cardsForTurnPlayer) {


                let computerCards = document.querySelectorAll('.deck1 img');
                let playerCards = document.querySelectorAll('.deck2 img');
                computerCards = [...computerCards];
                playerCards = [...playerCards];

                function getMinValue(array) {
                    let min = array[0];
                    for (let i = 0; i < array.length; i++) {
                        if (min.val > array[i].val) {
                            min = array[i];
                        }
                    }
                    return min;
                }

                let minCardComputer = [];
                let a = `${getMinValue(computerHand).id}`;
                for (let i = 0; i < computerHand.length; i++) {
                    if (computerCards[i].id === a) {
                        minCardComputer.push(computerHand.splice(i, 1).shift())
                    }
                }
                cardsForTurnJS.push(minCardComputer);

                let imgForTurnComputer = document.createElement('img');
                imgForTurnComputer.src = minCardComputer[0].card;
                imgForTurnComputer.id = minCardComputer[0].id;
                computerCards.forEach(function (v) {
                    if (v.id === `${minCardComputer[0].id}`) {
                        v.remove();
                    }
                });
                cardsForTurnComputer.appendChild(imgForTurnComputer);
                imgForTurnComputer.style.marginLeft = `${styleLeftForTurn}px`;


            }
        },

        turnPlayer: {
            value: function () {

            }
        }

    });


    let gameDurak = new Game();

    gameDurak.cardPosition(computerHand, playerHand, gameDeck);
    gameDurak.startGame(computerHand, playerHand);
    gameDurak.turnComputer(computerHand, playerHand, cardsForTurnTop, cardsForTurnBottom);
    console.log(playerHand);

}());
