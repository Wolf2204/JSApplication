(function () {
    'use strict';

    function Players () {

    }

    Object.defineProperties(Players.prototype, {
        handPlayers: {
            value: function (computer, player, deck, deck1, deck2, deckOnPage) {
                //let position = 50;
                for (let i = 0; i < 6; i++) {
                    let card1 = document.createElement('img'),
                        card2 = document.createElement('img');
                    let a = deck.pop();
                    let b = deck.pop();
                    computer.push(a);
                    player.push(b);
                    deck1.appendChild(card1);
                    deck2.appendChild(card2);


                    //deck1[i].style.left(`${position}px`);
                    //deck2[i].style.left(`${position}px`);
                    //position +=20
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
