document.addEventListener("DOMContentLoaded", function() {
    console.log('loaded, me');
    getCurrentConditions('temp').then(currentTemp => {
        console.log(currentTemp);
        const tempBoxes = document.getElementsByClassName("lbb-t");
        const tempIndex = tempBoxes.length - (Math.floor(currentTemp / 10))
        colorBoxes(tempBoxes, tempIndex, 'temp');
    })

    getCurrentConditions('humidity').then(currentHumidity => {
        console.log(currentHumidity);
        const humidityBoxes = document.getElementsByClassName('lbb-h');
        const humidityIndex = humidityBoxes.length - (Math.floor(currentHumidity / 10));
        colorBoxes(humidityBoxes, humidityIndex, 'humidity');
        })
});

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function colorBoxes(boxes, index, type) {
    for (let i = 0; i < boxes.length; i++) {
        if (i >= index) {
            boxes[i].style.backgroundColor = color(type);
            await sleep(250);
        }
    }
}

function color(type) {
    switch (type) {
        case 'temp':
            var colors = [
                'red',
                'mars',
                'tomato',
            ];
            return 'var(--' + colors[Math.floor(Math.random() * colors.length)]  + ')';
        break;

         case 'humidity':
            var colors = [
                'blue',
                'bluey',
                'moonlit-violet',
            ];
            return 'var(--' + colors[Math.floor(Math.random() * colors.length)]  + ')';
        break;
    }
}

function setLBB(type) {
    
}

function getCurrentConditions(type) {
    const baseUrl = 'http://199.19.74.165:3000/weather/';

    return fetch(baseUrl + 'current-' + type)
        .then(response => response.json())
        .then(data => data.temp);
}