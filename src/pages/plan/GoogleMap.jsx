import React, { useEffect, useRef } from 'react';
import styled from "styled-components";

const GoogleMap = ({ selectedPlace }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        const scriptId = 'google-maps-script';

        if (window.google && mapRef.current) { // 여행지 입력 받으면 구단위로 지도 표시 예정
            if (!mapInstance.current) {
                mapInstance.current = new window.google.maps.Map(mapRef.current, {
                    center: { lat: 37.5665, lng: 126.9780 },
                    zoom: 14,
                });
            }
            return;
        }

        window.initMap = () => { // 여행지 입력 받으면 구단위로 지도 표시 예정
            if (mapRef.current) {
                mapInstance.current = new window.google.maps.Map(mapRef.current, {
                    center: { lat: 37.5665, lng: 126.9780 },
                    zoom: 14,
                });
            }
        };

        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}&callback=initMap&loading=async`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        }
    }, []);

    // 좌표값 받아오면 지도에 마커로 위치 표시, 포커싱 가능할것같음 
    useEffect(() => {
        if (!selectedPlace || !mapInstance.current || !window.google) return;

        const { location, name } = selectedPlace.place;
        if (!location || !location.lat || !location.lng) return;

        const position = new window.google.maps.LatLng(location.lat, location.lng);

        if (markerRef.current) {
            markerRef.current.setMap(null);
        }
        
        const marker = new window.google.maps.Marker({
            position,
            map: mapInstance.current,
            title: name,
        });

        mapInstance.current.panTo(position);
    }, [selectedPlace])

    return <MapContainer ref={mapRef} />;
};

export default GoogleMap;

const MapContainer = styled.div`
  width: 100%;
  height: 885px;
`;