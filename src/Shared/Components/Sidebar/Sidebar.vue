<template>
  <!-- Sidemenu -->
  <div
    class="sticky"
    @mouseenter="showInfoBar(index)"
    @mouseleave="hideInfoBar(index)"
  >
    <perfect-scrollbar
      style="overflow-y: autoplay"
      class="main-menu main-sidebar main-sidebar-sticky side-menu is-expanded sidemenu-scroll"
    >
      <div>
        <div class="main-sidebar-header main-container-1">
          <div class="sidemenu-logo">
            <router-link :to="`${url}dashboard`">
              <!-- <img
                :src="logo"
                class="header-brand-img desktop-logo"
                alt="logo"
                v-if="logo"
              /> -->
              <img
                src="../../../../src/assets/img/logo.png"
                class="header-brand-img desktop-logo p-2 bg-white"
                alt="logo"
              />
            </router-link>
          </div>

          <div
            class="main-sidebar-body main-body-1 is-expanded overflow-hidden-auto"
          >
            <!-- left-arrow -->
            <div class="slide-left disabled" id="slide-left">
           
              <!-- <img
                :src="logo"
                class="header-brand-img desktop-logo"
                alt="logo"
                v-if="logo"
              /> -->
              <img
                src="../../../../src/assets/img/logo.png"
                class="header-brand-img desktop-logo"
                alt="logo"
              />
            </div>
            <!-- <div class="d-flex  align-items-center ps-3">
              <img
                src="../../../../src/assets/img/Maskroup.png"
                class="img-logo"
                alt="logo"
              />
        
              <div class="m-1">
                <a class="btn-visit btn" href="https://x5smart.com" target="_blank">زيارة المتجر</a>
              </div>
            </div> -->
         
            <ul class="menu-nav nav">
              <li
                class="nav-item"
                v-for="menuItem in MENUITEMS"
                :key="menuItem.title"
                :class="{
                  active: menuItem.defaultActive,
                  show: menuItem.active,
                  'nav-header': menuItem.headTitle,
                }"
                :style="perminlocal.includes(menuItem.name)?'display:block':'display:none'"
              >
              <div 
         >
      <!-- head title  -->
      <span v-if="menuItem.headTitle" class="nav-label">{{
                  menuItem.headTitle
                }}</span>
                <!-- has-Link -->
                <router-link
                  class="nav-link"
                  v-if="menuItem.type === 'link'"
                  :to="menuItem.path"
                  @click="setNavActive(menuItem)"
                >
                  <span class="shape1"></span>
                  <span class="shape2"></span>
                  <div class="pos-relative">
                    <i :class="menuItem.icon + ' sidemenu-icon menu-icon'"></i>
                    <span v-if="menuItem.notifications&&localStorageValue>0" class="notification-badge">
                      {{  localStorageValue }}
                    </span>
                  </div>
                
                  <span class="sidemenu-label">{{ menuItem.title }}</span>

                </router-link>
                <!-- has-empty -->
                <a
                  class="nav-link"
                  to=""
                  v-if="menuItem.type === 'empty'"
                  @click="toggleNavActive(menuItem)"
                >
                  <span class="shape1"></span>
                  <span class="shape2"></span>
                  <i :class="menuItem.icon + ' sidemenu-icon menu-icon'"></i>
                  <span class="sidemenu-label">{{ menuItem.title }}</span>
                </a>
                <!-- has-Sub -->
                <router-link
                  class="nav-link with-sub"
                  to=""
                  :class="{ active: menuItem.active }"
                  v-if="menuItem.type === 'sub'"
                  @click="toggleNavActive(menuItem)"
                >
                  <span class="shape1"></span>
                  <span class="shape2"></span>
                  <i :class="menuItem.icon + ' sidemenu-icon menu-icon'"></i>
                  <span class="sidemenu-label">{{ menuItem.title }}</span>
                  <span
                    :class="'badge ' + menuItem.badgeClass + ' side-badge'"
                    v-if="menuItem.badgeClass && menuItem.badgeValue"
                  >
                    {{ menuItem.badgeValue }}
                  </span>
                  <i
                    class="angle fe fe-chevron-right"
                    :class="{ 'd-none': menuItem.badgeClass }"
                  ></i>
                </router-link>

                <!-- 2nd Level menu -->
                <ul
                  class="nav-sub"
                  v-if="menuItem.children"
                  :class="{ open: menuItem.active, active: menuItem.active }"
                >
                  <li
                    class="nav-sub-item"
                    v-for="childrenItem in menuItem.children"
                    :key="childrenItem.children"
                    :class="{
                      show: childrenItem.active,
                      active: childrenItem.defaultActive,
                    }"
                  >
                    <!-- link -->
                    <router-link
                      class="nav-sub-link"
                      :class="{ active: childrenItem.active }"
                      :to="childrenItem.path"
                      v-if="childrenItem.type === 'link'"
                      @click="setNavActive(childrenItem)"
                    >
                      {{ childrenItem.title }}
                    </router-link>
                    <!-- empty -->
                    <a
                      class="nav-sub-link"
                      href="javascript:;"
                      v-if="childrenItem.type === 'empty'"
                      :class="{
                        show: childrenItem.active,
                        active: childrenItem.active,
                      }"
                    >
                      {{ childrenItem.title }}
                    </a>

                    <!-- sub -->
                    <router-link
                      class="nav-sub-link sub-with-sub"
                      :class="{ active: childrenItem.active }"
                      to=""
                      v-if="childrenItem.type === 'sub'"
                      @click="toggleNavActive(childrenItem)"
                    >
                      <span class="sidemenu-label">{{
                        childrenItem.title
                      }}</span>
                      <i class="angle fe fe-chevron-right"></i>
                    </router-link>

                    <!-- 3rd Level menu -->
                    <ul
                      class="sub-nav-sub"
                      v-if="childrenItem.children"
                      :class="{ open: childrenItem.active }"
                    >
                      <li
                        class="nav-sub-item"
                        v-for="childrenSubItem in childrenItem.children"
                        :key="childrenSubItem.title"
                        :class="{
                          show: childrenSubItem.active,
                          active: childrenSubItem.defaultActive,
                        }"
                      >
                        <!-- link -->
                        <router-link
                          class="nav-sub-link"
                          :class="{ active: childrenSubItem.active }"
                          :to="childrenSubItem.path"
                          v-if="childrenSubItem.type === 'link'"
                          @click="setNavActive(childrenSubItem)"
                        >
                          {{ childrenSubItem.title }}
                        </router-link>
                        <!-- empty -->
                        <a
                          class="nav-sub-link"
                          to="javascript:;"
                          v-if="childrenSubItem.type === 'empty'"
                        >
                          {{ childrenSubItem.title }}a
                        </a>
                        <!-- sub -->
                        <router-link
                          class="nav-sub-link sub-with-sub"
                          :to="childrenSubItem.path"
                          v-if="childrenSubItem.type === 'sub'"
                          @click="toggleNavActive(childrenSubItem)"
                        >
                          <span class="sidemenu-label">{{
                            childrenSubItem.title
                          }}</span>
                          <i class="angle fe fe-chevron-right"></i>
                        </router-link>

                        <!-- 4th level -->
                        <ul
                          class="sub-nav-sub"
                          v-if="childrenSubItem.children"
                          :class="{ open: childrenSubItem.active }"
                        >
                          <!-- link  -->
                          <li
                            class="nav-sub-item"
                            v-for="childrenSubItem1 in childrenSubItem.children"
                            :key="childrenSubItem1.title"
                            :class="{
                              show: childrenSubItem1.active,
                              active: childrenSubItem1.defaultActive,
                            }"
                          >
                            <a
                              class="nav-sub-link"
                              :class="{ active: childrenSubItem1.active }"
                              :to="childrenSubItem1.path"
                              v-if="childrenSubItem1.type === 'link'"
                            >
                              {{ childrenSubItem1.title }}
                            </a>
                            <!---empty-->
                            <a
                              class="nav-sub-link"
                              to=""
                              v-if="childrenSubItem1.type === 'empty'"
                            >
                              {{ childrenSubItem1.title }}
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
          
              </li>
            </ul>
            <!-- right-arrow  -->
            <div class="slide-right" id="slide-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import crudDataService from '../../../Services/crudDataService';
