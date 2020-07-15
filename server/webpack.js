const webpack = require('webpack')

module.exports = function build({ client, server }) {
    return Promise.all([new Promise((resolve, reject) => {
        webpack(client, (err, stats) => {
            if (err || stats.hasErrors()) {

                reject(stats.compilation.errors.toString())
            }
            resolve()
        })
    }), new Promise((resolve, reject) => {
        webpack(server, (err, stats) => {
            if (err || stats.hasErrors()) {
                reject(stats.compilation.errors.toString())
            }
            resolve()
        })
    })])
}
