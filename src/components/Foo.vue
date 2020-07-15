<template>
  <div>
      Foo
      <div>state.count的值:{{$store.state.count}}</div>
      <div>data___update的值:{{data___update}}</div>
  </div>
</template>

<script>
export default {
    asyncData({store,route}){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve({
                    data___update :567
                })
            }, 2000);
        })
    },
    mounted(){
        console.log(this)
    }
}
</script>

<style>

</style>