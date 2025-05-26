import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";

const GoogleMap = ({ selectedPlace, places = [], mode }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markerRef = useRef(null);
    const multipleMarkers = useRef([]);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        const scriptId = 'google-maps-script';

        if (window.google && mapRef.current) {
            if (!mapInstance.current) {
                mapInstance.current = new window.google.maps.Map(mapRef.current, {
                    center: { lat: 37.5665, lng: 126.9780 },
                    zoom: 14,
                });
                setMapLoaded(true);
            }
            return;
        }

        window.initMap = () => {
            if (mapRef.current && !mapInstance.current) {
                mapInstance.current = new window.google.maps.Map(mapRef.current, {
                    center: { lat: 37.5665, lng: 126.9780 },
                    zoom: 14,
                });
                setMapLoaded(true);
            }
        };

        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        }
    }, []);

    useEffect(() => {
        if (!mapLoaded || !mapInstance.current) return;
        const map = mapInstance.current;

        // 마커 초기화
        if (markerRef.current) {
            markerRef.current.setMap(null);
            markerRef.current = null;
        }
        multipleMarkers.current.forEach(marker => marker.setMap(null));
        multipleMarkers.current = [];

        // 장소 1개 표시
        if (selectedPlace?.lat && selectedPlace?.lng) {
            const { lat, lng, name } = selectedPlace;
            const position = new window.google.maps.LatLng(lat, lng);

            markerRef.current = new window.google.maps.Marker({
                position,
                map,
                title: name,
            });

            
            map.setCenter(position);
            map.setZoom(14);
            map.panBy(250, 0);
        } else if (places.length > 0) { //장소 리스트 표시
            const bounds = new window.google.maps.LatLngBounds();

            places.forEach((item, i) => {
                const { lat, lng, name } = item;
                if (lat && lng) {
                    const position = new window.google.maps.LatLng(lat, lng);

                    const markerOptions = {
                        position,
                        map,
                        title: name,
                    };

                    if (mode === 'order') {
                        markerOptions.label = {
                            text: `${i + 1}`,
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: "bold"
                        };
                    } else if (mode === 'select') {
                        markerOptions.label = {
                            text: "✓",
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: "bold"
                        };
                    }

                    const marker = new window.google.maps.Marker(markerOptions);
                    multipleMarkers.current.push(marker);
                    bounds.extend(position);
                }
            });

            if (!bounds.isEmpty()) {
                map.fitBounds(bounds);
            }
        }
    }, [mapLoaded, selectedPlace, places]);

    return <MapContainer ref={mapRef} />;
};

export default GoogleMap;

const MapContainer = styled.div`
  width: 100%;
  height: 885px;
`;
