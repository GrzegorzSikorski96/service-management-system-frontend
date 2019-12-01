<template>
    <span>
        <device-details v-if="!editDevice" :device="device" :loading="loading" @editCard="deviceEdit"/>
        <device-edit v-else :device="device" @editCard="deviceEdit"/>
    </span>
</template>

<script>
    import DeviceDetails from "./Details";
    import DeviceEdit from "./Edit";

    export default {
        name: 'Device',
        props: {
            device: {},
            loading: {},
        },
        components: {
            DeviceDetails,
            DeviceEdit,
        },
        data: () => ({
            editDevice: false,
        }),
        methods: {
            deviceEdit(value) {
                this.editDevice = value
            },
        },
    }
</script>

<style>
</style>
