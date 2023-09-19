<template>
    <el-container class="settings">
        <el-aside class="side-bar">
            <RouterLink class="side-bar-item" to="/settings/organizations">Organizations</RouterLink>
            <RouterLink class="side-bar-item" to="/settings/organizations">Organizations</RouterLink>
            <RouterLink class="side-bar-item" to="/settings/organizations">Organizations</RouterLink>
        </el-aside>
        <el-main class="content">
            <RouterView></RouterView>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>


</script>

<style lang="scss" scoped>
.settings {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;

    .side-bar {
        display: flex;
        flex-direction: column;

        .side-bar-item {
            border-radius: 5px;
            cursor: pointer;
            padding: 5px 10px;
            margin-right: 20px;
            color: #333333;

            &:hover {
                background-color: rgba($color: #000000, $alpha: .1);
            }
        }
    }

    .content {
        background: rgba($color: #000000, $alpha: .4);
    }
}
</style>
