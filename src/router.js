import Vue from "vue"
import Router from "vue-router"
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import TicketCreate from "./components/Ticket/TicketCreate";
import TicketCheckStatus from "./components/Ticket/TicketCheckStatus";
import TicketsList from "./components/Ticket/TicketsList";
import Ticket from "./components/Ticket/Ticket";
import Device from "./components/Device/Device";
import Client from "./components/Client/Client";
import ClientList from "./components/Client/ClientList";
import ClientCreate from "./components/Client/ClientCreate";
import DeviceList from "./components/Device/DeviceList";
import DeviceCreate from "./components/Device/DeviceCreate";

Vue.use(Router);

export default new Router({
    mode: "history",

    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: HomePage,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                forVisitors: true
            },
        },
        {
            path: '/check',
            name: 'TicketCheckStatus',
            component: TicketCheckStatus,
        },
        {
            path: '/ticket/create',
            name: 'TicketCreate',
            component: TicketCreate,
            meta: {
                roles: ['administrator', 'manager', 'serviceman'],
            },
        },
        {
            path: '/tickets',
            name: 'TicketsList',
            component: TicketsList,
            meta: {
                roles: ['administrator', 'manager', 'serviceman'],
            },
        },
        {
            path: '/ticket/:id',
            name: 'Ticket',
            component: Ticket,
            props: true,
            meta: {
                roles: ['administrator', 'manager', 'serviceman'],
            },
        },
        {
            path: '/client/:id',
            name: 'Client',
            component: Client,
            props: true,
            meta: {
                roles: ['administrator', 'manager', 'serviceman'],
            },
        },
        {
            path: '/clients',
            name: 'ClientList',
            component: ClientList,
            meta: {
                roles: ['administrator', 'manager', 'serviceman'],
            },
        },
        {
            path: '/client/create',
            name: 'ClientCreate',
            component: ClientCreate,
            meta: {
                roles: ['administrator', 'manager', 'serviceman'],
            },
        },
        {
            path: '/devices',
            name: 'DeviceList',
            component: DeviceList,
            meta: {
                roles: ['administrator', 'manager', 'serviceman'],
            },
        },
        {
            path: '/device/create',
            name: 'DeviceCreate',
            component: DeviceCreate,
            meta: {
                roles: ['administrator', 'manager', 'serviceman'],
            },
        },
        {
            path: '/device/:id',
            name: 'Device',
            component: Device,
            props: true,
            meta: {
                roles: ['administrator', 'manager', 'serviceman'],
            },
        },
    ]
})