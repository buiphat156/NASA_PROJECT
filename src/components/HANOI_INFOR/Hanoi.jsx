import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapComponent() {
  useEffect(() => {
    // Tọa độ Hà Nội
    
    const hanoi = [21.0285, 105.8542];

    // Khởi tạo map (zoom xa ban đầu để thấy nhiều vùng)
    const map = L.map("map").setView(hanoi, 7);

    // Thêm tile layer
     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    

    // Thêm marker ở Hà Nội
    const marker = L.marker(hanoi).addTo(map);

    // Gắn popup + sự kiện click
   

    marker.on("click", () => {
      map.setView(hanoi, 13, { animate: true }); // zoom vào Hà Nội
    });
    const labelsUrl = "https://tiles.arcgis.com/tiles/EaQ3hSM51DBnlwMq/arcgis/rest/services/VietnamLabels/MapServer/tile/{z}/{y}/{x}";
    L.tileLayer(labelsUrl, {
      attribution: "",    // bạn có thể thêm attribution nếu muốn
      pane: "overlayPane",
    }).addTo(map);

    return () => {
      map.remove(); // cleanup khi component bị hủy
    };
  }, []);
  

  return <div id="map" style={{ height: "300px", width: "60%" }}></div>;
}

export default MapComponent;
