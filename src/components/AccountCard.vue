<template>
   <el-card shadow="hover" @click="toDetail" class="account-card">
        <div>
            <span class="title">{{ title }}</span>
            <span class="cost">{{ cost }}</span>
        </div>
   </el-card>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

defineProps({
    title: String,
    cost: Number
})

const router = useRouter();
const toDetail = () => {
  router.push('/detail');
};
</script>

<style lang="scss" scoped>

.account-card{
    height: 150px;
    width: 300px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    .title{
        font-size: 18px;
        font-weight: bold;
    }
    .cost{
        font-size: 20px;
        font-weight: bold;
        color: aquamarine;
    }
}
</style>