import NotificationUpdater from '../../../components/Contact/Contact.vue';
import { ref, onMounted, onUnmounted } from 'vue';
// import Switcher from "../Switcher/Switcher.vue";
//MenuStart
const menu_items = [
  // {
  //   headTitle: "dashboard",
  // },
  {
    path: `${import.meta.env.BASE_URL}dashboard`,
    title: "الرئيسية",
    type: "link",
    icon: "typcn typcn-home",
    active: true,
    defaultActive: true,
    name:'statistics-index'
  },
  {
    path: `${import.meta.env.BASE_URL}products`,
    title: "المنتجات",
    type: "link",
    icon: "ti-credit-card",
    active: true,
    defaultActive: false,
    name:'products-index'
  },
  {
    path: `${import.meta.env.BASE_URL}category`,
    title: "الأقسام",
    type: "link",
    icon: "ti-package",
    active: true,
    defaultActive: false,
    name: "categories-index"

  },
  {
    path: `${import.meta.env.BASE_URL}vendors`,
    title: "البائعين",
    type: "link",
    icon: "ti-archive",
    active: true,
    defaultActive: false,
    name: "vendors-index"

  },
  {
    path: `${import.meta.env.BASE_URL}stores`,
    title: "المتاجر",
    type: "link",
    icon: "fas fa-store",
    active: true,
    defaultActive: false,
    name: "stores-index"

  },
  // {
  //   path: `${import.meta.env.BASE_URL}tags`,
  //   title: "الوسوم",
  //   type: "link",
  //   icon: "ion-pricetag",
  //   active: true,
  //   defaultActive: false,
  //   name:'tags-index'
  // },
  // {
  //   path: `${import.meta.env.BASE_URL}brands`,
  //   title: "الماركات",
  //   type: "link",
  //   icon: "ti-medall",
  //   active: true,
  //   defaultActive: false,
  //   name:'brands-index'
  // },
  {
    path: `${import.meta.env.BASE_URL}ordering`,
    title: "الطلبات",
    type: "link",
    icon: "fe fe-shopping-bag",
    active: true,
    defaultActive: false,
    name:'orders-index'
  },
  {
    path: `${import.meta.env.BASE_URL}customer`,
    title: "العملاء",
    type: "link",
    icon: "mdi mdi-account-plus",
    active: true,
    defaultActive: false,
    name:'users-index'
  },
  {
    path: `${import.meta.env.BASE_URL}reports`,
    title: "التقارير",
    type: "link",
    icon: "fa fa-bar-chart",
    active: true,
    defaultActive: false,
    name:'reports-index'
  },
  {
    path: `${import.meta.env.BASE_URL}question`,
    title: "الأسئلة والتقيمات",
    type: "link",
    icon: "ti-comment-alt",
    active: true,
    defaultActive: false,
    name:'questions-index'
  },
  {
    path: `${import.meta.env.BASE_URL}definition`,
    title: "الصفحات التعريفية ",
    type: "link",
    icon: "ion-document-text",
    active: true,
    defaultActive: false,
    name:'pages-index'
  },
  {
    'headTitle': "التسويق",
  },
  {
    path: `${import.meta.env.BASE_URL}discount`,
    title: "كوبونات التخفيض ",
    type: "link",
    icon: "fas fa-ticket-alt",
    active: true,
    defaultActive: false,
    name:'coupons-index'
  },
  {

    path: `${import.meta.env.BASE_URL}offer`,
    title: "العروض",
    type: "link",
    icon: "pe-7s-diamond",
    active: true,
    defaultActive: false,
    name:"offers-index"
  },
  // {
  //   path: `${import.meta.env.BASE_URL}marketing`,
  //   title: "الحملات التسويقية",
  //   type: "link",
  //   icon: "zmdi zmdi-mail-send",
  //   active: true,
  //   defaultActive: false,
  // },
   {
    path: `${import.meta.env.BASE_URL}basket`,
    title: "السلات المتروكة",
    type: "link",
    icon: "zmdi zmdi-mall",
    active: true,
    defaultActive: false,
    name:'cart_reminders-index'
  },

  {
    'headTitle': "الإعدادات",
  },

  {
    path: `${import.meta.env.BASE_URL}notification`,
    title: "الاشعارات",
    type: "link",
    icon: "si si-bell",
    active: true,
    defaultActive: false,
    name:'special-offer-index'
    }, 
       {
    path: `${import.meta.env.BASE_URL}contact`,
    title: "للتواصل",
    type: "link",
    icon: "si si-envelope-letter",
    active: true,
    defaultActive: false,
    notifications: 1,
    name:'contacts-index'
    },
  {
    path: `${import.meta.env.BASE_URL}sliders`,
    title: "اسلايدر",
    type: "link",
    icon: "typcn typcn-code-outline",
    active: true,
    defaultActive: false,
    name:'sliders-index'
  },  
  {
    path: `${import.meta.env.BASE_URL}setting`,
    title: "الإعدادات",
    type: "link",
    icon: "fe fe-settings",
    active: true,
    defaultActive: false,
    name:"settings-index"
  },
  {
    'headTitle': "الادارة",
  },
  {
    path: `${import.meta.env.BASE_URL}admins`,
    title: "المسئولين",
    type: "link",
    icon: "fe fe-users",
    active: true,
    defaultActive: false,
    name:'admins-index'
  },
  {
    path: `${import.meta.env.BASE_URL}roles`,
    title: "الادوار",
    type: "link",
    icon: "fe fe-life-buoy",
    active: true,
    defaultActive: false,
    name:'roles-index'
  },
  {
    path: `${import.meta.env.BASE_URL}payment`,
    title: "طرق الدفع",
    type: "link",
    icon: "ti-wallet",
    active: true,
    defaultActive: false,
    name:'payment_methods-index'
  },
  {
    path: `${import.meta.env.BASE_URL}delivery`,
    title: "التوصيل",
    type: "link",
    icon: "fa fa-truck",
    active: true,
    defaultActive: false,
    name: "deliveries-index"

  },
  {
    path: `${import.meta.env.BASE_URL}delivery_options`,
    title: "خيارات التوصيل",
    type: "link",
    icon: "fa fa-filter",
    active: true,
    defaultActive: false,
    name: "delivery_options-index"

  },
  {
    path: `${import.meta.env.BASE_URL}withdrawal-requests`,
    title: " طلبات السحب",
    type: "link",
    icon: "fa fa-money",
    active: true,
    defaultActive: false,
    name: "withdrawal-requests-index"

  },
];

