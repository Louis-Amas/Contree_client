const normalValues = {
    'A': 11,
    '10': 10,
    'K': 4,
    'Q': 3,
    'J': 2,
    '9': 2,
    '8': 1,
    '7': 0,
}

const assetValues = {
    'J': 20,
    '9': 14,
    'A': 11,
    '10': 10,
    'K': 4,
    'Q': 3,
    '8': 2,
    '7': 1,
}

const familyArtificialValue = {
    'clovers': 0,
    'diamonds': 100,
    'spades': 200,
    'hearts': 300
}


const sortCard = (asset) => (c1, c2) => {
    let c1Value = familyArtificialValue[c1.family] 
    if (c1.family === asset) 
        c1Value += assetValues[c1.value]
    else 
        c1Value += normalValues[c1.value]

    let c2Value = familyArtificialValue[c2.family]
    if (c2.family === asset) 
        c2Value += assetValues[c2.value]
    else 
        c2Value += normalValues[c2.value]

        
    return c2Value - c1Value;
}

const sortCardAllAsset = (c1, c2) => {
    let c1Value = familyArtificialValue[c1.family]
    c1Value += assetValues[c1.value]


    let c2Value = familyArtificialValue[c2.family]
    c2Value += assetValues[c2.value]

    return c2Value - c1Value
}

export default {
    'clovers': sortCard('clovers'),
    'diamonds': sortCard('diamonds'),
    'spades': sortCard('spades'),
    'hearts': sortCard('hearts'),
    'noAsset': sortCard(''),
    'allAsset': sortCardAllAsset
}