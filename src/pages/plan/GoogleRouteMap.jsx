import React, { useEffect, useState, useRef } from 'react';
import styled from "styled-components";

const getRandomColor = () => {
    const vibrantColors = [
        '#FF5733', // 빨강
        '#FF8F1F', // 주황
        '#FFC300', // 노랑
        '#28B463', // 초록
        '#1F618D', // 파랑
        '#8E44AD', // 보라
        '#C70039', // 진홍
        '#00BCD4', // 시안
        '#FF1493', // 핑크
        '#7D3C98', // 자주
    ];
    const randomIndex = Math.floor(Math.random() * vibrantColors.length);
    return vibrantColors[randomIndex];
};


const GoogleRouteMap = ({ places = [], onRoutesExtracted }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const directionsRenderers = useRef([]);
    const directionsServiceRef = useRef(null);
    const markersRef = useRef([]);

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

        if (!mapLoaded || !mapInstance.current || places.length < 2) return;
        const map = mapInstance.current;

        // 기존 경로 제거
        directionsRenderers.current.forEach(r => r.setMap(null));
        directionsRenderers.current = [];
        // 기존 마커 제거
        markersRef.current.forEach(m => m.setMap(null));
        markersRef.current = [];

        const directionsService = new window.google.maps.DirectionsService();
        directionsServiceRef.current = directionsService;

        const fetchTransitDirections = async () => {
            const routeSummaries = [];

            for (let i = 0; i < places.length - 1; i++) {
                const origin = places[i].place;
                const destination = places[i + 1].place;
                const color = getRandomColor();

                await new Promise((resolve) => {
                    directionsService.route({
                        origin: { lat: origin.lat, lng: origin.lng },
                        destination: { lat: destination.lat, lng: destination.lng },
                        travelMode: window.google.maps.TravelMode.TRANSIT,
                    }, (result, status) => {
                        if (status === "OK") {
                            const route = result.routes[0];     
                            const leg = route.legs[0];
                            const renderer = new window.google.maps.DirectionsRenderer({
                                map,
                                directions: result,
                                suppressMarkers: true, // 마커 수동으로 추가
                                polylineOptions: {
                                    strokeColor: color,
                                    strokeOpacity: 0.8,
                                    strokeWeight: 7,
                                }
                            });
                            directionsRenderers.current.push(renderer);

                            // 시작 마커
                            const startMarker = new window.google.maps.Marker({
                                position: origin,
                                map,
                                label: { text: `${i + 1}`, color: "#fff", fontWeight: "bold" }
                            });

                            // 끝 마커
                            const endMarker = new window.google.maps.Marker({
                                position: destination,
                                map,
                                label: { text: `${i + 2}`, color: "#fff", fontWeight: "bold" }
                            });
                            markersRef.current.push(startMarker, endMarker);

                            resolve();

                            const bounds = new window.google.maps.LatLngBounds();
                            leg.steps.forEach(step => {
                                bounds.extend(step.start_location);
                                bounds.extend(step.end_location);
                            });

                            routeSummaries.push({
                                id: i,
                                origin: origin.name,
                                destination: destination.name,
                                duration: leg.duration,
                                distance: leg.distance,
                                steps: leg.steps,
                                bounds, 
                                color,
                            });
                            console.log(leg)

                        } else {
                            console.error(`경로 실패 ${i}:`, status);
                            resolve(); // 실패해도 다음으로
                        }
                    });
                });
            }
            if (onRoutesExtracted) {
                onRoutesExtracted(routeSummaries);
            }
            //console.log(routeSummaries)
        };
        fetchTransitDirections();
    }, [mapLoaded, places]);
    
    return <MapContainer ref={mapRef} />;
};

export default GoogleRouteMap;

const MapContainer = styled.div`
  width: 100%;
  height: 885px;
`;
