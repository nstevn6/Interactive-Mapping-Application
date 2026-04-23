function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const coords = [];
for (let i = 0; i < 3; i++) {
    const latitude = getRandomInRange(30, 35, 3);
    const longitude = getRandomInRange(-100, -90, 3); 
    coords.push([latitude, longitude]);
}

function loadMap() {
    const map = L.map('map').setView([33, -95], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const outputDiv = document.getElementById('output');
    coords.forEach((coord, index) => {
        L.marker(coord).addTo(map);

        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord[0]}&longitude=${coord[1]}&localityLanguage=en`)
            .then(res => res.json())
            .then(data => {
                const locality = data.locality || data.city || "Location unknown";
                outputDiv.innerHTML += `
                <h3>Marker ${index + 1}: Latitude ${coord[0]}, Longitude ${coord[1]}</h3>
                <p>Locality: ${locality}</p>
            `;
        });
    });
}

window.onload = loadMap;