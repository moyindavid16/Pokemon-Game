import {Link} from "react-router-dom";

export default function MainMenu() {
  return (
    <>
      <div>Welcome to My Pokemon Guessing Game</div>
      <div>
        <Link to="/play" className="mainMenuItem">
          Play!
        </Link>
        <Link to="/how-to-play" className="mainMenuItem">
          How to Play
        </Link>
      </div>
    </>
  );
}
