<template>
  <VaModal
    max-width="530px"
    :mobile-fullscreen="false"
    hide-default-actions
    model-value
    close-button
    @update:modelValue="emit('cancel')"
  >
    <h1 class="va-h5 mb-4">Reset password</h1>
    <VaForm ref="form" class="space-y-6" @submit.prevent="submit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VaInput
          v-model="oldPassword"
          :rules="oldPasswordRules"
          label="Old password"
          placeholder="Old password"
          required-mark
          type="password"
          @input="handleInput"
        />
        <div class="hidden md:block" />
        <VaInput
          v-model="newPassword"
          :rules="newPasswordRules"
          label="New password"
          placeholder="New password"
          required-mark
          type="password"
          :disabled="!oldPassword"
          @input="handleInput"
        />
        <VaInput
          v-model="repeatNewPassword"
          :rules="repeatNewPasswordRules"
          label="Repeat new password"
          placeholder="Repeat new password"
          required-mark
          type="password"
          :disabled="!newPassword"
          @input="handleInput"
        />
      </div>
      <PasswordRequirements :password="newPassword" />
      <div class="flex flex-col-reverse md:justify-end md:flex-row md:space-x-4">
        <VaButton :style="buttonStyles" preset="secondary" color="secondary" @click="emit('cancel')"> Cancel</VaButton>
        <VaButton :style="buttonStyles" class="mb-4 md:mb-0" type="submit" :disabled="!isFormValid" @click="submit"> Update Password</VaButton>
      </div>
    </VaForm>
  </VaModal>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useForm, useToast } from 'vuestic-ui'
import { buttonStyles } from '../styles'
import { Axios } from '../../../config/utils'

const oldPassword = ref<string>('')
const newPassword = ref<string>('')
const repeatNewPassword = ref<string>('')

const { validate } = useForm('form')
const { init } = useToast()

const emit = defineEmits(['cancel'])

const isFormValid = computed(() => {
  return oldPassword.value && newPassword.value && repeatNewPassword.value && validate()
})

const handleInput = async () => {
  await validate()
}

const submit = async () => {
  const isValid = await validate()
  if (isValid) {
    try {
      await checkOldPassword()
      await changePassword()
      init({ message: "You've successfully changed your password", color: 'success' })
      emit('cancel')
    } catch (error) {
      handleErrors(error)
    }
  }
}

const checkOldPassword = async () => {
  await Axios.post('check_current_user_pass', { userpass: oldPassword.value }).then((response) => {
    const result = response.data.success !== 'yes'
    if (result) {
      throw new Error('Old password is incorrect')
    }
  })
}

const changePassword = async () => {
  await Axios.post('change_user_pass', { userpass: newPassword.value }).then((response) => {
    const result = response.data.success !== 'yes'
    console.log('result change', result)
    if (result) {
      throw new Error('Failed to update password')
    }
  })
}

const handleErrors = (error: Error) => {
  console.log('error', error)
  let message = 'An error occurred'
  if (error.message === 'Old password is incorrect') {
    message = 'Old password is incorrect'
  } else if (error.message === 'Failed to update password') {
    message = 'Failed to update password'
  }
  init({ message, color: 'danger' })
}

const oldPasswordRules = [(v: string) => !!v || 'Old password field is required']

const newPasswordRules = [
  (v: string) => !!v || 'New password field is required',
  (v: string) => v.length >= 4 || 'Must be at least 4 characters long',
  (v: string) => new Set(v).size >= 2 || 'Must contain at least 6 unique characters',
  (v: string) => v !== oldPassword.value || 'New password cannot be the same',
]

const repeatNewPasswordRules = [
  (v: string) => !!v || 'Repeat new password field is required',
  (v: string) => v === newPassword.value || 'Confirm password does not match new password',
]

watch([oldPassword, newPassword, repeatNewPassword], handleInput)
</script>

<style lang="scss">
.va-modal__inner {
  min-width: 326px;
}
</style>
