<template>
    <div>
        <ul>
            <li >
                <button @click="cat = 'Pizza'">Pizza</button>
            </li>
            <li>
                <button @click="cat = 'Drank'">Drank</button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { ref, Ref, watch } from 'vue';

export default {
    

    setup(){
        const cat: Ref<String> = ref('Pizza')
        watch(cat, () => {
           const newCat = cat
        console.log(newCat.value)
        })
        return {
            cat
        }
    }
}
</script>