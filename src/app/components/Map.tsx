'use client';

import 'leaflet/dist/leaflet.css';
import { FC, Suspense, useEffect } from 'react';
import { useAppSelector } from '@/redux/store';
import dynamic from 'next/dynamic';
import { icon, Marker as MainMarker } from 'leaflet';

// Make components dynamic
// Dynamic import of react-leaflet components
const MapContainer = dynamic(
  () => import('react-leaflet').then((module) => module.MapContainer),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((module) => module.TileLayer),
  {
    ssr: false,
  }
);
const Marker = dynamic(
  () => import('react-leaflet').then((module) => module.Marker),
  {
    ssr: false,
  }
);
const Popup = dynamic(
  () => import('react-leaflet').then((module) => module.Popup),
  {
    ssr: false,
  }
);
const MapSetViewComponent = dynamic(
  () => import('./MapSetviewComponent').then((module) => module.default),
  {
    ssr: false,
  }
);

// Random range coordinates
function getRandomInRange(from: number, to: number, fixed: number) {
  return Math.random() * (to - from) + Number(from.toFixed(fixed)) * 1;
}

let DefaultIcon = icon({
  iconUrl: '/icon-pin.svg',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 62.5],
});

MainMarker.prototype.options.icon = DefaultIcon;

// Function Comp 1 for accessing UseMap hook

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
      <Suspense fallback={<div className='h-[200px]' />}>
        <MapSetViewComponent
          activeLoc={
            activeLoc
              ? [activeLoc[0], activeLoc[1]]
              : [RandomCoord[0], RandomCoord[1]]
          }
        />
      </Suspense>
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
