
import { createWebHistory, createRouter } from 'vue-router';
import { getAuthUser, isUserVerified } from '../config/functions';
import Auth from '../views/Auth.vue';
import Projects from '../views/Projects.vue'
// import ProjectCreate from '../views/ProjectCreate.vue'
import Issues from '../views/Issues.vue'
import Issue from '../views/Issue.vue'
import Notes from '../views/Notes.vue'
import Backlog from '../views/Backlog.vue'
import Todos from '../views/Todos.vue'
import ProfileSettings from '../views/ProfileSettings.vue'
import NotificationsSettings from '../views/NotificationsSettings.vue'
import PreferencesSettings from '../views/PreferencesSettings.vue'
import WorkspaceSettings from '../views/WorkspaceSettings.vue'
import UsersSettings from '../views/UsersSettings.vue'
import IntegrationsSettings from '../views/IntegrationsSettings.vue'
import APISettings from '../views/APISettings.vue'
import PlansSettings from '../views/PlansSettings.vue'
import BillingSettings from '../views/BillingSettings.vue'
import NotFound from '../views/NotFound.vue';



const routes = [
    {
        path: '/login',
        name: 'login',
        component: Auth,
        meta: {
            title: "Log in | LogSnap",
        }
    },
    {
        path: '/signup',
        name: 'signup',
        component: Auth,
        meta: {
            title: "Sign up | LogSnap",
        }
    },
    {
        path: "/terms",
        redirect: "/"
    },
    {
        path: "/privacy",
        redirect: "/"
    },
    {
        path: "/docs",
        redirect: "/site"
    },
    // {
    //     path: "/dashboard/issues",
    //     component: Issues,
    //     meta: {
    //         title: "Issues| Dashboard",
    //         requiresAuth: true
    //     },
    // },
    {
        path: "/",
        component: Projects,
        meta: {
            title: "Projects | LogSnap",
            requiresAuth: true
        },
    },
    {
        name: "Issues",
        path: "/project/:projName/issues/:id",
        component: Issues,
        meta: {
            title: "Issues | LogSnap",
            requiresAuth: true,
        },
    },
    {
        name: "Notes",
        path: "/project/:projName/notes/:id",
        component: Notes,
        meta: {
            title: "Notes | LogSnap",
            requiresAuth: true,
        },
    },
    {
        name: "Todos",
        path: "/project/:projName/todos/:id",
        component: Todos,
        meta: {
            title: "Todos | LogSnap",
            requiresAuth: true
        },
    },
    {
        name: "Backlog",
        path: "/project/backlog/:id",
        component: Backlog,
        meta: {
            title: "Backlog | LogSnap",
            requiresAuth: true
        },
    },
    {
        name: "Issue",
        path: "/project/:projName/issue/viewissue/:projectid/:id",
        component: Issue,
        meta: {
            title: "Issue",
            requiresAuth: true
        },
    },
    {
        path: "/settings/account/profile",
        component: ProfileSettings,
        meta: {
            title: "Profile",
            requiresAuth: true
        },
    },
    {
        path: "/settings/account/notifications",
        component: NotificationsSettings,
        meta: {
            title: "Notifications",
            requiresAuth: true
        },
    },
    {
        path: "/settings/account/preferences",
        component: PreferencesSettings,
        meta: {
            title: "Preferences",
            requiresAuth: true
        },
    },
    {
        path: "/settings/workspace",
        component: WorkspaceSettings,
        meta: {
            title: "Workspace",
            requiresAuth: true
        },
    },
    {
        path: "/settings/workspace/users",
        component: UsersSettings,
        meta: {
            title: "Users",
            requiresAuth: true
        },
    },
    {
        path: "/settings/workspace/integrations",
        component: IntegrationsSettings,
        meta: {
            title: "Integrations",
            requiresAuth: true
        },
    },
    {
        path: "/settings/workspace/api",
        component: APISettings,
        meta: {
            title: "API",
            requiresAuth: true
        },
    },
    {
        path: "/settings/workspace/plans",
        component: PlansSettings,
        meta: {
            title: "Plans",
            requiresAuth: true
        },
    },
    {
        path: "/settings/workspace/billing",
        component: BillingSettings,
        meta: {
            title: "Billing",
            requiresAuth: true
        },
    },

    {
        path: "/:pathMatch(.*)*",
        component: NotFound,
        meta: {
            title: "404 | Not Found"
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    base: process.env.BASE_URL,
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'exact-active',
    routes,
});

router.afterEach((to, from, next) => {
    // if (localStorage.theme === 'dark'  || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    //   document.body.classList.add('dark');

    // } else {
    //   document.body.classList.remove('dark');
    // }
    document.title = to.meta.title;
    next
    from
});




router.beforeEach(async(to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if(requiresAuth && !await getAuthUser()) {
        next('login')
    }
    else if (requiresAuth && await isUserVerified() === false) {
        next('login')
    }
    else {
        next()
    }
    from
});


export default router;