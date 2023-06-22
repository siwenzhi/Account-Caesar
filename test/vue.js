const { createApp, ref, reactive, toRefs } = Vue;
const vue3Composition = {
    setup(){
        const data = reactive({
            name: '张三',
            age : 24
        })

        const tt=ref(123)

        const testMethod = () => {
            console.log('hello -----',data.name);
        }

        console.log(tt.value)
        console.log(data)

        return {
            ...toRefs(data),
            tt,
            testMethod
        }
    }
    
}
const app = createApp(vue3Composition).use(ElementPlus).mount('#app');
