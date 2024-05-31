<template>
  <div class="flex flex-col space-y-6 md:space-y-4">
    <h1 class="page-title">Settings</h1>
    <VaAlert class="rounded-lg p-4 m-0" closeable color="info">
      <template #icon>
        <VaIcon size="26px" name="mso-notifications_active" />
      </template>
      <div class="flex flex-col space-y-2">
        <p class="text-regularLarge font-bold">Your notification settings are regrouped and simplified</p>
        <p class="text-regularMedium">Your previous setting choices aren't changed.</p>
      </div>
    </VaAlert>
    <Notifications />
  </div>
</template>
<script lang="ts" setup>
import Notifications from './notifications/Notifications.vue'
</script>
