/* global google */
const key = "iamthezevvwolf";
const storageArr = [];
console.log(storageArr);
const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
  google.maps.importLibrary("maps"),
  google.maps.importLibrary("marker"),
]);

const map = new Map(document.querySelector("#map"), {
  center: { lat: 40.09543950426593, lng: -74.2221793333354 },
  zoom: 18,
  mapId: "DEMO_MAP_ID",
});
const clear = document.querySelector(".clrBtn");
clear.addEventListener("click", () => localStorage.clear());
const placesList = document.querySelector("#places");
const searchInput = document.querySelector("#search");

const infoWindow = new InfoWindow();

let currentlySelectedSummary;

window.onload = () => {
  try {
    const savedPlaces = JSON.parse(localStorage.getItem("places"));
    console.log(savedPlaces);

    const bounds = new google.maps.LatLngBounds();

    savedPlaces?.forEach((place) => {
      const loc = { lat: place.location.lat, lng: place.location.lng };

      const img = document.createElement("img");
      img.src = "./mark.jpg";
      img.alt = place.title;
      img.className = "marker-image";

      const marker = new AdvancedMarkerElement({
        map,
        position: loc,
        title: place.title,
      });

      marker.addListener("click", () => {
        infoWindow.setContent(`<div><h5>${place.title}</h5></div>`);
        infoWindow.open({
          anchor: marker,
        });
      });

      marker.append(img);

      bounds.extend(loc);

      const placeLi = document.createElement("li");
      placeLi.innerHTML = `
        <div>
          <div class="info">
            <span>${place.title}</span>
            <img src="./mark.jpg" alt="${place.title}" />
          </div>
        </div>`;

      placesList.append(placeLi);

      placeLi.addEventListener("click", async () => {
        map.setZoom(6);
      });
    });

    map.fitBounds(bounds);
  } catch (e) {
    console.error(e);
  }
};
////////////
document.querySelector("#searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      `http://api.geonames.org/wikipediaSearch?q=${searchInput.value}&maxRows=10&username=${key}&type=json`,
    );

    if (!response.ok) {
      throw new Error(`${response.status}  ${response.statusText}`);
    }

    const { geonames } = await response.json();
    console.log(geonames);

    const bounds = new google.maps.LatLngBounds();

    geonames.forEach((place) => {
      const loc = { lat: place.lat, lng: place.lng };

      const img = document.createElement("img");
      img.src = "./mark.jpg";
      img.alt = place.title;
      img.className = "marker-image";

      const marker = new AdvancedMarkerElement({
        map,
        position: loc,
        title: place.title,
      });

      marker.addListener("click", () => {
        infoWindow.setContent(
          `<div><h5>${place.title}</h5>${place.summary}<a target="_blank" href="https://${place.wikipediaUrl}">more info</a></div>`,
        );
        infoWindow.open({
          anchor: marker,
        });
      });

      marker.append(img);

      bounds.extend(loc);

      const placeLi = document.createElement("li");
      placeLi.innerHTML = `
        <div>
          <div class="info">
            <span>${place.title}</span>
            <img src=${"./mark.jpg" /*place.thumbnailImg*/} alt=${place.title} />
          </div>
          <div class="summary">${place.summary}</div>
        </div>`;
      placesList.append(placeLi);

      const summary = placeLi.querySelector(".summary");

      placeLi.addEventListener("click", async () => {
        map.setZoom(6);

        const clickedPlace = {
          title: place.title,
          location: { lat: place.lat, lng: place.lng },
        };
        storageArr.push(clickedPlace);
        localStorage.setItem("places", JSON.stringify(storageArr));

        console.log(storageArr);

        if (currentlySelectedSummary) {
          //currentlySelectedSummary.style.display = 'none';
          currentlySelectedSummary.classList.remove("active");
        }
        currentlySelectedSummary = summary;
        //summary.style.display = 'block';
        currentlySelectedSummary.classList.add("active");
        await doAfter(() => map.panTo(loc), 1500);
        await doAfter(() => map.setZoom(18), 1500);
      });
    });
  } catch (e) {
    console.error(e);
  }
});
function doAfter(action, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      action();
      resolve();
    }, delay);
  });
}
