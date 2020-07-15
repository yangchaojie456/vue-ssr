import { createApp } from './app'

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()
        // 设置服务器端 router 的位置
        console.log('路由', context.url)
        router.push(context.url)
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // console.log(matchedComponents)
            if ((context.url != '' && context.url != '/') && matchedComponents.length == 0) {
                return reject({ code: 404 })
            }

            // 对所有 匹配 路由组件 调用'asyncData()'
            Promise.all(matchedComponents.map(Component => {
                var asyncData = Component.asyncData
                if (asyncData) {
                    return asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then((data) => {
                console.log('then------------')
                console.log(data)
                var len = matchedComponents.length
                for (let index = 0; index < len; index++) {
                    var VMComponent = matchedComponents[index]._Ctor[0]
                    VMComponent.mixin({
                        data() {
                            return data[index] || {}
                        }
                    })
                }
                context.state = {
                    store: store.state,
                    data: data || []
                }


                resolve(app)

            }).catch(reject)
        }, reject)

    })

}