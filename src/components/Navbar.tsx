import { Link } from "react-router-dom";
import { auth } from "../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const Logout = async () => {
    await signOut(auth);
  }
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Home </Link>
        {!user ?
          (<Link to="/login"> Login </Link>) :
          (<Link to="/createpost"> Create Post </Link>)
        }
      </div>
      <div className="user">
        {user && (
          <>
            <p> {user?.displayName} </p>
            <img alt="profile picture" src={user?.photoURL || ""} width="20" height="20" />
            <button onClick={Logout}> Log Out</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar