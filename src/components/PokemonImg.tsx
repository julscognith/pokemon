import React, { Component } from "react";

interface Img {
 maxSize: number;
 id: number;
}

export default class PokemonImg extends Component<Img> {
 render() {
  const { maxSize, id } = this.props;

  return (
   <img
    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
    style={{
     maxWidth: maxSize,
     width: "100%",
    }}
    alt=""
   />
  );
 }
}
