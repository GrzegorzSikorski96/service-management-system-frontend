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
        },
        {
            path: '/tickets',
            name: 'TicketsList',
            component: TicketsList,
        },
        {
            path: '/ticket/:id',
            name: 'Ticket',
            component: Ticket,
            props: true
        },
        {
            path: '/device/:id',
            name: 'Device',
            component: Device,
            props: true
        },
        {
            path: '/client/:id',
            name: 'Client',
            component: Client,
            props: true
        },
        {
            path: '/clients',
            name: 'ClientList',
            component: ClientList,
        },
        {
            path: '/client/create',
            name: 'ClientCreate',
            component: ClientCreate,
        }
    ]
})