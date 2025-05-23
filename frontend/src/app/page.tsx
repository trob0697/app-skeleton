import React from "react";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div
          style={{
            width: "80%",
            margin: "0 auto",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Welcome to the Home Page</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
