<!-- eslint-disable prettier/prettier -->
<template>
  <div id="app">

    <!-- Global messages alert -->
    <div><PublicAlert /></div>

    <!-- Screen Wide Spinner -->
    <div><OpenSpinner /></div>

    <!-- Handle all collection changes and save -->
    <div><CollectionChanges /></div>

    <!-- User Invitation banner -->
    <div><UserInvitation /></div>

    <!-- Navigation Bar -->
    <div><NavBar /></div>

    <!-- Collection manager navbar -->
    <ManageCollection />

    <!-- Route view/Pages -->
    <router-view />

    <div><UrlHandler /></div>

    <!-- Footer -->
    <div><FooterSection /></div>
    
  </div>
</template>
<script>
export default {
  components: {
    PublicAlert: () => import("./components/Utilities/PublicAlert.vue"),
    OpenSpinner: () => import("./components/Utilities/OpenSpinner.vue"),
    CollectionChanges: () =>
      import("./components/CollectionManager/CollectionChanges.vue"),
    UrlHandler: () => import("./components/CollectionManager/UrlHandler.vue"),
    ManageCollection: () =>
      import("./components/CollectionManager/AccountManager.vue"),
    UserInvitation: () => import("./components/UserInvitation.vue"),
    NavBar: () => import("./components/NavBar.vue"),
    FooterSection: () => import("./components/Footer.vue"),
  },
};
</script>