//MenuEnd
export default {
  name: "Sidebar",
  components:{
    NotificationUpdater
  },
  data() {
    return {
      url: import.meta.env.BASE_URL,
      MENUITEMS: menu_items,
      logo:'',
      notificationCount:'',
      notifications:[],
    perminlocal : localStorage.getItem('permissions')

    };
  },
  setup() {
    // Reactive property for storing the current value
    const localStorageValue = ref(localStorage.getItem('notificationCount') || '');

    // Function to poll localStorage for changes
    const pollLocalStorage = () => {
      const currentValue = localStorage.getItem('notificationCount');
      if (localStorageValue.value !== currentValue) {
        localStorageValue.value = currentValue;
      }
    };

    // Polling interval
    let pollingInterval = null;

    onMounted(() => {
      // Start polling
      pollingInterval = setInterval(pollLocalStorage, 1000); // Poll every 1000ms (1 second)
    });

    onUnmounted(() => {
      // Clear interval when component is unmounted
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    });

    return {
      localStorageValue,
    };
  },

  methods: {
   
    async getlogo() {
    let res = await crudDataService.getAll(
        `settings`
      );
      res.data.data.forEach(element => {
        if (element.key==='logo') {
          this.logo=element.image
        }
      });
    },
    async getContact() {
      const res = await crudDataService.getAll("contacts");
      this.items = res.data.data.data;   
      console.log(res.data.data.data);  
      this.notifications=[]
      res.data.data.data.forEach((element) => {

        if (element.is_seen===0) {
          this.notifications.push(element);
localStorage.setItem('notificationCount', this.notifications.length);

        }
      });
    },

    setNavActive(item) {
      this.MENUITEMS.filter((menuItem) => {
        if (menuItem !== item) {
          menuItem.active = false;
          menuItem.defaultActive = false;
          this.MENUITEMS.collapseSidebar = false;
        }
        if (menuItem.children && !menuItem.children.includes(item)) {
          menuItem.active = false;
          menuItem.defaultActive = false;
        }
        if (menuItem.children) {
          menuItem.children.filter((submenuItems) => {
            if (submenuItems.children) {
              submenuItems.children.forEach((subsubmenuItems) => {
                if (
                  subsubmenuItems.children &&
                  !subsubmenuItems.children.includes(item)
                ) {
                  menuItem.active = false;
                  submenuItems.active = false;
                  subsubmenuItems.active = false;
                  menuItem.defaultActive = false;
                  submenuItems.defaultActive = false;
                  subsubmenuItems.defaultActive = false;
                }
                if (subsubmenuItems !== item) {
                  subsubmenuItems.active = false;
                  subsubmenuItems.defaultActive = false;
                }
              });
              submenuItems.children.forEach((subsubmenuItems) => {
                if (
                  subsubmenuItems.children &&
                  subsubmenuItems.children.includes(item)
                ) {
                  menuItem.active = true;
                  submenuItems.active = true;
                  subsubmenuItems.active = true;
                  menuItem.defaultActive = true;
                  submenuItems.defaultActive = true;
                  subsubmenuItems.defaultActive = true;
                }
                if (subsubmenuItems === item) {
                  subsubmenuItems.active = true;
                  subsubmenuItems.defaultActive = true;
                }
              });
            }
            if (submenuItems === item) {
              submenuItems.active = true;
              submenuItems.defaultActive = true;
            }
            if (submenuItems !== item) {
              submenuItems.active = false;
              submenuItems.defaultActive = false;
            }

            if (submenuItems.children && submenuItems.children.includes(item)) {
              menuItem.active = true;
              submenuItems.active = true;
              menuItem.defaultActive = true;
              submenuItems.defaultActive = true;
            }
          });
        }

        if (menuItem === item) {
          menuItem.active = true;
          menuItem.defaultActive = true;
        }
        if (menuItem.children && menuItem.children.includes(item)) {
          menuItem.active = true;
          menuItem.defaultActive = true;
        }
        this.MENUITEMS;
      });
      if (
        document.body.classList.contains("horizontalmenu-hover") &&
        window.innerWidth >= 992
      ) {
        this.closeNavActive();
      }
    },
    // Toggle menu
    toggleNavActive(item) {
      if (
        !document.body.classList.contains("horizontalmenu-hover") ||
        window.innerWidth < 992
      ) {
        if (!item.active) {
          this.MENUITEMS.forEach((a) => {
            if (this.MENUITEMS.includes(item)) {
              a.active = false;
            }
            if (!a.children) {
              return false;
            }
            a.children.forEach((b) => {
              if (a.children.includes(item)) {
                b.active = false;
              }
              if (!b.children) {
                return false;
              }
              b.children.forEach((c) => {
                if (b.children.includes(item)) {
                  c.active = false;
                }
                if (!c.children) {
                  return false;
                }
                return;
              });
              return;
            });
            return;
          });

          item.active = !item.active;
        } else {
          if (item.type == "sub") {
            item.active = !item.active;
          }
        }
      }
    },
    // Close Nav menu
    closeNavActive() {
      this.MENUITEMS.forEach((a) => {
        if (this.MENUITEMS) {
          a.active = false;
        }
        if (!a.children) {
          return false;
        }
        a.children.forEach((b) => {
          if (a.children) {
            b.active = false;
          }
        });
        return;
      });
    },

    MovetoChatpage() {
      this.$router.replace({ path: `${import.meta.env.BASE_URL}` });
    },
    showInfoBar() {
      if (document.body.classList.contains("main-sidebar-hide")) {
        document.body.classList.add("main-sidebar-open");
      }
    },
    hideInfoBar() {
      document.body.classList.remove("main-sidebar-open");
    },
  },
  mounted(){
    this.getContact()
    this.getlogo();
  }
};
</script>

<style scoped lang="scss">
.main-sidebar-header {


.btn-visit{
    width: 120px;
    height: 35px;
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    border-radius: 7px;
    margin-right: 15px;
}
}
.img-logo{
  width: 60px;
    height: 60px;
}
.notification-badge {
  background-color: red;
  color: white;
    border-radius: 50%;
    padding: 2px 8px;
    font-size: 0.75rem;
    margin-left: 8px;
    top: -6px;
    position: absolute;
    right: 16px;
  }

</style>