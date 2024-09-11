import React from "react";

export default class DetailsController extends React.Component {
 id = window.location.href.split("/")[4];

 state = {
  details: {} as any[] | any,
  loading: true,
 };

 async fetchPokemonData() {
  this.setState((prevState: any) => ({
   loading: (prevState.loading = true),
  }));

  try {
   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
   const data = await response.json();
   console.log(data);

   this.setState((prevState: any) => {
    return {
     details: (prevState = data),
     loading: (prevState = false),
    };
   });
  } catch (error) {
   console.log(error);
  }
 }

 componentDidMount(): void {
  this.fetchPokemonData();
 }

 componentDidUpdate(prevProps: any): void {
  const selected = localStorage.getItem("selected");
  if (selected && this.id !== selected) {
   window.location.reload();
   localStorage.removeItem("selected");
  }
 }
}
