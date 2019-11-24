<template>
    <span>
        <v-card-text>
            <serial-number-form ref="serialNumberForm" @valid="checkValid"></serial-number-form>
        </v-card-text>
        <v-card-actions>
            <v-btn
                    text
                    class="mx-auto font-weight-bold"
                    @click="addDeviceBySerialNumber"
                    :disabled="!valid"
            >
                Dodaj urządzenie
            </v-btn>
        </v-card-actions>
    </span>

</template>

<script>
    import SerialNumberForm from "./SerialNumber"

    export default {
        name: 'CheckExist',
        components: {
            SerialNumberForm,
        },
        data: () => ({
            valid: false,
        }),
        methods: {
            async addDeviceBySerialNumber() {
                this.$http.post('/api/device/serialNumber', this.$refs.serialNumberForm.credentials)
                    .then(() => {
                        this.$toasted.show('Dodano urządzenie do oddziału', {
                            type: 'success'
                        });
                    })
            },
            checkValid(value) {
                this.valid = value
            }
        },
    }
</script>

<style>

</style>
