<template>
    <main>
        <h1 class="text-center" style="color: var(--primary);">Area Amministazione</h1>

        <div>
            <router-link :to="{name: 'formVerificaLocale'}">
                <Primary title="Verifica Locali"/>
            </router-link>
        </div>
    </main>
</template>

<script>
import Primary from '@/components/buttons/Primary.vue'
export default {
    components: {
        Primary,
    },
}
</script>