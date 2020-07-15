const fs = require('fs')
const path = require('path')
const colors = require("colors");
const build = require('./webpack.js')
const configClient = require('../config/webpack.client.config');
const configServer = require('../config/webpack.server.config');
const { createBundleRenderer } = require('vue-server-renderer')

const template = fs.readFileSync(path.resolve(__dirname, '../index.template.html'), 'utf-8')
const serverBundle = path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json')
const clientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'))

function clearConsole() {
    process.stdout.write(
        process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
    );
}

const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // 推荐
    template,
    clientManifest // （可选）客户端构建 manifest
})





const express = require('express')
const server = express()
server.use(express.static('dist'))
server.get('*', function (req, res) {
    const context = { url: req.url }
    try {
        renderer.renderToString(context, (err, html) => {
            if (err) {
                console.log(err)
                if (err.code) {
                    res.status(err.code).end('404')
                    return false
                }
                res.status(500).end('Internal Server Error')
                return false
            }
            // console.log(html)
            res.send(html)
        })
    } catch (error) {
        console.log('----------server error---------------')
        console.log(error)
    }

})
build({ client: configClient, server: configServer }).then(() => {
    console.log('client-build-done'.green)
    console.log('server-build-done'.green)
    server.listen(8001, () => {
        console.log('Server listening on http://localhost:8001'.yellow)
    })
}).catch(err => {
    setTimeout(() => {
        clearConsole()
        console.error('Error'.red)
        console.error(err.toString().red)
    }, 1000);
})




