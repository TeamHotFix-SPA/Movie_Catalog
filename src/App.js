import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Footer from './Components/Footer';
import NavigationBar from './Components/NavigationBar'
import $ from 'jquery';
import HomeView from './Views/HomeView';
import LoginView from './Views/LoginView';
import RegisterView from './Views/RegisterView';
import CreateMovieView from './Views/CreateMovieView';
import EditMovieView from './Views/EditMovieView';
import DeleteMovieView from './Views/DeleteMovieView';
import DetailsMovieView from './Views/DetailsMovieView';
import MoviesView from './Views/MoviesView';
import UsersView from './Views/UsersView';
import KinveyRequester from './KinveyRequester';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: sessionStorage.getItem("username"),
            userId: sessionStorage.getItem("userId")
        };
    }
  render() {
        return (
      <div className="App">
            <header>
                <NavigationBar
                    username={this.state.username}
                    homeClicked={this.showHomeView.bind(this)}
                    loginClicked={this.showLoginView.bind(this)}
                    registerClicked={this.showRegisterView.bind(this)}
                    movieClicked={this.showMoviesView.bind(this)}
                    userClicked={this.showUsersView.bind(this)}
                    createMovieClicked={this.showCreateMovieView.bind(this)}
                    logoutClicked={this.logout.bind(this)} />
                <div id="loadingBox">Loading ...</div>
                <div id="infoBox">Info</div>
                <div id="errorBox">Error</div>
            </header>
          <main id="main">
              This is my first React Application!!!
          </main>
          <Footer />
      </div>
    );
  }
  componentDidMount() {
        // Attach global AJAX "loading" event handlers
        $(document).on({
            ajaxStart: function() { $("#loadingBox").show() },
            ajaxStop: function() { $("#loadingBox").hide() }
        });
        // Attach a global AJAX error handler
        $(document).ajaxError(this.handleAjaxError.bind(this));

        // Hide the info / error boxes when clicked
        $("#infoBox, #errorBox").click(function() {
            $(this).fadeOut();
        });

        // Initially load the "Home" view when the app starts
        this.showHomeView();
    }
    handleAjaxError(event, response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON && response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        this.showError(errorMsg);
    }
    showInfo(message) {
        $('#infoBox').text(message).show();
        setTimeout(function() {
            $('#infoBox').fadeOut();
        }, 3000);
    }
    showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg).show();
    }
    showView(reactViewComponent) {
        ReactDOM.render(reactViewComponent,
            document.getElementById('main'));
        $('#errorBox').hide();
    }
    showHomeView() {
        this.showView(<HomeView username={this.state.username} />);
    }
    showLoginView() {
        this.showView(<LoginView onsubmit={this.login.bind(this)} />);
    }
    login(username, password) {
        KinveyRequester.loginUser(username, password)
            .then(loginSuccess.bind(this));

        function loginSuccess(userInfo) {
            this.saveAuthInSession(userInfo);
            this.showMoviesView();
            this.showInfo("Login successful.");
        }
    }
    showRegisterView() {
        this.showView(<RegisterView onsubmit={this.register.bind(this)} />);
    }
    register(username, password) {
        KinveyRequester.registerUser(username, password)
            .then(registerSuccess.bind(this));

        function registerSuccess(userInfo) {
            this.saveAuthInSession(userInfo);
            this.showMoviesView();
            this.showInfo("User registration successful.");
        }
    }
    saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);
        this.setState({
            username: userInfo.username,
            userId: userInfo._id
        });
    }
    logout() {
        KinveyRequester.logoutUser();
        sessionStorage.clear();
        this.setState({username: null, userId: null});
        this.showHomeView();
        this.showInfo('Logout successful.');
    }
    showMoviesView() {
        KinveyRequester.findAllMovies()
            .then(loadMoviesSuccess.bind(this));

        function loadMoviesSuccess(movies) {
            this.showInfo("Movies loaded.");
            this.showView(
                <MoviesView
                    movies={movies}
                    userId={this.state.userId}
                    editMovieClicked={this.prepareMovieForEdit.bind(this)}
                    detailsMovieClicked={this.prepareMovieDetails.bind(this)}
                    deleteMovieClicked={this.confirmMovieDelete.bind(this)}
                />
            );
        }
    }
    prepareMovieForEdit(movieId) {
        KinveyRequester.findMovieById(movieId)
            .then(loadMovieForEditSuccess.bind(this));

        function loadMovieForEditSuccess(movieInfo) {
            this.showView(
                <EditMovieView
                    onsubmit={this.editMovie.bind(this)}
                    movieId={movieInfo._id}
                    title={movieInfo.title}
                    actors={movieInfo.actors}
                    description={movieInfo.description}
                    genre={movieInfo.genre}
                    year={movieInfo.year}
                />
            );
        }
    }
    editMovie(movieId, title, actors, description,genre,year) {
        KinveyRequester.editMovie(movieId, title, actors, description,genre,year)
            .then(editMovieSuccess.bind(this));

        function editMovieSuccess() {
            this.showMoviesView();
            this.showInfo("Movie edited.");
        }
    }
    prepareMovieDetails(movieId) {
        KinveyRequester.findMovieById(movieId)
            .then(loadMovieDetailsSuccess.bind(this));

        function loadMovieDetailsSuccess(movieInfo) {
            this.showView(
                <DetailsMovieView
                    movieId={movieInfo._id}
                    title={movieInfo.title}
                    actors={movieInfo.actors}
                    description={movieInfo.description}
                    genre={movieInfo.genre}
                    year={movieInfo.year}
                />
            );
        }
    }
    confirmMovieDelete(movieId) {
        KinveyRequester.findMovieById(movieId)
            .then(loadMovieForDeleteSuccess.bind(this));

        function loadMovieForDeleteSuccess(movieInfo) {
            this.showView(
                <DeleteMovieView
                    onsubmit={this.deleteMovie.bind(this)}
                    movieId={movieInfo._id}
                    title={movieInfo.title}
                    actors={movieInfo.actors}
                    description={movieInfo.description}
                    genre={movieInfo.genre}
                    year={movieInfo.year}
                />
            );
        }
    }
    deleteMovie(movieId) {
        KinveyRequester.deleteMovie(movieId)
            .then(deleteMovieSuccess.bind(this));

        function deleteMovieSuccess() {
            this.showMoviesView();
            this.showInfo("Movie deleted.");
        }
    }
    showCreateMovieView() {
        this.showView(<CreateMovieView onsubmit={this.createMovie.bind(this)} />);
    }
    createMovie(title, actors, description,genre,year) {
        KinveyRequester.createMovie(title, actors, description,genre,year)
            .then(createMovieSuccess.bind(this));

        function createMovieSuccess() {
            this.showMoviesView();
            this.showInfo("Movie created.");
        }
    }
    showUsersView(){
        KinveyRequester.findAllUsers()
            .then(loadUsersSuccess.bind(this));

        function loadUsersSuccess(users) {
            this.showInfo("Users loaded.");
            this.showView(
                <UsersView
                    users={users}
                    userId={this.state.userId}
                />
            );
        }
    }
}
