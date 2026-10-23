// AIzaSyAfx7p6SGO09-HiUc_6Ip97L6q_EasmbCY
const form = document.querySelector("#searchForm");
const searchBox = document.querySelector("#searchBox");

const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
  google.maps.importLibrary('maps'),
  google.maps.importLibrary('marker'),
]);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let query = searchBox.value;
  console.log(query);
  searchBox.value = "";
  try {
    const result = await fetch(
    `http://api.geonames.org/wikipediaSearch?q=${query}&maxRows=10&username=iamthezevvwolf&type=json`
    );
    if(!result.ok){
      throw new Error(`${result.status}${result.statusText}`);
    }
    const jsonObj = await result.json()
    const arr = jsonObj.geonames;
    console.log(arr);
    const info = new InfoWindow();
    arr.forEach(element => {
    const marker = new AdvancedMarkerElement({
    map: map,
    position: { lat: element.lat, lng: element.lng },
    title: element.title
  });
  marker.addListener("click", () => {
    info.setContent(`
      <div style="max-width:200px">
        <strong>${element.title}</strong><br>
        ${element.summary}<br><br>
        <a href="https://${element.wikipediaUrl}" target="_blank">
          Read on Wikipedia
        </a>
      </div>
    `);
    info.open(map, marker);
  });
  })} catch (error) {
    console.log(error);
  }
});





const map = new Map(document.querySelector(".map"), {
   center: { lat: 40.09543950426593, lng: -74.2221793333354 },
  zoom: 18,
  renderingType: "VECTOR",
  mapTypeId: "satellite",
  mapId: "DEMO_MAP_ID",
});
