import { Chip } from "@material-ui/core";
import React, { Component } from "react";
import { colorPicker } from "../helpers/ColorProvider";

interface IPokemon {
 types: string;
}

export default class PokemonTypes extends Component<IPokemon> {
 render() {
  const { types } = this.props;

  return (
   <Chip
    label={types}
    style={{ background: colorPicker(types), color: "white" }}
   />
  );
 }
}
