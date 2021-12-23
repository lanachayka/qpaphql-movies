import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { styles } from './styles';
import {graphql} from "react-apollo";
import {addMovieMutation, updateMovieMutation} from "./mutations";
import {moviesQuery} from "../MoviesTable/queries";
import {directorsQuery} from "./queries";

const withGrqphQl = compose(
    graphql(updateMovieMutation, {
        props: ({mutate}) => ({
            updateMovie: movie => mutate({
                variables: movie,
                refetchQueries: [{
                    query: moviesQuery,
                    variables: { name : ''}
                }],
            }),
        }),
    }),
    graphql(addMovieMutation, {
        props: ({mutate}) => ({
            addMovie: movie => mutate({
                variables: movie,
                refetchQueries: [{
                    query: moviesQuery,
                    variables: { name : ''}
                }],
            }),
        }),
    }),
    graphql(directorsQuery, {
        options: ({ name = '' }) => ({
            variables: { name },
        }),
    }),
)

export default compose(withStyles(styles), withGrqphQl);