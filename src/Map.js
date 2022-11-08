import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "./leaflet.css";
import * as Leaflet from "leaflet";
import "leaflet-routing-machine";

const imgMarkers = [
  {
    name: "Views",
    icon:
      "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png",
    position: [40.710611, -74.131008],
    img: "https://picsum.photos/500/500?random=1"
  },
  {
    name: "park",
    icon:
      "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png",
    position: [40.746122, -74.203186],
    img: "https://picsum.photos/500/500?random=2"
  },
  {
    name: "River",
    icon:
      "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png",
    position: [40.763679, -74.160845],
    img: "https://picsum.photos/500/500?random=3"
  }
];
const iconMarkers = [
  {
    name: "Restaurant",
    icon:
      "https://cdn.pixabay.com/photo/2021/05/25/02/03/restaurant-6281067_1280.png",
    position: [40.741, -74.15]
  },
  {
    name: "Bar",
    icon:
      "data:image/png;base64,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",
    position: [40.749972, -74.223163]
  },
  {
    name: "Ice cream",
    icon: "https://cdn-icons-png.flaticon.com/512/648/648872.png",
    position: [40.742083, -74.1899]
  }
];

export const Map = (props) => {
  var [myPosition, setMyPosition] = useState([40.662501, -74.252618]);

  const MapBoxTarget = useRef(null);

  useEffect(() => {
    //leaflet map initialized
    var mapViewCoord = [40.74, -74.18];

    var map = Leaflet.map(MapBoxTarget.current).setView(mapViewCoord, 12);
    //leaftlet controls config
    Leaflet.control
      .zoom({
        position: "bottomright"
      })
      .addTo(map);

    //free style providers http://leaflet-extras.github.io/leaflet-providers/preview/index.html
    Leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    //map style 1 => recommend this
    var mapLayer = Leaflet.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 18,
        minZoom: 0,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; USGS'
      }
    );
    //map style 2 => this style susceptible to errors because google restricts the calls, probably because it's free
    // var googleMapsLayer = Leaflet.tileLayer(
    //   "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    //   {
    //     maxZoom: 18,
    //     minZoom: 0,
    //     subdomains: ["mt0", "mt1", "mt2", "mt3"]
    //   }
    // );

    //adding style to map
    mapLayer.addTo(map);

    //Overlaying an Image Map Type
    const ovlcoor = {
      north: 40.773941,
      south: 40.712216,
      east: -74.12544,
      west: -74.22655
    };
    var ovlImg =
      "https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg";
    var bounds = [
      [ovlcoor.north, ovlcoor.west],
      [ovlcoor.south, ovlcoor.east]
    ];

    Leaflet.imageOverlay(ovlImg, bounds, {
      opacity: 1,
      alt: "City of Newark",
      interactive: true,
      zIndex: 0
    }).addTo(map);

    //adding place marker to map
    var markerPlace = Leaflet.icon({
      iconUrl:
        "https://seeklogo.com/images/C/City_of_Newark-logo-ABAF890C1B-seeklogo.com.png",
      iconSize: [50, 50], // size of the icon
      iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -50] // point from which the popup should open relative to the iconAnchor
    });

    Leaflet.marker(mapViewCoord, { icon: markerPlace, zIndexOffset: 1000 })
      .addTo(map)
      .bindPopup(placePopup("City of Newark", "h3"))
      .openPopup();

    // marker type img
    imgMarkers.map((marker, i) => {
      Leaflet.marker(marker.position, {
        icon: Leaflet.icon({
          iconUrl: marker.img,
          iconSize: [40, 40]
          // iconAnchor: [10, 10],
        })
      })
        .addTo(map)
        .bindPopup(markerImgPopup(marker.img, marker.name));
    });
    // markers type icon
    iconMarkers.map((marker, i) => {
      Leaflet.marker(marker.position, {
        icon: Leaflet.icon({
          iconUrl: marker.icon,
          iconSize: [30, 30]
        }),
        zIndexOffset: 1000
      })
        .addTo(map)
        .bindPopup(placePopup(marker.name, "h5"));
    });
    //ruting
    L.Routing.control({
      //line options
      waypoints: [
        //start point
        Leaflet.latLng(myPosition),
        //end point
        Leaflet.latLng(40.704095, -74.236162)
      ],
      routeWhileDragging: true,
      showAlternatives: true,
      routeDragInterval: 100,
      //line style
      lineOptions: {
        styles: [{ color: "#2AB779", opacity: 0.7, weight: 6 }],
        zIndexOffset: 0
      }

      // end Marker
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [MapBoxTarget, myPosition]);

  const handleMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        setMyPosition([position.coords.latitude, position.coords.longitude]);
      }
    });
  };

  return (
    <Container>
      <MapBox ref={MapBoxTarget} id="map">
        <BtnMyLocation onClick={handleMyLocation}>
          <img
            src={
              "https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png"
            }
            alt="myLocation"
          />
        </BtnMyLocation>
      </MapBox>
    </Container>
  );
};

const Container = styled.div``;
const MapBox = styled.div`
  width: 100%;
  height: 500px;
`;

const BtnMyLocation = styled.button`
  position: absolute;
  bottom: 80px;
  right: 10px;
  width: 34px;
  height: 34px;
  background-color: #fff;
  display: block;
  z-index: 999;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  &:hover {
    background-color: #f2f2f2;
  }

  & img {
    height: 100%;
    /* CUT img WItch css */
    object-fit: cover;
    border-radius: 5px !important;
    transform: translateX(-30px) scale(0.8);
    clip-path: circle(7% at 5.5% 50%);
  }
`;
const markerImgPopup = (img, name) => {
  var w = 100;
  return `
      <div class="container">
      <h1>${name}</h1>

      <img src="${img}" alt="img"></div>
      <style>
     .container{
          position: relative;
          width: ${w}px;
          height: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
     }
     .container h1{
      width: ${w + 20}px;
      text-align: left;
      font-size: 16px;
     }
     .container img{
          position: relative;

          width: ${w + 20}px;
          height: 100%;
          object-fit: cover;
          border-radius: 10px!important;
          overflow: hidden;

     }
      </style>

  `;
};

const placePopup = (text, type) => {
  return `
      <${type}>${text}</${type}>
      <style>
      </style>

      `;
};
