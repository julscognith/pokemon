import {
 Button,
 Card,
 CardContent,
 Chip,
 Container,
 Grid,
 Typography,
} from "@material-ui/core";
import React from "react";
import DetailsController from "./DetailsController";
import { Link } from "react-router-dom";
import PokemonImg from "../../components/PokemonImg";
import PokemonTypes from "../../components/PokemonTypes";
import { Loader } from "../../components";

class DetailsView extends DetailsController {
 render() {
  return (
   <Container>
    <Button>
     <Link to="/">Home</Link>
    </Button>
    {!this.state.loading && (
     <Grid
      container
      spacing={10}
      direction="row"
      justifyContent="center"
      alignItems="center"
     >
      <Grid
       item
       md={6}
      >
       <PokemonImg
        maxSize={500}
        id={this.state.details.id}
       />
      </Grid>
      <Grid
       item
       md={6}
      >
       <Typography
        variant="h2"
        component="h2"
        data-test-id="pokemon-name"
        style={{ textTransform: "capitalize" }}
       >
        {this.state.details.name}
       </Typography>

       <Card style={{ margin: "20px 0" }}>
        <CardContent>
         <Typography
          className="ability"
          variant="h5"
         >
          Ability
         </Typography>
         {!this.state.loading &&
          this.state?.details?.abilities?.map((ability: any, index: any) => (
           <Typography
            key={index}
            variant="body1"
            component="h5"
           >
            {ability.ability.name}
           </Typography>
          ))}
        </CardContent>
       </Card>

       <Card>
        <CardContent>
         <Typography
          variant="h5"
          className="types"
         >
          Types
         </Typography>
         <div style={{ display: "flex", gap: "20px" }}>
          {!this.state.loading &&
           this.state?.details?.types?.map((poketype: any, index: any) => (
            <PokemonTypes
             key={index}
             types={poketype.type.name}
            />
           ))}
         </div>
        </CardContent>
       </Card>

       <Card style={{ padding: "10px", marginTop: "20px" }}>
        <CardContent>
         <Typography
          className="stats"
          variant="h5"
         >
          Stats
         </Typography>
         <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {!this.state.loading &&
           this.state?.details?.stats?.map((poketype: any, index: any) => (
            <Chip label={`${poketype.stat.name} - ${poketype.base_stat}`} />
           ))}
         </div>
        </CardContent>
       </Card>
      </Grid>
     </Grid>
    )}
    {this.state.loading && <Loader />}
   </Container>
  );
 }
}

export default DetailsView;
