import React from "react";

class HomeController extends React.Component {
 state = {
  lists: [],
  offset: 0,
  loading: true,
 };

 async fetchPokemonData() {
  this.setState((prevState: any) => ({
   loading: (prevState.loading = true),
  }));

  try {
   const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${this.state.offset}`
   );
   const data = await response.json();

   const tempData = await Promise.all(
    data.results.map(async (pokemon: any) => {
     const res = await fetch(pokemon.url);
     if (res.ok) {
      return res.json();
     }
    })
   );

   this.setState((prevState: any) => ({
    lists: [...prevState.lists, ...tempData],
    offset: prevState.offset + 20,
    loading: (prevState.loading = false),
   }));
  } catch (error) {
   console.log(error);
  }
 }

 seeMoreHandler = () => {
  this.fetchPokemonData();
 };

 componentDidMount(): void {
  this.fetchPokemonData();
 }
}

export default HomeController;
