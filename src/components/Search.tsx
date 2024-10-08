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
  search: string;
}

class Search extends React.Component<any, SearchState> {
  typingTimeout: number | undefined;

  constructor(props: any) {
    super(props);

    this.state = {
      lists: [],
      searchResults: [],
      search: "bulbasaur",
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
          pokemon.name.toLowerCase().includes(value.toLowerCase() || this.state.search)
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

  handleInputValueChange = (e: any) => {
    this.setState({ search: e.target.value });
  };

  render() {
    // const { classes } = this.props;

    return (
      <Container>
        <Autocomplete
          style={{ margin: "20px auto", width: "70%" }}
          id="combo-box-demo"
          options={this.state.searchResults}
          getOptionLabel={(option: Pokemon) => option.name}
          onChange={this.handleRedirect}
          onInputChange={this.handleInputChange}
          filterOptions={(options) => options}
          defaultValue={{ id: "1", name: this.state.search }} // added value prop
          renderOption={(option) => (
            <Link
              style={{
                width: "100%",
                display: "inline-block",
                textDecoration: "none",
                color: "inherit",
              }}
              data-test-id="list-item"
              to={`/pokemon/${option.name}`}
            >
              {option.name}
            </Link>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              id="myinput"
              label="Search Pokémon"
              variant="outlined"
              // className={classes.input}
              value={this.state.search} // added value prop
              onChange={this.handleInputValueChange} // added onChange to sync with state
            />
          )}
        />
      </Container>
    );
  }
}

export default Search;
