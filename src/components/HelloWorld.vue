<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <button @click="getApi">测试接口</button>
        <textarea name="" id="" v-model="apiText" style="display: inline-block; width: 500px; height: 400px"></textarea>
    </div>
</template>

<script>
import { login, getSites, getDictionary } from '@/api/index.js'
export default {
    name: 'HelloWorld',
    props: {
        msg: String,
    },
    data() {
        return {
            apiText: 'apiText',
        }
    },
    methods: {
        getApi() {
            getSites().then((res) => {
                console.log(JSON.parse(JSON.stringify(res)))
                this.apiText = JSON.stringify(res.data)
            })
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
    text-align: center;
}
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
