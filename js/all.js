(function () {
    'use strict';

    let sumCards = 36;
    let suitLength = sumCards / 4;

    function Deck() {

    }

    Object.defineProperties(Deck.prototype, {
        deckList: {
            value: function (...arg) {
                let suitCard = ['бубна', 'черви', 'пика', 'крести'];
                let number = 0;
                let deckLength = 'images/';

                for (let i = 0; i < 4; i++) {
                    for (let j = 1; j <= suitLength; j++) {
                        arg[i].push({
                            val: j,
                            card: deckLength + (j + number) + '.jpg',
                            suit: suitCard[i],
                            id: j + number
                        })
                    }
                    number += 9;

                }
                return arg;
            }
        },

        randomDeck: {
         value: function (deck) {
             function compareRandom(a, b) {
                 return Math.random() - 0.5;
             }
             return deck.sort(compareRandom);
         }   
        },

        suitValue: {
            value: function (suit) {
                for (let i = 0; i < suit.length; i++) {
                    if (suit[0].suit === suit[i].suit) {
                        suit[i].val = suit[i].val * 100;
                    }
                    
                }
            }
        }

    });


    window.Deck = Deck;
}());

(function () {
    'use strict';

    function Players () {

    }

    Object.defineProperties(Players.prototype, {
        handPlayers: {
            value: function (computer, player, deck, deck1, deck2, deckOnPage) {

                for (let i = 0; i < 6; i++) {
                    let card1 = document.createElement('img'),
                        card2 = document.createElement('img');
                    let a = deck.pop();
                    let b = deck.pop();
                    computer.push(a);
                    player.push(b);
                    deck1.appendChild(card1);
                    deck2.appendChild(card2);

                }
                deck.forEach(function () {
                    let a = document.createElement('img');
                    deckOnPage.appendChild(a)
                });


            }
        }
    });


    window.Players = Players;
}());

