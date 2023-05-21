import { Component } from "react";
import { Formik, ErrorMessage } from "formik";
import * as yup from 'yup';
import PropTypes from "prop-types";
import { SearchBarHeader, SearchForm, SearchFormBtn, SearchFormBtnLabel, SearchFormInput } from "./Searchbar.styled";

const schema = yup.string().required();

class SearchBar extends Component {
    state = {
        searchingImage: '',
    }

    handleSearchChange = event => {
        this.setState({ searchingImage: event.target.value.toLowerCase() });
    };

    handleSubmit = (values, {resetForm}) => {

        if (this.state.searchingImage.trim() === '') {
            alert('Please, enter image name!');
            return;
        }

        this.props.onSubmit(this.state.searchingImage);
        resetForm();
    };

    render() {
        return (
            <SearchBarHeader>
                <Formik
                    initialValues={{ searchingImage: ''}}
                    onSubmit={this.handleSubmit}
                    validationSchema={schema}
                >
                    <SearchForm>
                    <SearchFormBtn
                        type="submit">
                        <SearchFormBtnLabel>
                            Search
                        </SearchFormBtnLabel>
                    </SearchFormBtn>
                    <SearchFormInput
                        type="text"
                        name="searchingImage"
                        value={this.state.searchingImage}
                        onChange={this.handleSearchChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        />
                        <ErrorMessage name="searchingImage" component="div"/>
                </SearchForm>
                </Formik>
            </SearchBarHeader>
        )
    }
}

export default SearchBar;

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}