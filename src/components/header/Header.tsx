import Link from "next/link";
// import "./header.css" this normal importing css but i made file name header.module.css so i made it module in next
import styles from "./header.module.css"; // "styles" u can name it as u want
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { verifyTokenforpage } from "@/utils/verifyToken";
import LogoutButton from "./LogoutButton";
const Header = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenforpage(token);
  return (
    <header className={styles.header}>
      <Navbar isAdmin={payload?.isAdmin || false} />
      <div className={styles.right}>
        {payload ? (
          <>
            <strong className="text-blue-800 md:text-xl capitalize">
              {payload?.username}
            </strong>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link className={styles.btn} href="/login">
              Login
            </Link>
            <Link className={styles.btn} href="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
