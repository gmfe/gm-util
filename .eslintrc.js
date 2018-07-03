// module.exports = {
//     "parserOptions": {
//         "ecmaVersion": 6,
//         "ecmaFeatures": {
//             "jsx": true,
//             "experimentalObjectRestSpread": true
//         },
//         "sourceType": "module"
//     },
//     "env": {
//         "browser": true,
//         "node": true,
//         "es6": true
//     },
//     "rules": {
//         "semi": [
//             2,
//             "always"
//         ]
//     }
// };
module.exports = {
    'parser': 'babel-eslint',
    'extends': [
        'standard',
        'standard-jsx'
    ],
    'globals': {
        'fetch': true,
        'FormData': true,
    }
}