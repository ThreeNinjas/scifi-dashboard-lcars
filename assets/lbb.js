document.addEventListener("DOMContentLoaded", function() {
    getCurrentConditions('temp').then(currentTemp => {
        const tempBoxes = document.getElementsByClassName("lbb-t");
        const tempIndex = tempBoxes.length - (Math.floor(currentTemp / 10))
        colorBoxes(tempBoxes, tempIndex, 'temp');
        tempBoxes[tempIndex].textContent = `CTE-${currentTemp}`;
    })

    getCurrentConditions('humidity').then(currentHumidity => {
        const humidityBoxes = document.getElementsByClassName('lbb-h');
        const humidityIndex = humidityBoxes.length - (Math.floor(currentHumidity / 10));
        colorBoxes(humidityBoxes, humidityIndex, 'humidity');
        humidityBoxes[humidityIndex].textContent = `CRH-${currentHumidity}`;
        })
});

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function colorBoxes(boxes, index, type) {
    for (let i = 0; i < boxes.length; i++) {
        if (i >= index) {
            boxes[i].style.backgroundColor = color(type);
            await sleep(100);
        } else {
            boxes[i].style.backgroundColor = color('none');
        }
    }
}

function color(type) {
    switch (type) {
        case 'temp':
            var colors = [
                'mars',
            ];
            return 'var(--' + colors[Math.floor(Math.random() * colors.length)]  + ')';
        break;

        case 'humidity':
            var colors = [
                'blue',
            ];
            return 'var(--' + colors[Math.floor(Math.random() * colors.length)]  + ')';
        break;

        case 'none':
            var colors = [
                'butterscotch',
                'african-violet',
                'almond',
                'almond-creme',
                'gold',
                'golden-orange',
                'green',
                'ice',
                'lilac',
                'lima-bean',
                'magenta',
                'moonlit-violet',
                'orange',
                'peach',
                'sky',
                'space-white',
                'sunflower',
                'violet-creme',
                'tomato',
                'red',
            ];
            return 'var(--' + colors[Math.floor(Math.random() * colors.length)]  + ')';
        break;
    }
}

function getCurrentConditions(type) {
    const baseUrl = 'http://199.19.74.165:3000/weather/';

    return fetch(baseUrl + 'current-' + type)
        .then(response => response.json())
        .then(data => data.temp);
}