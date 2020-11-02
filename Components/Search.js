// Components/Search.js

import React from 'react'
import FilmItem from "./FilmItem";
import {ActivityIndicator, Button, FlatList, StyleSheet, TextInput, View} from 'react-native'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'
import { connect } from 'react-redux'


class Search extends React.Component {

    constructor(props) {
        super(props)
        {/* Initialisation de notre donnée searchedText en dehors du state */
        }
        this.searchedText = "";
        {/* Compteur pour connaître la page courante */
        }
        this.page = 0;
        {/* Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB */
        }
        this.totalPages = 0;
        this.state = {
            films: [],
            isLoading: false
        }
    }

    _displayDetailForFilm = (idFilm) => {
        console.log("Display film with id " + idFilm)
        this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    {/* Le component ActivityIndicator possède une propriété size
                    pour définir la taille du visuel de chargement : small ou large.
                    Par défaut size vaut small, on met donc large
                    pour que le chargement soit bien visible */}
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({isLoading: true})
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                this.page = data.page
                this.totalPages = data.totalPages
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false
                })
            })
        }
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: [],
        }, () => {
            this._loadFilms()
        })
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Titre du film'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchFilms()}
                />
                <Button style={{height: 50}} title='Rechercher' onPress={() => this._searchFilms()}/>
                <FlatList
                    data={this.state.films}
                    extraData={this.props.favoritesFilm}
                    // On utilise la prop extraData pour indiquer à notre FlatList que d’autres données doivent être prises en compte si on lui demande de se re-rendre
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) =>
                        <FilmItem
                            film={item}
                            // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                            isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1)}
                            displayDetailForFilm={this._displayDetailForFilm}
                        />
                    }

                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        {/* On vérifie qu'on n'a pas atteint
                        la fin de la pagination (totalPages)
                        avant de charger plus d'éléments */
                        }
                        if (this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    }
})
// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Search)
