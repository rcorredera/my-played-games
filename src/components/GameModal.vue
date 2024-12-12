<template>
    <div class="modal" v-if="isVisible">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h2>{{ game.name }}</h2>
            <img :src="game.coverUrl" alt="Game Cover" class="game-cover" />
            <div class="platform-icons">
                <img v-if="getGamePlatform(game.platformId)" :src="getGamePlatform(game.platformId).iconUrl"
                    :alt="getGamePlatform(game.platformId).name" class="platform-icon" />
            </div>
            <p><strong>Summary:</strong> {{ game.summary }}</p>
            <p><strong>First Release Date:</strong> {{ formatDate(game.first_release_date) }}</p>
            <p><strong>Rating:</strong> {{ game.rating }}</p>
            <a :href="game.url" target="_blank">More Info</a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { Game, Platform } from '@/types';

export default defineComponent({
    props: {
        game: {
            type: Object as PropType<Game>,
            required: true,
        },
        platforms: {
            type: Array as PropType<Platform[]>,
            required: true,
        },
        isVisible: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['close'],
    methods: {
        formatDate(timestamp: string): string {
            const date = new Date(timestamp);
            return date.toLocaleDateString();
        },
        closeModal() {
            this.$emit('close');
        },
        getGamePlatform(platformId: number): Platform {
            return this.platforms.find(platform => platform.id === platformId) || { id: 0, name: '', iconUrl: '', image_id: '' };
        }
    },
})
</script>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: var(--background-color);
    color: var(--text-color);
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.close {
    color: var(--text-color);
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.game-cover {
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: cover;
    margin-bottom: 20px;
}

.platform-icons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.platform-icon {
    width: 30px;
    height: 30px;
    object-fit: contain;
}
</style>