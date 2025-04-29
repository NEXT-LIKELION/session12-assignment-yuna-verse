import React from "react";
import "./ResultPage.css";
import PokemonCard from "./PokemonCard";
import { mbtiDescriptions } from "../data/mbtiDescriptions";
import { typeNameKR } from "../data/typeNameKR";

function ResultPage({ mbti, pokemon }) {
    const result = mbtiDescriptions[mbti] || {
        type: "unknown",
        description: "아직 이 유형의 포켓몬은 연구 중입니다...",
    };

    return (
        <div className="result-container">
            <h2>
                당신의 MBTI는 <strong>{mbti}</strong>입니다!
            </h2>

            <PokemonCard
                name={pokemon.name}
                image={pokemon.image}
                type={pokemon.type}
            />

            <p style={{ marginTop: "1rem" }}>{result.description}</p>

            <button
                onClick={() => window.location.reload()}
                className="retry-button"
            >
                다시 해보기
            </button>
        </div>
    );
}

export default ResultPage;
