import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

function MapSetViewComponent({ activeLoc }: { activeLoc: number[] }) {
  const map = useMap();

  useEffect(() => {
    map.setView([activeLoc[0], activeLoc[1]], undefined, {
      animate: true,
      duration: 1,
    });
  }, [activeLoc, map]);

  return null;
}

export default MapSetViewComponent;
