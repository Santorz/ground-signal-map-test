import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FC, useEffect } from 'react';
import { useAppSelector } from '@/redux/store';

// Random range coordinates
export function getRandomInRange(from: number, to: number, fixed: number) {
  return Math.random() * (to - from) + Number(from.toFixed(fixed)) * 1;
}

let DefaultIcon = L.icon({
  iconUrl: '/icon-pin.svg',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 62.5],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Function Comp 1 for accessing UseMap hook
function MyComponent({ activeLoc }: { activeLoc: number[] }) {
  const map = useMap();

  useEffect(() => {
    map.setView([activeLoc[0], activeLoc[1]], undefined, {
      animate: true,
      duration: 1,
    });
  }, [activeLoc, map]);

  return null;
}

// Main Component
const Map: FC = () => {
  // Hooks
  const activeLoc = useAppSelector(
    (state) => state.locationDataStateReducer.value.activeLocation
  );
  const RandomCoord = [
    getRandomInRange(-18, 18, 3),
    getRandomInRange(-36, 36, 3),
  ];

  return (
    <MapContainer
      center={
        activeLoc
          ? [activeLoc[0], activeLoc[1]]
          : [RandomCoord[0], RandomCoord[1]]
      }
      zoom={13}
      scrollWheelZoom={true}
    >
      <MyComponent
        activeLoc={
          activeLoc
            ? [activeLoc[0], activeLoc[1]]
            : [RandomCoord[0], RandomCoord[1]]
        }
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker
        position={
          activeLoc
            ? [activeLoc[0], activeLoc[1]]
            : [RandomCoord[0], RandomCoord[1]]
        }
      >
        {/* <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup> */}
      </Marker>
    </MapContainer>
  );
};

export default Map;
