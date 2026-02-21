import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BannerSlider from "../banner/BannerSlider";

export default function AppLayout() {
  const [open, setOpen] = useState(false);

  // ✅ Tu remplaceras ces liens par les tiens
  const banners = [
    {
      id: "1",
      imageUrl: "https://i.postimg.cc/j2b1R1vT/IMG_1680.jpg",
      href: "https://TON-LIEN-EXTERNE-1.com",
      alt: "Bannière 1",
    },
    {
      id: "2",
      imageUrl: "https://i.postimg.cc/j2b1R1vT/IMG_1680.jpg",
      href: "https://TON-LIEN-EXTERNE-2.com",
      alt: "Bannière 2",
    },


    {
      id: "3",
      imageUrl: "https://i.postimg.cc/j2b1R1vT/IMG_1680.jpg",
      href: "https://TON-LIEN-EXTERNE-2.com",
      alt: "Bannière 2",
    },

    
  ];

  return (
    <div style={{ minHeight: "100vh", color: "white" }}>
      <Header setOpen={setOpen} />

      {/* ✅ BANNERS juste sous le header */}
      <BannerSlider items={banners} height={150} />

      <Sidebar open={open} setOpen={setOpen} />

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
