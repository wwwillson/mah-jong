var listen_cards = [];
todo();

async function todo() {
    const cards = await fetchCard();
    creatControlCards(cards);
    window.onclick = function (clickEvent) {
        if (clickEvent.target.classList[0] == 'control-img') {
            creatChoseCards(cards, clickEvent.target);
            checkAndHideConrolCard();
            get_listen_cards(cards);
        }
        else if (clickEvent.target.classList[0] == 'chose-img') {
            clickEvent.target.remove();
            checkAndHideConrolCard();
            get_listen_cards(cards);
        }
    }
}

async function fetchCard() {
    const response = await fetch('cards.json');
    const cards = await response.json();
    return cards;
}

function creatControlCards(cards) {
    const controlDiv = document.getElementById('control');
    cards.forEach((card, index) => {
        const controlImg = document.createElement('img');
        controlImg.classList.add('control-img');
        controlImg.src = card.img;
        controlImg.alt = index + 1;
        controlDiv.append(controlImg);
    });
}

function creatChoseCards(cards, target) {
    const choseClass = document.getElementsByClassName('chose-img');
    if (choseClass.length < 17) {
        const choseDiv = document.getElementById('chose');
        const choseImg = document.createElement('img');
        choseImg.classList.add('chose-img');
        choseImg.src = cards[target.alt - 1].img;
        choseImg.alt = target.alt;
        choseDiv.append(choseImg);
    }
}

function checkAndHideConrolCard() {
    const card_array = [];
    const choseClass = document.getElementsByClassName('chose-img');
    Array.from(choseClass).forEach(card => {
        card_array.push(`${card.alt}`);
        const sameCards = card_array.filter(sameCard => sameCard == `${card.alt}`);
        const controlImg = document.getElementsByClassName('control-img');
        Array.from(controlImg).forEach(img => {
            if (img.alt == card.alt) {
                const newImg = document.getElementsByClassName('control-img')[card.alt - 1];
                if (sameCards.length >= 4) {
                    newImg.style.visibility = 'hidden';
                }
                else {
                    newImg.style.visibility = 'visible';
                }
            }
        })
    })
}

async function get_listen_cards(cards) {
    document.getElementById('t1').style.visibility = "hidden";
    document.getElementById('t2').style.visibility = "hidden";

    const ansImage = document.getElementsByClassName('ans-img');
    Array.from(ansImage).forEach(ans => {
        ans.remove();
    })

    const card_array = [];
    const choseClass = document.getElementsByClassName('chose-img');
    Array.from(choseClass).forEach(card => {
        card_array.push(`${card.alt}`);
    })
    card_array.sort();

    if (card_array.length % 3 == 1) {
        listen_cards = [];
        DFS(card_array)
        const sortCards = [...new Set(listen_cards)];
        const new_listen_cards = removeHiddenCard(sortCards.sort());
        if (new_listen_cards.length > 0) {
            createlisten(cards, new_listen_cards);
        }
    }
    else if (card_array.length % 3 == 2) {
        for (let i = 0; i < card_array.length; i++) {
            if (card_array[i] == card_array[i + 1]) {
                continue;
            }
            listen_cards = [];
            const new_card_array = card_array.slice();
            new_card_array.splice(i, 1);
            DFS(new_card_array);
            if (listen_cards.indexOf(card_array[i]) == -1) {
                const sortCards = [...new Set(listen_cards)];
                const new_listen_cards = removeHiddenCard(sortCards.sort());
                if (new_listen_cards.length > 0) {
                    createleave(cards, card_array[i]);
                    createlisten(cards, new_listen_cards);
                }
            }
        }
    }
}

function DFS(card_array) {
    let card1, card2, card3;

    if (card_array.length == 1) {
        listen_cards.push(card_array[0]);
    }
    else if (card_array.length == 2) {
        card1 = parseInt(card_array[0]);
        card2 = parseInt(card_array[1]);
        if (card1 == card2) {
            listen_cards.push(card_array[0]);
        }
        else if (card1 + 1 == card2) {
            if (card1 != 1) {
                listen_cards.push(`${card1 - 1}`);
            }
            if (card2 != 9) {
                listen_cards.push(`${card1 + 2}`);
            }
        }
        else if (card1 + 2 == card2) {
            listen_cards.push(`${card1 + 1}`);
        }
    }
    else if (card_array.length > 3) {
        for (let i = 0; i < card_array.length; i++) {
            card1 = parseInt(card_array[i]);
            card2 = parseInt(card_array[i + 1]);
            card3 = parseInt(card_array[i + 2]);

            if (card1 == card2 && card1 == card3) {
                let new_array = [];
                for (let x = 0; x < card_array.length; x++) {
                    if (x == i || x == i + 1 || x == i + 2) {
                        continue;
                    }
                    new_array.push(card_array[x]);
                }
                DFS(new_array);
            }

            card2 = card1 + 1;
            card3 = card1 + 2;
            if ((card_array.indexOf(`${card2}`) != -1) && (card_array.indexOf(`${card3}`) != -1)) {
                let new_array = [];
                for (let x = 0; x < card_array.length; x++) {
                    if (x == i || x == card_array.indexOf(`${card2}`) || x == card_array.indexOf(`${card3}`)) {
                        continue;
                    }
                    new_array.push(card_array[x]);
                }
                DFS(new_array);
            }

            if (card1 == parseInt(card_array[i + 1]) && card_array.length == 4) {
                let new_array = [];
                for (let x = 0; x < card_array.length; x++) {
                    if (x == i || x == i + 1) {
                        continue;
                    }
                    new_array.push(card_array[x]);
                }
                DFS(new_array);
            }
        }
    }
}

function removeHiddenCard(listenCard) {
    const new_listen_cards = [];
    listenCard.forEach(function (card) {
        const controlImg = document.getElementsByClassName('control-img')[card - 1];
        if (controlImg.style.visibility != "hidden") {
            new_listen_cards.push(card);
        }
    })
    return new_listen_cards;
}

function createleave(cards, leaveCard) {
    document.getElementById('t1').style.visibility = "visible";

    const leaveDiv = document.getElementById('leave');
    const ansDiv = document.createElement('div');
    const img = document.createElement('img')
    img.classList.add('ans-img');
    img.src = cards[parseInt(leaveCard) - 1].img;
    ansDiv.append(img);
    leaveDiv.append(ansDiv);
}

function createlisten(cards, listenCard) {
    document.getElementById('t2').style.visibility = "visible";

    const listenDiv = document.getElementById('listen');
    const ansDiv = document.createElement('div');
    listenCard.forEach(function (item) {
        const img = document.createElement('img')
        img.classList.add('ans-img');
        img.src = cards[parseInt(item) - 1].img;
        ansDiv.append(img)
        listenDiv.append(ansDiv);
    })
}