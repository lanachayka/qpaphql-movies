import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { styles } from './styles';
import {graphql} from "react-apollo";
import {addDirectorMutation} from "./mutations";
import {directorsQuery} from "../DirectorsTable/queries";
import {updateDirectorMutation} from "./mutations";

const withGraphQl = compose(
    graphql(addDirectorMutation, {
        props: ({mutate}) => ({
            addDirector: director => mutate({
                variables: director,
                refetchQueries: [{
                    query: directorsQuery,
                    variables: { name : ''}
                }],
            }),
        }),
    }),
    graphql(updateDirectorMutation, {
        props: ({mutate}) => ({
            updateDirector: director => mutate({
                variables: director,
                refetchQueries: [{
                    query: directorsQuery,
                    variables: { name : ''}
                }],
            }),
        }),
    }),
)

export default compose(withStyles(styles), withGraphQl);