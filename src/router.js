import Vue from "vue"
import Router from "vue-router"
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import TicketCreate from "./components/Ticket/Create";
import TicketCheckStatus from "./components/Ticket/CheckStatus";
import TicketsList from "./components/Ticket/List";
import TicketSummary from "./components/Ticket/Summary";
import DeviceSummary from "./components/Device/Summary";
import ClientCreate from "./components/Client/Create";
import DeviceList from "./components/Device/List";
import DeviceCreate from "./components/Device/Create";
import ClientList from "./components/Client/List"
import ClientSummary from "./components/Client/Summary";

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
                roles: ['administrator', 'manager', 'serwisant'],
            },
        },
        {
            path: '/tickets',
            name: 'TicketsList',
            component: TicketsList,
            meta: {
                roles: ['administrator', 'manager', 'serwisant'],
            },
        },
        {
            path: '/ticket/:id',
            name: 'TicketSummary',
            component: TicketSummary,
            props: true,
            meta: {
                roles: ['administrator', 'manager', 'serwisant'],
            },
        },
        {
            path: '/client/create',
            name: 'ClientCreate',
            component: ClientCreate,
            meta: {
                roles: ['administrator', 'manager', 'serwisant'],
            },
        },
        {
            path: '/client/:id',
            name: 'ClientSummary',
            component: ClientSummary,
            props: true,
            meta: {
                roles: ['administrator', 'manager', 'serwisant'],
            },
        },
        {
            path: '/clients',
            name: 'ClientList',
            component: ClientList,
            meta: {
                roles: ['administrator', 'manager', 'serwisant'],
            },
        },
        {
            path: '/devices',
            name: 'DeviceList',
            component: DeviceList,
            meta: {
                roles: ['administrator', 'manager', 'serwisant'],
            },
        },
        {
            path: '/device/create',
            name: 'DeviceCreate',
            component: DeviceCreate,
            meta: {
                roles: ['administrator', 'manager', 'serwisant'],
            },
        },
        {
            path: '/device/:id',
            name: 'DeviceSummary',
            component: DeviceSummary,
            props: true,
            meta: {
                roles: ['administrator', 'manager', 'serwisant'],
            },
        },
    ]
})