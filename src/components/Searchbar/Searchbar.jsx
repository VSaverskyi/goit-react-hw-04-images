import React, { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as yup from 'yup';
import PropTypes from "prop-types";
import { SearchBarHeader, SearchForm, SearchFormBtn, SearchFormBtnLabel, SearchFormInput } from "./Searchbar.styled";

const schema = yup.string().required();

const SearchBar = ({onSubmit}) => {
    const [searchingImage, setSearchingImage] = useState('');

    const handleSearchChange = event => {
        setSearchingImage(event.target.value.toLowerCase());
    };

    const handleSubmit = (values, {resetForm}) => {

        if (searchingImage.trim() === '') {
            alert('Please, enter image name!');
            return;
        }

        onSubmit(searchingImage);
        resetForm();
    };

        return (
        <SearchBarHeader>
            <Formik
                initialValues={{ searchingImage: ''}}
                onSubmit={handleSubmit}
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
                        value={searchingImage}
                        onChange={handleSearchChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                    <ErrorMessage
                        name="searchingImage"
                        component="div"
                    />
                </SearchForm>
            </Formik>
        </SearchBarHeader>
    )
}

export default SearchBar;

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}