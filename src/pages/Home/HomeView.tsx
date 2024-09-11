import React from "react";
import HomeController from "./HomeController";
import { Container, Grid } from "@material-ui/core";
import PokemonCard from "../../components/PokemonCard";
import { Loader, LoadMoreButton, OnView } from "../../components";

export default class HomeView extends HomeController {
 render() {
  return (
   <Container maxWidth="xl">
    <Grid
     container
     spacing={2}
     justifyContent="center"
     alignItems="center"
    >
     {this.state.lists.length > 0 &&
      this.state.lists.map(
       (pokemon: { name: string; id: string; types: any[] }) => (
        <Grid
         item
         key={pokemon.name}
         lg={2}
         md={3}
         sm={4}
         xs={12}
        >
         <PokemonCard
          name={pokemon.name}
          id={pokemon.id}
          pokeTypes={pokemon.types}
         />
        </Grid>
       )
      )}
    </Grid>
    {!this.state.loading && <OnView onClick={this.seeMoreHandler}></OnView>}
    {this.state.loading && <Loader />}
    <div style={{ textAlign: "center" }}>
     <LoadMoreButton onClick={this.seeMoreHandler}>Load More</LoadMoreButton>
    </div>
   </Container>
  );
 }
}
