import { createRouter, createWebHistory } from "vue-router";
import MainDashboard from "../Shared/Layouts/MainDashboard.vue";
import Themepage from "../Shared/Layouts/Themepage.vue";
const routes = [
   {
    path: `${import.meta.env.BASE_URL}`,
    children: [
      {
        path: "signin",
        name: "SignIn",
        component: () => import("../components/auth/signin/Signin.vue"),
      },
      {
        path: "forgotpassword",
        component: () =>
          import("../components/custompages/forgotpassword/Forgotpassword.vue"),
      },
      {
        path: "resetpassword",
        component: () =>
          import("../components/custompages/resetpassword/Restpassword.vue"),
      },
      {
        path: "lockscreen",
        component: () =>
          import("../components/custompages/lockscreen/Lockscreen.vue"),
      },
      
    ],
  },
  {
    component: MainDashboard,
    children: [
      // {
      //   path: `${import.meta.env.BASE_URL}/admin`,
      //   redirect: `${import.meta.env.BASE_URL}`, 
      //   component: () => import("../components/dashboard/Dashboard.vue"),
        
      // },
      // {
      //   path: `${import.meta.env.BASE_URL}/admin`,
      //   name: "Maindashboard",
      //   component: () => import("../components/dashboard/Dashboard.vue"),
      // },
      {
        path: `${import.meta.env.BASE_URL}dashboard`,
        name: "Dashboard",
        component: () => import("../components/dashboard/Dashboard.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}products`,
        name: "Products",
        component: () => import("../components/Products/Products.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}category`,
        name: "Category",
        component: () => import("../components/Category/Category.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}vendors`,
        name: "Vendors",
        component: () => import("../components/vendors/Vendors.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}stores`,
        name: "stores",
        component: () => import("../components/Store/Store.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}tags`,
        name: "Tags",
        component: () => import("../components/Tags/Tags.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}category/:id`,
        name: "ViewCategory",
        component: () => import("../components/Category/ViewCategory.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}ordering`,
        name: "Ordering",
        component: () => import("../components/ordering/ordering.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}singleorder/:id`,
        name: "SingleOrder",
        component: () => import("../components/ordering/singleorder.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}customer`,
        name: "Customer",
        component: () => import("../components/customer/Customer.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}customer/single_customer/:id`,
        name: "SingleCustomer",
        component: () => import("../components/customer/SingleCustomer.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}customer/SingleGroup/:id`,
        name: "SingleGroup",
        component: () => import("../components/customer/SingleGroup.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}reports`,
        name: "Reports",
        component: () => import("../components/reports/Reports.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}reports/charts`,
        name: "Reportscharts",
        component: () => import("../components/reports/charts.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}question`,
        name: "Question",
        component: () => import("../components/Question/Question.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}definition`,
        name: "Definition",
        component: () => import("../components/Definition/Definition.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}:id`,
        name: "Singlepage",
        component: () => import("../components/Definition/SinglePage.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}brands`,
        name: "Brands",
        component: () => import("../components/Brands/Brand.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}brands/:id`,
        name:'singlebrand',
        component:()=>import('../components/Brands/SingleBrand.vue')
      },
      {
        path: `${import.meta.env.BASE_URL}discount`,
        name: "DiscountCopuns",
        component: () => import("../components/discount/DiscountCopuns.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}single-copun/:id`,
        name: "SingleCopun",
        component: () => import("../components/discount/SingleCopun.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}offer`,
        name: "offer",
        component: () => import("../components/offer/offer.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}special-offer/:id`,
        name: "SingleOffer",
        component: () => import("../components/offer/Singleoffer.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}marketing`,
        name: "Marketing",
        component: () => import("../components/marketing/marketing.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}marketing/newcampaign`,
        name: "Newcampaign",
        component: () => import("../components/marketing/Newcampaign.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}basket`,
        name: "Basket",
        component: () => import("../components/basket/basket.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}shop`,
        name: "Shop",
        component: () => import("../components/Shop/Shop.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}sliders`,
        name: "sliders",
        component: () => import("../components/Slider/Slider.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}setting`,
        name: "Setting",
        component: () => import("../components/Setting/Setting.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}setting/:page`,
        name: "SettingPage",
        component: () => import("../components/Setting/SettingPage.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}notification`,
        name: "notification",
        component: () => import("../components/notifications/notification.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}contact`,
        name: "Contact",
        component: () => import("../components/Contact/Contact.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}Profile`,
        name: "Profile",
        component: () => import("../components/Profile/Profile.vue"),
      },
      {
        path: `${import.meta.env.BASE_URL}admins`,
        name: "Admins",
        component: () => import("../components/Admins/Admins.vue")
      },
      {
        path: `${import.meta.env.BASE_URL}singleadmins/:id`,
        name: "OneAdmin",
        component: () => import("../components/Admins/SingleAdmin.vue")
      },
      {
        path: `${import.meta.env.BASE_URL}roles`,
        name: "Roles",
        component: () => import("../components/Roles/Roles.vue")
      },
      {
        path: `${import.meta.env.BASE_URL}role/:id`,
        name: "SingleRole",
        component: () => import("../components/Roles/SingleRole.vue")
      },
      {
        path: `${import.meta.env.BASE_URL}edit-role/:id`,
        name: "editRole",
        component: () => import("../components/Roles/editRole.vue")
      },
      {
        path: `${import.meta.env.BASE_URL}payment`,
        name: "Payment",
        component: () => import("../components/Payment/Payment.vue")
      },
      {
        path: `${import.meta.env.BASE_URL}delivery`,
        name: "delivery",
        component: () => import("../components/Delivery/delivery.vue")
      },
      {
        path: `${import.meta.env.BASE_URL}delivery_options`,
        name: "delivery_options",
        component: () => import("../components/delivery_options/delivery_options.vue")
      },
      {
        path: `${import.meta.env.BASE_URL}withdrawal-requests`,
        name: "withdrawal-requests",
        component: () => import("../components/withdrawal-requests/withdrawal-requests.vue")
      },
    ],
  },

  // Switcher-header page
  {
    path: `${import.meta.env.BASE_URL}/pages`,
    component: Themepage,
    children: [
      {
        path: "switcherpage",
        component: () =>
          import("../components/pages/switcherpage/Switcherpage.vue"),
      },
    ],
  },
 
  //.....Errorpage.....
  {
    path: "/:pathMatch(.*)*",
    name: "404page",
    component: () => import("../components/custompages/error404/Error404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {

setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

router.beforeEach((to, from, next) => {
  const loggedInUserData = localStorage.getItem('authlocal');
  if(loggedInUserData && to.name == 'SignIn'){
    next('dashboard');
  }else{
    if (!localStorage.getItem('authlocal') && to.name !== 'SignIn'  ) {
      next('Signin'); // Redirect to SignIn if token is not present and the current route is not SignIn
    } else {
      next(); // Allow the navigation to proceed
    }
  }
});
export default router;
