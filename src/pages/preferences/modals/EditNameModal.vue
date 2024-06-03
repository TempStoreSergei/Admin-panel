<template>
  <VaModal
    :mobile-fullscreen="false"
    size="small"
    hide-default-actions
    max-width="380px"
    model-value
    close-button
    @update:modelValue="emits('cancel')"
  >
    <h1 class="va-h5 mb-4">Edit name</h1>
    <VaForm ref="form" @submit.prevent="submit">
      <VaInput v-model="name" class="mb-4" label="Name" placeholder="Name" :rules="nameRules" @input="handleInput" />
      <VaInput
        v-model="password"
        class="mb-4"
        label="Password"
        placeholder="Password"
        type="password"
        :rules="passwordRules"
        @input="handleInput"
      />
      <div class="flex flex-col-reverse md:flex-row md:items-center md:justify-end md:space-x-4">
        <VaButton :style="buttonStyles" preset="secondary" color="secondary" @click="emits('cancel')"> Cancel</VaButton>
        <VaButton :style="buttonStyles" class="mb-4 md:mb-0" type="submit" :disabled="!isFormValid" @click="submit"> Save</VaButton>
      </div>
    </VaForm>
  </VaModal>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../../../stores/user-store'
import { useToast, useForm } from 'vuestic-ui'
import { buttonStyles } from '../styles'
import { Axios } from '../../../config/utils'

const store = useUserStore()
const { init } = useToast()
const { validate } = useForm('form')

const emits = defineEmits(['cancel'])

const name = ref<string>(store.userName)
const password = ref<string>('')

const nameRules = [(v: string) => !!v || 'Name field is required']
const passwordRules = [(v: string) => !!v || 'Password field is required']

const isFormValid = computed(() => {
  return name.value && password.value && validate()
})

const handleInput = async () => {
  await validate()
}

const submit = async () => {
  const isValid = await validate()
  if (isValid) {
    try {
      await changeUserName()
      store.changeUserName(name.value)
      init({ message: "You've successfully changed your name", color: 'success' })
      emits('cancel')
    } catch (error) {
      handleErrors(error)
    }
  }
}

const changeUserName = async () => {
  await Axios.post('change_user_name', { username: name.value, userpass: password.value }).then((response) => {
    if (response.data.success !== 'yes') {
      throw new Error('Failed to update name')
    }
  })
}

const handleErrors = (error: Error) => {
  console.log('error', error)
  let message = 'An error occurred'
  if (error.message === 'Failed to update name') {
    message = 'Failed to update name'
  }
  init({ message, color: 'danger' })
}
</script>

<style lang="scss">
.va-modal__inner {
  min-width: 326px;
}
</style>
