document.addEventListener("DOMContentLoaded", function() {
    getiNatData().then(data => {
        console.log(data);
        
        let featuredIndex = 0;
    
        updateFeatured(featuredIndex);

        const list = document.querySelector('.inat-list');

        for (let i = 0; i < data.length; i++) {
            list.insertAdjacentHTML(
                'beforeend',
                `<div class="inat-row ${ i == featuredIndex ? 'is-active' : ''}" data-index="${i}">
                      <div class="inat-row-accent" style="background: ${getAccentBg(data[i].higher_classification)}"></div>
                      <div class="inat-row-thumb">
                      <a href="${data[i].url}" target="_blank">  
                        <img
                            src="${data[i].photo}"
                            alt=""
                            />
                        </a>
                      </div>
                      <div class="inat-row-main">
                        <div class="inat-row-title">
                            <a href="${data[i].url}" target="_blank" style="color:${getAccentBg(data[i].higher_classification)} !important;">${data[i].taxon}</a>
                            </div>
                        <div class="inat-row-date">${data[i].date_observed.replaceAll('-', '.')}</div>
                      </div>
                      <div class="inat-row-status is-logged" style="background: ${getLoggedBg(data[i].location_label)}">${data[i].location_label.toUpperCase()}</div>
                      <div class="inat-row-accent-end" style="background: ${getAccentBg(data[i].higher_classification)}"></div>
                    </div>`
            );
        }

        list.addEventListener('click', e => {
            const row = e.target.closest('.inat-row');
            
            if (!row) return;

            featuredIndex = Number(row.dataset.index);

            document.querySelector('.inat-row.is-active')?.classList.remove('is-active');
            row.classList.add('is-active');

            updateFeatured(featuredIndex);
            clearInterval(timer);
        });

        timer = setInterval(() => {
            featuredIndex++;

            if (featuredIndex >= data.length) {
                featuredIndex = 0;
            }

            document.querySelector('.inat-row.is-active')?.classList.remove('is-active');

            const nextRow = document.querySelector(`.inat-row[data-index="${featuredIndex}"]`);

            if (nextRow) {
                nextRow.classList.add('is-active');
                nextRow.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }

            updateFeatured(featuredIndex);
        }, 1500);

        function updateFeatured(index) {
            let feature = document.querySelector('inat-feature');
            const featuredOb = data[index];

            document.querySelector('.inat-photo img').src = featuredOb.photo;
            document.querySelector('.inat-photo').style.borderColor = getAccentBg(featuredOb.higher_classification);
            document.querySelector('.inat-photo img').alt = featuredOb.taxon;
            document.querySelector('.inat-photo a').href = featuredOb.url;

            document.querySelector('.inat-sci').textContent = featuredOb.taxon;
            document.querySelector('.inat-sci').style.color = getAccentBg(featuredOb.higher_classification);
            document.querySelector('.inat-divider').style.backgroundColor = getLoggedBg(featuredOb.location_label);
            document.querySelector('.inat-tax').textContent = `${featuredOb.location} / ${featuredOb.location_label.toUpperCase()}`;

            document.querySelector('#inat-v-common').textContent = featuredOb.common_name == "" ? "PREVIOUSLY UNKNOWN LIFEFORM" : featuredOb.common_name.toUpperCase();

            document.querySelector('#inat-v-observed').textContent = featuredOb.date_observed.replaceAll('-', '.')
        }
        
    })
})

function getiNatData() {
    const url = 'http://localhost:3000/creatures/';
    
    return fetch(url)
        .then(r => r.json())
}

function getAccentBg(data) {
    switch (data) {
        case 'bird':
            return 'var(--gold)';
        case 'plant':
            return 'var(--green)';
        case 'amphibian':
            return 'var(--lima-bean)';
        case 'reptile':
            return 'var(--magenta)';
        case 'mammal':
            return 'var(--african-violet)';
        default:
            return 'var(--sunflower)'

    }
}

function getLoggedBg(data) {
    switch (data) {
        case 'Roberts Creek':
            return 'var(--african-violet)';
        case 'Oregon':
            return 'var(--almond)';
        case 'South Africa':
            return 'var(--almond-creme)';
        case 'Washington':
            return 'var(--blue)';
        case 'anywhere':
            return 'var(--bluey)';
        case 'Louisiana':
            return 'var(--butterscotch)';
        case 'Puget Sound':
            return 'var(--gold)';
        case 'Gulf of Mexico':
            return 'var(--sunflower)';
        case 'Lake Pontchartrain':
            return 'var(--gray)';
        case '98201':
            return 'var(--green)';
        case 'edible':
            return 'var(--ice)';
        default: return 'var(--moonlit-violet)';
    }
}

