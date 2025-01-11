<template>
    <div class="drawer">
        <v-navigation-drawer location="right" v-model="drawer" app>
            <p>
                xxxxxxxxxxxxxxxxxxxx
                xxxxxxxxxxxxxxxxxxxx
                xxxxxxxxxxxxxxxxxxxx
            </p>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    inject: ['emitter'],
    data: () => ({
        drawer: false,
    }),
    mounted() {
        this.emitter.on('toggleCart', () => {
            this.drawer = !this.drawer;
        });
    },
};
</script>
