import React from "react";
import { Container, TextField } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import { Link } from "react-router-dom";

const styles = {
 input: {
  width: "80%",
  margin: "30px 0",
 },
};

interface Pokemon {
 name: string;
 id: string;
}

interface SearchState {
 lists: Pokemon[];
 searchResults: Pokemon[];
}

class Search extends React.Component<WithStyles<typeof styles>, SearchState> {
 typingTimeout: number | undefined;

 constructor(props: WithStyles<typeof styles>) {
  super(props);

  this.state = {
   lists: [],
   searchResults: [],
  };

  this.typingTimeout = undefined;
 }

 async fetchPokemonData() {
  try {
   const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0"
   );
   const data = await response.json();
   this.setState({ lists: data.results, searchResults: data.results });
  } catch (error) {
   console.error("Error fetching Pokémon data:", error);
  }
 }

 componentDidMount(): void {
  this.fetchPokemonData();
 }

 componentWillUnmount() {
  if (this.typingTimeout) {
   clearTimeout(this.typingTimeout);
  }
 }

 handleRedirect = (event: any, value: Pokemon | null) => {
  if (value && value.name) {
   localStorage.setItem("selected", value.name);
  }
 };

 handleInputChange = (
  event: React.ChangeEvent<{}>,
  value: string,
  reason: string
 ) => {
  if (this.typingTimeout) {
   clearTimeout(this.typingTimeout);
  }

  this.typingTimeout = window.setTimeout(() => {
   if (value === "") {
    this.setState({ searchResults: this.state.lists });
   } else {
    const filteredResults = this.state.lists.filter((pokemon: Pokemon) =>
     pokemon.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredResults.length <= 0) {
     this.setState({
      searchResults: [{ name: "Pokemon not found!", id: "" }],
     });
     return;
    }

    this.setState({ searchResults: filteredResults });
   }
  }, 1000);
 };

 render() {
  const { classes } = this.props;

  return (
   <Container>
    {this.state.lists.length > 0 && (
     <Autocomplete
      id="combo-box-demo"
      options={this.state.searchResults}
      getOptionLabel={(option: Pokemon) => option.name}
      onChange={this.handleRedirect}
      onInputChange={this.handleInputChange}
      filterOptions={(options) => options}
      renderOption={(option) => (
       <Link
        style={{
         width: "100%",
         display: "inline-block",
         textDecoration: "none",
         color: "inherit",
        }}
        to={`/pokemon/${option.name}`}
       >
        {option.name}
       </Link>
      )}
      renderInput={(params) => (
       <TextField
        {...params}
        label="Search Pokémon"
        variant="outlined"
        className={classes.input}
       />
      )}
     />
    )}
   </Container>
  );
 }
}

export default withStyles(styles)(Search);
