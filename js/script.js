let map;
let poly;
let markers = [];

const showingPrevPolynices = async (map) => {
  // this function will get all the polylines from server and draw in the screen.
  const response = await fetch('polylines.php');
  const polyline = await response.json();

  polyline.forEach((item) => {
    const [id, coordinates, name, time] = item;
    const polylinePath = new google.maps.Polyline({
      path: JSON.parse(coordinates),
      strokeColor: '#F05454',
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });

    const infoWindow = new google.maps.InfoWindow();
    polylinePath.addListener('mouseover', (event) => {
      infoWindow.setPosition(event.latLng);
      infoWindow.setContent(name);
      infoWindow.open(map);
    });

    polylinePath.addListener('mouseout', () => {
      infoWindow.close();
    });

    polylinePath.setMap(map);
  });
};

function initMap() {
  // initializing map
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 23.924972, lng: 90.263242 },
    zoom: 15,
  });

  // this will show all the added polyline
  showingPrevPolynices(map);

  // initializing polyline
  poly = new google.maps.Polyline({
    strokeColor: '#F05454',
    strokeOpacity: 1.0,
    strokeWeight: 3,
  });
  poly.setMap(map);

  poly.addListener('click', (event) => {
    console.log(event);
  });

  // this will return coordinate whare we clicked.
  map.addListener('click', mapClickHandler);
}

const mapClickHandler = (event) => {
  const { latLng: coordinate } = event;
  // getting existing polyline
  const path = poly.getPath();
  // adding new coordinate with the polyline
  path.push(coordinate);

  // this will add marker to the last clicked coordinate
  createMarker(path, coordinate);
};

const createMarker = (path, coordinate) => {
  // creating new marker and adding to marker array.
  const marker = new google.maps.Marker({
    position: coordinate,
    title: 'delete!',
    map: map,
  });
  markers.push(marker);

  // this will remove prev pointer(marker)
  if (markers.length > 1) {
    markers[markers.length - 2].setMap(null);
  }

  marker.addListener('click', removeLastAddedMarkerPolyline);
};

const removeLastAddedMarkerPolyline = () => {
  // showing prev marker and deleting last marker and polyline
  const path = poly.getPath();

  if (markers.length == 1 && path.xd.length == 1) {
    markers[0].setMap(null);
    markers.pop();
    path.pop();
    return;
  }

  markers[markers.length - 2].setMap(map);

  markers[markers.length - 1].setMap(null);
  markers.pop();
  path.pop();
};

function redirectPost(url, data) {
  var form = document.createElement('form');
  document.body.appendChild(form);
  form.method = 'post';
  form.action = url;
  for (var name in data) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = data[name];
    form.appendChild(input);
  }
  form.submit();
}

document.getElementById('submit-btn').addEventListener('click', async () => {
  // getting all all the coordinate for new polyline
  const paths = poly.getPath().xd;
  const polylineCoordinates = paths.map(({ lat, lng }) => ({
    lat: lat(),
    lng: lng(),
  }));

  redirectPost('index.php', {
    data: JSON.stringify(polylineCoordinates),
    name: document.getElementById('name').value,
  });

  console.log(data);
});
