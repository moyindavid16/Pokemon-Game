import {Link} from "react-router-dom";

export default function MainMenu() {
  return (
    <div className="wrapper">
      <div>Welcome to My Pokemon Guessing Game</div>
      <div className="mainMenu">
        <Link to="/play" className="mainMenuItem">
          Play!
        </Link>
        <Link to="/how-to-play" className="mainMenuItem">
          How to Play
        </Link>
      </div>
    </div>
  );
}
