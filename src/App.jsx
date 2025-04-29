import { useState, useEffect } from "react"; // useState, useEffect 모두 필요
import QuestionCard from "./components/QuestionCard"; // 질문을 보여주는 컴포넌트
import ResultPage from "./components/ResultPage"; // 결과를 포여주는 컴포넌트
import { mbtiQuestions } from "./data/questions"; // data 폴더에서 정해진 질문을 가져옴
import { mbtiToType } from "./data/mbtiToType"; // data 폴더에서 MBTI - 타입 매칭을 가져옴
import "./App.css";

// 포켓몬 API에서 타입에 해당하는 포켓몬 중 하나 랜덤으로 가져옴
const fetchPokemonByType = async (type) => {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await res.json();

    const pokemonList = data.pokemon.map((p) => p.pokemon);
    const random = pokemonList[Math.floor(Math.random() * pokemonList.length)];

    const detailRes = await fetch(random.url);
    const detail = await detailRes.json();

    return {
        name: detail.name,
        image: detail.sprites.front_default,
        type: type,
    };
};

function App() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [mbti, setMbti] = useState(null);
    const [pokemon, setPokemon] = useState(null);

    // 사용자가 질문에 대한 답을 선택할 때 실행되는 함수
    const handleAnswer = (id, value) => {
        const newAnswers = { ...userAnswers, [id]: value };
        setUserAnswers(newAnswers);

        if (currentIndex < mbtiQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // 마지막 선택이면 경우 MBTI 문자열 완성
            const mbtiString =
                newAnswers.EorI +
                newAnswers.SorN +
                newAnswers.TorF +
                newAnswers.JorP;
            setMbti(mbtiString);
        }
    };

    // MBTI가 결정되면 포켓몬 추천 fetch
    useEffect(() => {
        if (mbti) {
            const type = mbtiToType[mbti];
            fetchPokemonByType(type).then((poke) => setPokemon(poke));
        }
    }, [mbti]);

    if (pokemon) {
        return <ResultPage mbti={mbti} pokemon={pokemon} />;
    }

    return (
        <div className="app-container">
            <div className="content-box">
                {pokemon ? (
                    <ResultPage mbti={mbti} pokemon={pokemon} />
                ) : (
                    <>
                        <h1>트레이너님과 어울리는 포켓몬은?</h1>
                        <QuestionCard
                            question={mbtiQuestions[currentIndex]}
                            onAnswer={handleAnswer}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
