<template>
    <span>
        <device-details v-if="!editDevice" :device="device" :loading="loading"
                        @editCard="deviceEdit"></device-details>
        <device-edit v-else :device="device" @editCard="deviceEdit"></device-edit>
    </span>
</template>

<script>
    import DeviceDetails from "./Details";
    import DeviceEdit from "./Edit";

    export default {
        name: 'Device',
        data: () => ({
            editDevice: false,
        }),
        props: {
            device: {},
            loading: {},
        },
        components: {
            DeviceDetails,
            DeviceEdit,
        },
        methods: {
            deviceEdit(value) {
                this.editDevice = value
            },
        },
    }
</script>

<style>
</style>
