"use client"; // i use it to convert server side to client side to use react hooks and js events
import Link from "next/link";
import styles from "./header.module.css";
import { GrTechnology } from "react-icons/gr";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
interface NavbarProps {
  isAdmin: boolean;
}
const Navbar = ({ isAdmin }: NavbarProps) => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className={styles.navbar}>
      <div>
        <Link className={styles.logo} href="/">
          Cloud
          <GrTechnology />
          Hosting
        </Link>
        <div className={styles.menue}>
          {toggle ? (
            <IoMdClose onClick={() => setToggle((prev) => !prev)} />
          ) : (
            <CiMenuBurger onClick={() => setToggle((prev) => !prev)} />
          )}
        </div>
      </div>
      <div
        className={styles.navLinksWrapper}
        style={{
          clipPath: (toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)") || "",
        }}
      >
        <ul className={styles.navLinks}>
          <Link
            onClick={() => setToggle(false)}
            className={styles.navLink}
            href="/"
          >
            Home
          </Link>
          <Link
            onClick={() => setToggle(false)}
            className={styles.navLink}
            href="/articles?pageNumber=1"
          >
            Articles
          </Link>
          <Link
            onClick={() => setToggle(false)}
            className={styles.navLink}
            href="/about"
          >
            About
          </Link>
          {isAdmin && (
            <Link
              onClick={() => setToggle(false)}
              className={styles.navLink}
              href="/admin"
            >
              Admin Dashboard
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
