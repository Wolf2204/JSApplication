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
                        suit[i].val = suit[i].val * 10;
                    }
                    
                }
            }
        }

    });


    window.Deck = Deck;
}());
