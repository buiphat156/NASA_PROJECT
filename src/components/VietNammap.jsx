import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Bạn cần đảm bảo đã thêm đoạn CSS tùy chỉnh để ẩn khung của tooltip 
// (như đã hướng dẫn ở các câu trả lời trước)

function VietnamMap() {
  useEffect(() => {
    // Tọa độ và mức zoom
    const HANOI_COORDS = [21.0285, 105.8542]; // Tọa độ Hà Nội
    const HANOI_ZOOM_LEVEL = 12; // Mức zoom khi click
    const MIN_ZOOM_LEVEL = 7;
    
    const map = L.map("map").setView([16, 110], 5);

    // Tile server ArcGIS
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles © Esri",
        maxZoom: 19,
      }
    ).addTo(map);

    // Tạo icon marker
    const redIcon = L.icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      iconSize: [20, 30],
      iconAnchor: [10, 30],
      popupAnchor: [0, -30],
    });

    // --- MARKER HOÀNG SA & TRƯỜNG SA (Logic ẩn/hiện theo zoom) ---
    const hoangSaMarker = L.marker([16.5, 112], { icon: redIcon })
      .bindTooltip("Đặc khu Hoàng Sa", {
        permanent: true,
        direction: "right",
        className: "custom-label",
      })
      .addTo(map);

    const truongSaMarker = L.marker([10.5, 114], { icon: redIcon })
      .bindTooltip("Đặc khu Trường Sa", {
        permanent: true,
        direction: "right",
        className: "custom-label",
      })
      .addTo(map);

    // --- MARKER HÀ NỘI VÀ CHỨC NĂNG CLICK ---
    const hanoiMarker = L.marker(HANOI_COORDS, { 
        icon: redIcon 
    })
      
      .addTo(map);
      
    // Thêm sự kiện click cho marker Hà Nội
    hanoiMarker.on('click', function (e) {
        // map.flyTo di chuyển mượt mà hơn map.setView
        map.flyTo(HANOI_COORDS, HANOI_ZOOM_LEVEL, {
            duration: 1.5 // Thời gian di chuyển (1.5 giây)
        });
    });

    // --- LOGIC HIỂN THỊ DỰA TRÊN ZOOM (Duy trì) ---
    const updateMarkerVisibility = () => {
      const currentZoom = map.getZoom();
      // Chỉ áp dụng ẩn/hiện cho các marker cần giới hạn (Hoàng Sa & Trường Sa)
      const zoomControlledMarkers = [hoangSaMarker, truongSaMarker]; 

      zoomControlledMarkers.forEach((marker) => {
        if (currentZoom >= MIN_ZOOM_LEVEL) {
          if (!map.hasLayer(marker)) {
            marker.addTo(map);
          }
        } else {
          if (map.hasLayer(marker)) {
            map.removeLayer(marker);
          }
        }
      });
    };

    updateMarkerVisibility();
    map.on("zoomend", updateMarkerVisibility);

    // Dọn dẹp
    return () => {
      map.off("zoomend", updateMarkerVisibility);
      map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      
    ></div>
  );
}

export default VietnamMap;