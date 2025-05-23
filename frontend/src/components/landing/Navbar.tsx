"use client";

import React, { useState } from "react";

import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <a href="#" className="navbar__logo">
          App Name
        </a>

        <ul className="navbar__links">
          <li>
            <a href="#features" className="navbar__link">
              Features
            </a>
          </li>
          <li>
            <a href="#solutions" className="navbar__link">
              Solutions
            </a>
          </li>
          <li>
            <a href="#pricing" className="navbar__link">
              Pricing
            </a>
          </li>
        </ul>

        <div className="navbar__actions">
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button
                className="btn btn--outline"
                style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}
              >
                Login
              </button>
            </SignInButton>
          ) : (
            <SignOutButton>
              <button className="btn btn--outline">Logout</button>
            </SignOutButton>
          )}
        </div>

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`container navbar__mobile-menu${menuOpen ? " is-open" : ""}`}
      >
        <a
          href="#features"
          className="navbar__link"
          onClick={() => setMenuOpen(false)}
        >
          Features
        </a>
        <a
          href="#solutions"
          className="navbar__link"
          onClick={() => setMenuOpen(false)}
        >
          Solutions
        </a>
        <a
          href="#pricing"
          className="navbar__link"
          onClick={() => setMenuOpen(false)}
        >
          Pricing
        </a>
        {!isSignedIn ? (
          <SignInButton mode="modal">
            <button
              className="btn btn--outline"
              style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}
            >
              Login
            </button>
          </SignInButton>
        ) : (
          <SignOutButton>
            <button className="btn btn--outline">Logout</button>
          </SignOutButton>
        )}
      </div>
    </nav>
  );
}
