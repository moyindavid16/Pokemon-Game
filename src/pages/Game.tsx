import {useQuery} from "@tanstack/react-query";
import {Key, useMemo, useRef, useState} from "react";
import Background from "../Background";
import {client} from "../main";
import altImg from "../pokeball.webp";
import {LazyLoadImage} from "react-lazy-load-image-component";

export default function Game() {
  //STATES AND VARIABLES
  const [answerStatus, setAnswerStatus] = useState<undefined | Result>(undefined);
  const [score, setScore] = useState(0);
  const pokeArray = useRef<Key[]>([]);

  //QUERY HANDLER FUNCTION
  const randomPokeFetcher = () => {
    let id = Math.floor(Math.random() * 905) + 1;
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data.name);
        pokeArray.current = [];
        return data;
      });
  };

  //QUERIES
  const {isLoading: poke1IsLoading, data: poke1, refetch: refetch1} = useQuery(["randomPokemon1"], randomPokeFetcher);
  const {isLoading: poke2IsLoading, data: poke2, refetch: refetch2} = useQuery(["randomPokemon2"], randomPokeFetcher);
  const {isLoading: poke3IsLoading, data: poke3, refetch: refetch3} = useQuery(["randomPokemon3"], randomPokeFetcher);

  //FUNCTIONS
  //FUNCTION FOR PLAY AGAIN ACTION
  const playAgain = () => {
    setAnswerStatus(undefined);
    refetch1();
    refetch2();
    refetch3();
  };
  // FUNCTION TO HANDLE RESPONSE FROM USER
  const handleAnswerClick = (userResponse: Key) => {
    if (userResponse == poke1.name) {
      if (answerStatus == undefined) setScore(score => score + 1);
      setAnswerStatus(Result.Correct);
    } else setAnswerStatus(Result.Wrong);
  };

  //ENUM FOR USERCLICK ANSWER CHECKING
  enum Result {
    Correct,
    Wrong,
  }

  //Loading state
  if (poke1IsLoading || poke2IsLoading || poke3IsLoading) return <div>Loading...</div>;

  if (pokeArray.current.length == 0)
    pokeArray.current = [poke1.name, poke2.name, poke3.name].sort(() => 0.5 - Math.random());

  return (
    <div className="wrapper">
      Game page
      <div>{score}</div>
      <LazyLoadImage
        src={poke1.sprites.front_default}
        placeholderSrc={altImg}
        width="120px"
        height="120px"
        delayTime={0}
      />
      <div className="answerChoices">
        {pokeArray.current.map(pokeName => (
          <button key={pokeName} onClick={() => handleAnswerClick(pokeName)}>
            {pokeName}
          </button>
        ))}
      </div>
      {answerStatus == undefined && <div>Make a Choice!</div>}
      {answerStatus == Result.Correct && <div>Correct</div>}
      {answerStatus == Result.Wrong && <div>Wrong</div>}
      <button onClick={() => playAgain()}>Play again</button>
    </div>
  );
}
