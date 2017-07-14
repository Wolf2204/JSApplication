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
    let deck1 = document.querySelector('.deck1'),
        deck2 = document.querySelector('.deck2');
    let players = new Players();
    players.handPlayers(computerHand, playerHand, gameDeck, deck1, deck2);
    console.log(computerHand);
    console.log(playerHand);





    function Game() {

    }

    Object.defineProperties(Game.prototype, {
        game: function () {

        }
    });


    let gameDurak = new Game();
}());
