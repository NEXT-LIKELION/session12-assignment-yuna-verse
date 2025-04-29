import React from "react";
import "./PokemonCard.css";
import { pokemonNameKR } from "../data/pokemonNameKR";
import { typeNameKR } from "../data/typeNameKR";
import { typeColors } from "../data/typeColors";

function PokemonCard({ name, image, type }) {
    const lowerName = name.toLowerCase();
    // 포켓몬 API에서 불러오는 영문 이름은 띄어쓰기가 있는 경우 '-'를 삽입하여 불러와진다.
    // '-' 앞쪽만 기준으로 하더라도, pokemonNameKR.js에서는 '-' 뒤에 따라 한국 이름이 달라지는 경우가 있다.
    // 1. 먼저 전체 이름으로 찾는다 (예: jangmo-o)
    let displayName = pokemonNameKR[lowerName];
    if (!displayName) {
        // 2. 못 찾으면, '-' 앞부분만 기준으로 찾는다
        const baseName = lowerName.split("-")[0];
        displayName = pokemonNameKR[baseName];
    }
    // 3. 그래도 없으면, 영어 이름을 대문자로 표시한다.
    displayName = displayName || name.toUpperCase();

    // 포켓몬 API에서 불러오는 타입의 영문 이름을 한국 이름으로 바꾸는 코드이다.
    const displayType = typeNameKR[type.toLowerCase()] || type.toUpperCase();
    const boxColor = typeColors[type.toLowerCase()] || "#ccc";
    return (
        <div className="pokemon-card">
            <h2 className="pokemon-name">{displayName}</h2>
            <img src={image} alt={name} className="pokemon-image" />
            <div className="type-container">
                <div
                    className="pokemon-type-box"
                    style={{ backgroundColor: boxColor }}
                >
                    {displayType}
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;
