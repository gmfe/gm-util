import queryString from 'query-string';

export default function processReactRouterProps(props) {
    props.location.query = queryString.parse(props.location.search);
    return props;
}