(function () {
    'use strict';
    let countPlayer = 0,
        countComputer = 0;
    let countPlayerHtml = document.querySelector('#playerCount'),
        countComputerHtml = document.querySelector('#computerCount');

    countPlayerHtml.textContent = 'Игрок: ' + countPlayer;
    countComputerHtml.textContent = 'Компьютер: ' + countComputer;


    let arr1 = [],
        arr2 = [],
        arr3 = [],
        arr4 = [];

    let deck = new Deck();
    deck.deckList(arr1, arr2, arr3, arr4);

    let deckList = arr1.concat(arr2, arr3, arr4),
        gameDeck = deck.randomDeck(deckList);
    deck.suitValue(gameDeck);


    let computerHandJs = [],
        playerHandJs = [];
    let deckForGame = document.querySelector('#deck'),
        boardForComputerCardsHtml = document.querySelector('.deck1'),
        boardForPlayerCardsHtml = document.querySelector('.deck2');
    let players = new Players();
    players.handPlayers(computerHandJs, playerHandJs, gameDeck, boardForComputerCardsHtml, boardForPlayerCardsHtml, deckForGame);
    let cardsForTurnTop = document.querySelector('#turn1');
    let cardsForTurnBottom = document.querySelector('#turn2');

    let cardsForTurnJS = [];
    let topOrBottom;
    let styleLeftForTurn = 10;
    let endTurn = document.querySelector('#end'),
        takeAllCards = document.querySelector('#take');
    let result;

    boardForPlayerCardsHtml.addEventListener('click', function (event) {
        let imgCardsForTurnTop = cardsForTurnTop.querySelectorAll('img'),
            imgCardsForTurnBottom = cardsForTurnBottom.querySelectorAll('img');
        if (imgCardsForTurnTop.length > imgCardsForTurnBottom.length) {
            topOrBottom = cardsForTurnBottom;
        } else {
            topOrBottom = cardsForTurnTop;
        }
        let target = event.target;


        if (target.localName === "img") {
            if (imgCardsForTurnTop.length === imgCardsForTurnBottom.length && cardsForTurnJS.length !== 0) {
                gameDurak.cardForTopPlayer(target);


            } else if (imgCardsForTurnTop.length > imgCardsForTurnBottom.length && cardsForTurnJS.length !== 0) {
                gameDurak.cardForBottomPlayer(target);

            } else if (cardsForTurnJS.length === 0) {
                for (let i = 0; i < playerHandJs.length; i++) {
                    if (target.id === `${playerHandJs[i].id}`) {
                        topOrBottom.appendChild(target);
                        target.style.marginLeft = `${styleLeftForTurn}px`;
                        cardsForTurnJS.push(playerHandJs.splice(i, 1).shift());
                        gameDurak.checkPlayer();
                    }
                }

            }


        }


    });

    endTurn.addEventListener('click', function () {
        let imgCardsForTurnTop = cardsForTurnTop.querySelectorAll('img'),
            imgCardsForTurnBottom = cardsForTurnBottom.querySelectorAll('img');
        if (cardsForTurnJS.length !== 0 && imgCardsForTurnTop.length === imgCardsForTurnBottom.length) {
            gameDurak.clearGameBoard(cardsForTurnJS);
            gameDurak.takingCards(computerHandJs, playerHandJs, gameDeck);
            gameDurak.cardPosition(computerHandJs, playerHandJs, gameDeck);
            gameDurak.turnComputer(computerHandJs, playerHandJs, cardsForTurnTop, cardsForTurnBottom);
            endTurn.classList.add('invisibility');
            takeAllCards.classList.remove('invisibility');
        }


    });
    takeAllCards.addEventListener('click', function () {
        let imgCardsForTurnTop = cardsForTurnTop.querySelectorAll('img'),
            imgCardsForTurnBottom = cardsForTurnBottom.querySelectorAll('img');
        if (cardsForTurnJS.length !== 0 && imgCardsForTurnTop.length > imgCardsForTurnBottom.length) {
            let forPush = cardsForTurnJS.splice(0, cardsForTurnJS.length);
            playerHandJs = playerHandJs.concat(forPush);
            gameDurak.removeCardsFromGameBoard(boardForPlayerCardsHtml);
            gameDurak.takingCards(computerHandJs, playerHandJs, gameDeck);
            gameDurak.cardPosition(computerHandJs, playerHandJs, gameDeck);
            gameDurak.turnComputer(computerHandJs, playerHandJs, cardsForTurnTop, cardsForTurnBottom);
            endTurn.classList.add('invisibility');
            takeAllCards.classList.remove('invisibility');
            if (gameDeck.length === 0 && computerHandJs.length === 0 && playerHandJs.length >= 1 && playerHandJs.length <= 2) {
                result = 'Вы проиграли';
                gameDurak.resultOfGame(result);
                countComputer += 1;
            }
        }


    });

    function getMinValue(array) {
        let min = array[0];
        for (let i = 0; i < array.length; i++) {
            if (min.val > array[i].val) {
                min = array[i];
            }
        }
        return min;
    }


    function Game() {

    }

    Object.defineProperties(Game.prototype, {
        cardPosition: {
            value: function (computerHandJs, playerHandJs, gameDeckJs) {
                let cardsForGame = document.querySelectorAll('#deck img');
                let src = 'images/cardback.jpg';
                if (gameDeckJs.length !== 0) {

                    cardsForGame = [...cardsForGame];
                    let position = 1120;
                    cardsForGame.forEach(function (v, i) {
                        v.src = src;
                        v.style.left = `${position}px`;
                        v.id = gameDeckJs[i].id;
                        position += 1
                    });
                    cardsForGame[0].src = gameDeckJs[0].card;
                    cardsForGame[0].classList.add('suit');
                    cardsForGame[0].style.left = '1080px';
                }


                let computerCards = document.querySelectorAll('.deck1 img');
                let playerCards = document.querySelectorAll('.deck2 img');
                let position1 = 100;
                for (let i = 0; i < computerCards.length; i++) {
                    computerCards[i].src = src;
                    computerCards[i].id = computerHandJs[i].id;
                    computerCards[i].style.left = `${position1}px`;
                    computerCards[i].style.marginLeft = 0 + 'px';
                    position1 += 40
                }

                let position2 = 100;
                for (let i = 0; i < playerCards.length; i++) {
                    playerCards[i].src = playerHandJs[i].card;
                    playerCards[i].id = playerHandJs[i].id;
                    playerCards[i].style.left = `${position2}px`;
                    playerCards[i].style.marginLeft = 0 + 'px';
                    position2 += 40
                }


            }
        },

        startGame: {
            value: function (computerHand, playerHand) {
                let deck1 = [],
                    deck2 = [];

                computerHand.forEach(function (v) {
                    for (let i = 100; i <= 900; i += 100) {
                        if (v.val === i) {
                            deck1.push(v.val)
                        }
                    }
                });
                playerHand.forEach(function (v) {
                    for (let i = 100; i <= 900; i += 100) {
                        if (v.val === i) {
                            deck2.push(v.val)
                        }
                    }
                });

                if (getMinValue(deck1) < getMinValue(deck2)) {
                    return 1;
                } else {
                    return 2;
                }
            }
        },

        turnComputer: {
            value: function (computerHand) {
                let imgCardsForTurnTop = cardsForTurnTop.querySelectorAll('img'),
                    imgCardsForTurnBottom = cardsForTurnBottom.querySelectorAll('img');
                if (imgCardsForTurnTop.length > imgCardsForTurnBottom.length) {
                    topOrBottom = cardsForTurnBottom
                } else {
                    topOrBottom = cardsForTurnTop;
                }


                let computerCards = document.querySelectorAll('.deck1 img');

                computerCards = [...computerCards];

                if (cardsForTurnJS.length === 0) {
                    let minCardComputer = [];
                    let a = `${getMinValue(computerHand).id}`;
                    for (let i = 0; i < computerHand.length; i++) {
                        if (computerCards[i].id === a) {
                            minCardComputer.push(computerHand.splice(i, 1).shift())
                        }
                    }
                    cardsForTurnJS.push(minCardComputer[0]);

                    let imgForTurnComputer = document.createElement('img');
                    imgForTurnComputer.src = minCardComputer[0].card;
                    imgForTurnComputer.id = minCardComputer[0].id;
                    computerCards.forEach(function (v) {
                        if (v.id === `${minCardComputer[0].id}`) {
                            v.remove();
                        }
                    });
                    topOrBottom.appendChild(imgForTurnComputer);
                    imgForTurnComputer.style.marginLeft = `${styleLeftForTurn}px`;
                    gameDurak.checkComputer();
                } else {

                    if (imgCardsForTurnTop.length > imgCardsForTurnBottom.length) {
                        gameDurak.cardsForBottomComputer();
                        gameDurak.checkComputer();
                    } else if (imgCardsForTurnTop.length === imgCardsForTurnBottom.length) {
                        gameDurak.cardsForTopComputer();
                        gameDurak.checkComputer();
                    }
                }

            }
        },

        clearGameBoard: {
            value: function (gameBoard) {
                gameBoard.splice(0, gameBoard.length);
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
        },
        takingCards: {
            value: function (computerHand, playerHand, gameDeck) {
                let cardsForGame = document.querySelectorAll('#deck img');
                cardsForGame = [...cardsForGame];
                while (gameDeck.length !== 0 && computerHand.length < 6) {
                    if (gameDeck.length === 1) {
                        cardsForGame[0].classList.remove('suit');
                    }
                    boardForComputerCardsHtml.appendChild(cardsForGame.pop());
                    computerHand.push(gameDeck.pop())
                }
                while (gameDeck.length !== 0 && playerHand.length < 6) {
                    if (gameDeck.length === 1) {
                        cardsForGame[0].classList.remove('suit');
                    }
                    boardForPlayerCardsHtml.appendChild(cardsForGame.pop());
                    playerHand.push(gameDeck.pop())
                }
            }
        },
        checkPlayer: {
            value: function () {
                if (cardsForTurnJS.length === 12 && gameDeck.length !== 0) {
                    gameDurak.clearGameBoard(cardsForTurnJS);
                    gameDurak.takingCards(computerHandJs, playerHandJs, gameDeck);
                    gameDurak.cardPosition(computerHandJs, playerHandJs, gameDeck);
                    endTurn.classList.remove('invisibility');
                    takeAllCards.classList.add('invisibility');

                } else {
                    if (playerHandJs.length === 0 && gameDeck.length === 0 && computerHandJs.length === 1) {
                        gameDurak.turnComputer(computerHandJs, playerHandJs, cardsForTurnTop, cardsForTurnBottom);
                    } else if (playerHandJs.length === 0 && gameDeck.length === 0 && computerHandJs.length === 0) {
                        result = 'Ничья';
                        gameDurak.resultOfGame(result);
                    } else if (playerHandJs.length === 0 && gameDeck.length === 0) {
                        result = 'Вы победили';
                        gameDurak.resultOfGame(result);
                        countPlayer += 1;
                    } else if (playerHandJs.length === 0) {
                        let imgCardsForTurnTop = cardsForTurnTop.querySelectorAll('img');
                        let imgCardsForTurnBottom = cardsForTurnBottom.querySelectorAll('img');
                        if (imgCardsForTurnTop.length > imgCardsForTurnBottom.length) {
                            gameDurak.turnComputer(computerHandJs, playerHandJs, cardsForTurnTop, cardsForTurnBottom);
                        } else if (imgCardsForTurnTop.length === imgCardsForTurnBottom.length) {
                            gameDurak.clearGameBoard(cardsForTurnJS);
                            gameDurak.takingCards(computerHandJs, playerHandJs, gameDeck);
                            gameDurak.cardPosition(computerHandJs, playerHandJs, gameDeck);
                        }

                    } else {
                        gameDurak.turnComputer(computerHandJs, playerHandJs, cardsForTurnTop, cardsForTurnBottom);
                    }
                }
            }
        },
        checkComputer: {
            value: function () {
                let imgCardsForTurnTop = cardsForTurnTop.querySelectorAll('img');
                let imgCardsForTurnBottom = cardsForTurnBottom.querySelectorAll('img');
                if (cardsForTurnJS.length === 12 && gameDeck.length !== 0) {
                    gameDurak.clearGameBoard(cardsForTurnJS);
                    gameDurak.takingCards(computerHandJs, playerHandJs, gameDeck);
                    gameDurak.cardPosition(computerHandJs, playerHandJs, gameDeck);
                    gameDurak.turnComputer(computerHandJs, playerHandJs, cardsForTurnTop, cardsForTurnBottom);
                    endTurn.classList.add('invisibility');
                    takeAllCards.classList.remove('invisibility');
                } else {
                    if (playerHandJs.length === 1 && gameDeck.length === 0 && computerHandJs.length === 0) {

                    } else if (playerHandJs.length === 0 && gameDeck.length === 0 && computerHandJs.length === 0) {
                        result = 'Ничья';
                        gameDurak.resultOfGame(result);
                    } else if (gameDeck.length === 0 && computerHandJs.length === 0) {
                        result = 'Вы проиграли';
                        gameDurak.resultOfGame(result);
                        countComputer += 1;
                    } else if (computerHandJs.length === 0 && imgCardsForTurnTop.length === imgCardsForTurnBottom) {
                        gameDurak.clearGameBoard(cardsForTurnJS);
                        gameDurak.takingCards(computerHandJs, playerHandJs, gameDeck);
                        gameDurak.cardPosition(computerHandJs, playerHandJs, gameDeck);

                    } else if (computerHandJs.length === 0) {
                        gameDurak.clearGameBoard(cardsForTurnJS);
                        gameDurak.takingCards(computerHandJs, playerHandJs, gameDeck);
                        gameDurak.cardPosition(computerHandJs, playerHandJs, gameDeck);
                    }
                }

            }
        },

        cardForTopPlayer: {
            value: function (htmlCard) {
                let card = [];
                let allCardsOnBoard = [];
                for (let i = 0; i < playerHandJs.length; i++) {
                    if (htmlCard.id === `${playerHandJs[i].id}`) {
                        card.push(playerHandJs.slice(i, i + 1).pop());
                        allCardsOnBoard = cardsForTurnJS.slice();
                        if (allCardsOnBoard.length > 1) {
                            for (let j = 0; j < allCardsOnBoard.length; j++) {
                                for (let k = allCardsOnBoard.length - 1; k > j; k--) {
                                    if (allCardsOnBoard[j].val === allCardsOnBoard[k].val * 100) {
                                        allCardsOnBoard[j].val = allCardsOnBoard[j].val / 100;
                                    }
                                    if (allCardsOnBoard[k].val === allCardsOnBoard[j].val || allCardsOnBoard[j].val * 100 === allCardsOnBoard[k].val) {
                                        allCardsOnBoard.splice(k, 1);
                                    }
                                }
                            }
                        }
                        allCardsOnBoard.forEach(function (v) {
                            if (card[0].val === v.val || card[0].val === v.val * 100 || card[0].val * 100 === v.val) {
                                topOrBottom.appendChild(htmlCard);
                                htmlCard.style.marginLeft = `${styleLeftForTurn}px`;
                                cardsForTurnJS.push(playerHandJs.splice(i, 1).shift());
                                gameDurak.checkPlayer();

                            }

                        })
                    }
                }
                endTurn.classList.remove('invisibility');
                takeAllCards.classList.add('invisibility');

            }
        },

        cardForBottomPlayer: {
            value: function (htmlCard) {
                let card = [];
                let lastCard = cardsForTurnJS[cardsForTurnJS.length - 1];
                for (let i = 0; i < playerHandJs.length; i++) {
                    if (htmlCard.id === `${playerHandJs[i].id}`) {
                        card.push(playerHandJs.slice(i, i + 1).pop());
                        if ((card[0].val > lastCard.val && card[0].suit === lastCard.suit)
                            || (card[0].val >= 10 && card[0].val > lastCard.val)) {
                            topOrBottom.appendChild(htmlCard);
                            cardsForTurnJS.push(playerHandJs.splice(i, 1).shift());
                            htmlCard.style.marginLeft = `${styleLeftForTurn}px`;
                            gameDurak.checkPlayer();
                        }

                    }
                }


            }
        },

        cardsForTopComputer: {
            value: function () {

                let card = [];
                for (let i = 0; i < cardsForTurnJS.length; i++) {
                    for (let j = 0; j < computerHandJs.length; j++) {
                        if (computerHandJs[j].val === cardsForTurnJS[i].val || computerHandJs[j].val * 100 === cardsForTurnJS[i].val || computerHandJs[j].val === cardsForTurnJS[i].val * 100) {
                            if (card.length === 0)
                                card.push(computerHandJs.splice(j, 1).shift());
                        }
                    }
                }
                if (card.length === 1) {
                    if (card.val > 500 && gameDeck.length > 8) {
                        let result = Math.round(Math.random() * 2);
                        if (result === 0) {
                            gameDurak.putTheCardForComputer(card);
                            cardsForTurnJS.push(card.shift());
                        } else {
                            gameDurak.clearGameBoard(cardsForTurnJS);
                            gameDurak.takingCards(computerHandJs, playerHandJs, gameDeck);
                            gameDurak.cardPosition(computerHandJs, playerHandJs, gameDeck);
                            endTurn.classList.remove('invisibility');
                            takeAllCards.classList.add('invisibility');
                        }
                    } else {
                        gameDurak.putTheCardForComputer(card);
                        cardsForTurnJS.push(card.shift());
                    }
                } else {
                    gameDurak.clearGameBoard(cardsForTurnJS);
                    gameDurak.takingCards(computerHandJs, playerHandJs, gameDeck);
                    gameDurak.cardPosition(computerHandJs, playerHandJs, gameDeck);
                    endTurn.classList.remove('invisibility');
                    takeAllCards.classList.add('invisibility');
                }
            }
        },

        cardsForBottomComputer: {
            value: function () {
                let computerHandHtml = boardForComputerCardsHtml.querySelectorAll('img');
                computerHandHtml = [...computerHandHtml];
                let a = 0;
                let card = [];
                let lastCard = cardsForTurnJS[cardsForTurnJS.length - 1];
                computerHandJs.forEach(function (v) {
                    if ((v.val > lastCard.val && v.suit === lastCard.suit) || (v.val >= 100 && v.val > lastCard.val))
                        card.push(v);
                });
                if (card.length !== 0) {
                    card = getMinValue(card);
                    for (let i = 0; i < computerHandJs.length; i++) {

                        if (card.val === computerHandJs[i].val && card.suit === computerHandJs[i].suit) {
                            computerHandHtml.forEach(function (v) {

                                if (v.id === `${computerHandJs[i].id}` && a === 0) {
                                    topOrBottom.appendChild(v);
                                    v.style.marginLeft = `${styleLeftForTurn}px`;
                                    v.src = computerHandJs[i].card;
                                    v.id = computerHandJs[i].id;
                                    cardsForTurnJS.push(computerHandJs.splice(i, 1)[0]);
                                    a = 1;
                                }
                            });
                        }
                    }
                }

                if (a === 0) {
                    let forPush = cardsForTurnJS.splice(0, cardsForTurnJS.length);
                    computerHandJs = computerHandJs.concat(forPush);
                    gameDurak.removeCardsFromGameBoard(boardForComputerCardsHtml);
                    gameDurak.takingCards(computerHandJs, playerHandJs, gameDeck);
                    gameDurak.cardPosition(computerHandJs, playerHandJs, gameDeck);
                    endTurn.classList.remove('invisibility');
                    takeAllCards.classList.add('invisibility');
                    if (gameDeck.length === 0 && playerHandJs.length === 0 && computerHandJs.length >= 1 && computerHandJs.length <= 2) {
                        result = 'Вы победили';
                        gameDurak.resultOfGame(result);
                        countPlayer += 1;
                    }
                }
            }
        },
        putTheCardForComputer: {
            value: function (card) {
                let computerHandHtml = boardForComputerCardsHtml.querySelectorAll('img');
                computerHandHtml = [...computerHandHtml];
                computerHandHtml.forEach(function (v) {
                    if (v.id === `${card[0].id}`) {
                        topOrBottom.appendChild(v);
                        v.style.marginLeft = `${styleLeftForTurn}px`;
                        v.src = card[0].card;
                        v.id = card[0].id;

                    }
                });
            }
        },

        removeCardsFromGameBoard: {
            value: function (boardForCardsHtml) {
                let a = cardsForTurnTop.querySelectorAll('img');
                let b = cardsForTurnBottom.querySelectorAll('img');
                a = [...a];
                b = [...b];
                a.forEach(function (v) {
                    boardForCardsHtml.appendChild(v);
                });
                b.forEach(function (v) {
                    boardForCardsHtml.appendChild(v);
                });
            }
        },

        resultOfGame: {
            value: function (value) {

                arr1 = [];
                arr2 = [];
                arr3 = [];
                arr4 = [];
                computerHandJs = [];
                playerHandJs = [];
                cardsForTurnJS = [];
                let div = document.createElement('div');
                let button = document.createElement('button');
                let winner = document.createElement('p');
                button.textContent = 'New Game';
                button.classList.add('button');

                button.addEventListener('click', function () {
                    let img = document.querySelectorAll('img');
                    img.forEach(function (v) {
                        v.remove();
                    });
                    div.remove();
                    countPlayerHtml.textContent = 'Игрок: ' + countPlayer;
                    countComputerHtml.textContent = 'Компьютер: ' + countComputer;
                    deck.deckList(arr1, arr2, arr3, arr4);
                    deckList = arr1.concat(arr2, arr3, arr4);
                    gameDeck = deck.randomDeck(deckList);
                    deck.suitValue(gameDeck);
                    players.handPlayers(computerHandJs, playerHandJs, gameDeck, boardForComputerCardsHtml, boardForPlayerCardsHtml, deckForGame);
                    gameDurak.cardPosition(computerHandJs, playerHandJs, gameDeck);
                    if (gameDurak.startGame(computerHandJs, playerHandJs) === 1) {
                        gameDurak.turnComputer(computerHandJs, cardsForTurnTop, cardsForTurnBottom);
                        endTurn.classList.add('invisibility');
                        takeAllCards.classList.remove('invisibility')
                    } else {
                        takeAllCards.classList.add('invisibility');
                        endTurn.classList.remove('invisibility');
                    }

                });
                div.style.width = '100%';
                div.style.height = '100%';
                div.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                div.style.position = 'fixed';
                div.style.zIndex = '9999';
                div.style.top = '0';
                div.style.left = '0';
                div.style.textAlign = 'center';
                div.style.verticalAlign = 'center';
                winner.style.color = 'white';
                winner.style.fontSize = '20pt';
                winner.textContent = value;
                div.appendChild(winner);
                div.appendChild(button);
                document.body.appendChild(div);
            }
        }

    });


    let gameDurak = new Game();

    gameDurak.cardPosition(computerHandJs, playerHandJs, gameDeck);
    if (gameDurak.startGame(computerHandJs, playerHandJs) === 1) {
        gameDurak.turnComputer(computerHandJs, cardsForTurnTop, cardsForTurnBottom);
        endTurn.classList.add('invisibility');
    } else {
        takeAllCards.classList.add('invisibility');
    }


}());
