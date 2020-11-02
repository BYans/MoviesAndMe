// Navigation/Nav.js

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: ''
        }

    }
})

export default createAppContainer(SearchStackNavigator)
