const textElement = document.getElementById('text')
const optionButtonElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonElement.firstChild) {
        optionButtonElement.removeChild(optionButtonElement.firstChild)
    }

    textNode.options.forEach( option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonElement.appendChild(button) 
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'You find yourself alone in a room wearing a gothic maid outfit with nothing but a broom nearby.',
        options: [
            {
                text: 'Take broom',
                setState: { hasBroom: true },
                nextText: 2
            },
            {
                text: 'Leave broom',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You find the door is unlocked, so you leave the room to search for clues.',
        options: [
            {
                text: 'Sweep up the room before you leave, though the broom appears to be falling apart.',
                requiredState: (currentState) => currentState.hasBroom,
                setState: { hasBroom: false, roomCleaned: true },
                nextText: 3
            },
            {
                text: 'Leave the room messy. Brooms are for witches and peasants.',
                requiredState: (currentState) => currentState.hasBroom,
                setState: { hasBroom: false, roomMessy: true },
                nextText: 3
            },
            {
                text: 'Ignore everything and just leave.',
                nextText: 3
            },
        ]
    },
    {
        id: 3,
        text: 'You leave the room only to find the homeowner staring you down from a nearby chair.',
        options: [
            {
                text: 'Address the master of the house politely.',
                requiredState: (currentState) => currentState.roomCleaned,
                setState: { hasReward: true },
                nextText: 4
            },
            {
                text: 'Ask about the maid getup.',
                requiredState: (currentState) => currentState.roomMessy,
                nextText: 5
            },
            {
                text: 'Sprint past them towards what looks like an exit.',
                nextText: 6
            },
        ]
    },
    {
        id: 4,
        text: 'The master rewards you handsomely for your swift and kind service. While sad for the loss of his beloved broom, he says no more and points you towards the exit.',
        options: [
            {
                text: 'Use your reward to replace his broom.',
                requiredState: (currentState) => currentState.hasReward,
                setState: { winCondition: true },
                nextText: 7
            },
            {
                text: 'Take the money and get the hell out of dodge.',
                nextText: 8
            },
        ]
    },
    {
        id: 5,
        text: 'The homeowner casts a glower in your direction. "You wouldn\'t understand. Just go.".',
        options: [
            {
                text: 'Leave the house, ditch the maid clothes, and get on with your life.',
                nextText: 9
            },
            {
                text: 'Press the issue. You seriously want to know.',
                nextText: 10
            },
        ]
    },
    {
        id: 6,
        text: 'You get to the door only to find you are trapped. The homeowner\'s foorsteps fall heavy behind you, and you feel your impending doom.',
        options: [
            {
                text: 'Game over. Try interacting with literally anything or anyone for a change.',
                nextText: -1
            },
        ]
    },
    {
        id: 7,
        text: 'Overjoyed to be swept off his feet by Broommeister 3000, the owner leaves you his vast riches, the deed to his mansion, and an entire wardrobe of maid attire before riding into the sunset with his new beloved broom. JACKPOT.',
        options: [
            {
                text: 'Hell yeah. You win! Want to go again?',
                nextText: -1
            },
        ]
    },
    {
        id: 8,
        text: 'You can\'t help but wonder what might have been in store for you if you hadn\'t escaped when you did.',
        options: [
            {
                text: 'Oh well, it\'s probably for the best. Maybe you can try again and see what would have been.',
                nextText: -1
            },
        ]
    },
    {
        id: 9,
        text: 'That was one weird experience. Probably best to just forget the whole thing.',
        options: [
            {
                text: 'No, I want to remember. Let me go again!',
                nextText: -1
            },
        ]
    },
    {
        id: 10,
        text: 'The man goes absolutely berserk, ranting and raving about "proper maids" and how he wishes the room were just cleaned Claiming you left him no choice, he uses the broom to beat you into a maid-like pulp.',
        options: [
            {
                text: 'Man, that was messed up. Try again?',
                nextText: -1
            },
        ]
    },
]

startGame()