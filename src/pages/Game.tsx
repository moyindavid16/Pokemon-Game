import {useQuery} from "@tanstack/react-query";
import {Key, useMemo, useRef, useState} from "react";
import Background from "../Background";
import {client} from "../main";
import altImg from "../pokeball.webp";
import {LazyLoadImage} from "react-lazy-load-image-component";

interface GameProps {
  resetKey: Function;
}

export default function Game({resetKey}: GameProps) {
  const [answerStatus, setAnswerStatus] = useState<undefined | Result>(undefined);
  const pokeArray = useRef<Key[]>([]);

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

  const handleAnswerClick = (userResponse: Key) => {
    setAnswerStatus(userResponse == poke1.name ? Result.Correct : Result.Wrong);
  };

  //QUERIES
  const {isLoading: poke1IsLoading, data: poke1} = useQuery(["randomPokemon1"], randomPokeFetcher);
  const {isLoading: poke2IsLoading, data: poke2} = useQuery(["randomPokemon2"], randomPokeFetcher);
  const {isLoading: poke3IsLoading, data: poke3} = useQuery(["randomPokemon3"], randomPokeFetcher);

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
      <LazyLoadImage src={poke1.sprites.front_default} placeholderSrc={altImg} width="120px" height="120px" />
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
      <button onClick={() => resetKey()}>Play again</button>
    </div>
  );
}
