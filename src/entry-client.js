import { createApp } from './app'

const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
  // console.log(window.__INITIAL_STATE__)
  // window.__INITIAL_STATE__.store.count=2
  store.replaceState(window.__INITIAL_STATE__.store)
}
router.onReady(() => {
  var serverAsyncData = window.__INITIAL_STATE__.data
  var serverMatchComponents = router.getMatchedComponents()
  var len = serverMatchComponents.length
  for (let index = 0; index < len; index++) {
    var VMComponent = serverMatchComponents[index]._Ctor[0]
    VMComponent.mixin({
      data() {
        return serverAsyncData[index] || {}
      }
    })
  }

  // 切换路由时 前端路由切换触发
  router.beforeResolve((to, from, next) => {
    console.log('beforeResolve')
    const matchedComponents = router.getMatchedComponents(to)
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
      var len = matchedComponents.length
      for (let index = 0; index < len; index++) {
        var VMComponent = matchedComponents[index]._Ctor[0]
        VMComponent.mixin({
          data() {
            return data[index] || {}
          }
        })
      }

      next()
    }).catch(next)
  })
  app.$mount('#app')
})