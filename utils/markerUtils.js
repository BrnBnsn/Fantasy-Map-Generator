"use strict";

function updateNearbyMarkers(marker) {
    const markers = pack.markers.filter(m => getUnitsFromPixels(distance(marker.x, marker.y, m.x, m.y)) <= marker.radius);
    addMarkersWithinRadiusById(`marker${marker.i}`, markers.filter(n => n.i !== marker.i));
}