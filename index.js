const fs = require('fs')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

const template = fs.readFileSync('./index.template.html', 'utf-8')
const serverBundle = path.resolve(__dirname, './dist/vue-ssr-server-bundle.json')
const clientManifest = require(path.resolve(__dirname, './dist/vue-ssr-client-manifest.json'))

const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // 推荐
    template,
    clientManifest // （可选）客户端构建 manifest
})
const express= require('express')
const server = express()
server.use(express.static('dist'))
server.get('*', function (req, res) {
    const context = { url: req.url }
    try {
        renderer.renderToString(context, (err, html) => {        
            if (err) {   
                console.log(err)             
                if(err.code){
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
server.listen(8001)