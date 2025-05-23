import React from "react";

import { supportEmail } from "@/helpers/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__simple">
          <div>
            <p className="footer__brand-logo">App Name</p>
            <p className="footer__tagline">The applications description.</p>
          </div>

          <ul className="footer__links footer__links--row">
            <li>
              <a href={`mailto:${supportEmail}`} className="footer__link">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/tos" className="footer__link">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy" className="footer__link">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <p className="footer__bottom">© YYYY Corporation</p>
      </div>
    </footer>
  );
}
