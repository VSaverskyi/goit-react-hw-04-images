import { Component } from "react";
import SearchBar from "../Searchbar";
import { Container } from "./App.styled";
import ImageGallery from "components/ImageGallery";

class App extends Component {
  state = {
    searchingImage: '',
  }

  handleFormSubmit = searchingImage => {
    this.setState({ searchingImage });
  }

  render() {
    const {searchingImage} = this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchingImage={searchingImage}
        />
      </Container>
    );
  }
};

export default App;
