/**
 * Created by annity on 5.12.2016 г..
 */
import React, { Component } from 'react';
import './DetailsMovieView.css';
export default class DetailsMovieView extends Component {
    render() {
        return (
            <form className="details-movie-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Details Movie</h1>
                <label>
                    <div>Title:</div>
                    <input type="text" name="title" required readOnly="readOnly"
                           defaultValue={this.props.title}
                           ref={e => this.titleField = e} />
                </label>
                <br/>
                <label>
                    <div>Actors:</div>
                    <input type="text" name="actors" required readOnly="readOnly"
                           defaultValue={this.props.actors}
                           ref={e => this.actorsField = e} />
                </label>
                <br/>
                <label>
                    <div>Description:</div>
                    <textarea name="description" rows="10" readOnly="readOnly"
                              defaultValue={this.props.description}
                              ref={e => this.descriptionField = e} />
                </label>
                <br/>
                <label>
                    <div>Genre:</div>
                    <input type="text" name="genre" required readOnly="readOnly"
                           defaultValue={this.props.genre}
                           ref={e => this.genreField = e} />
                </label>
                <br/>
                <label>
                    <div>Year:</div>
                    <input type="number" name="year" min="1970" max="2016" required readOnly="readOnly"
                           defaultValue={this.props.year}
                           ref={e => this.yearField = e} />
                </label>
                <br/>
                <div>
                    <input type="file" id="upload-file" />
                    <button id="btn-upload-file">Upload</button>
                    <ul id="elements">
                    </ul>
                </div>
            </form>

        );
    }
    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.props.movieId,
            this.titleField.value,
            this.actorsField.value,
            this.descriptionField.value,
            this.genreField.value,
            this.yearField.value
        );
    }
}
