import React, {useState} from "react";
import SearchBar from "../Searchbar";
import { Container } from "./App.styled";
import ImageGallery from "components/ImageGallery";

const App = () => {

  const [searchingImage, setSearchingImage] = useState('');

  const handleFormSubmit = searchingImage => {
    setSearchingImage(searchingImage);
  };

  return (
    <Container>
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery
        searchingImage={searchingImage}
       />
    </Container>
    );
};

export default App;
