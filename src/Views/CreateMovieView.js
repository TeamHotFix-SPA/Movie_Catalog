/**
 * Created by annity on 4.12.2016 г..
 */
import React, { Component } from 'react';
import './CreateMovieView.css';
export default class CreateMovieView extends Component {
    render() {
        return (
            <form className="create-movie-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Create Movie</h1>
                <label>
                    <div>Title:</div>
                    <input type="text" name="title" required
                           ref={e => this.titleField = e} />
                </label>
                <br/>
                <label>
                    <div>Actors:</div>
                    <input type="text" name="actors" required
                           ref={e => this.actorsField = e} />
                </label>
                <br/>
                <label>
                    <div>Description:</div>
                    <textarea name="description" rows="10"
                              ref={e => this.descriptionField = e} />
                </label>
                <br/>
                <label>
                    <div>Genre:</div>
                    <input type="text" name="genre" required
                           ref={e => this.genreField = e} />
                </label>
                <br/>
                <label>
                    <div>Year:</div>
                    <input type="number" name="year" min="1970" max="2016" required="required"
                              ref={e => this.yearField = e} />
                </label>
                <br/>
                <div>
                    <input type="submit" value="Create" />
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.titleField.value,
            this.actorsField.value,
            this.descriptionField.value,
            this.genreField.value,
            this.yearField.value
        );
    }
}
