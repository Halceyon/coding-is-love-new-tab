<template lang="pug">
    div tab
</template>
<script>
  import mappings from '../ext/mappings';
  export default {
    data: () => ({
    }),
    computed: { },
    created () { 
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          console.log(request);
          switch (request.name) {
            case 'nasa': 
              const nasaItems = mappings.nasa(request.items);
              document.body.style.backgroundImage = "url('" + nasaItems[0].imageUrl +"')";
            break;
          }
          sendResponse('thx');          
      });
    },
    mounted () { },
    methods: { }
  }
</script>
<style lang="css">
  body, html {
      height: 100%;
  }
  .bg { 
      /* Full height */
      height: 100%; 

      /* Center and scale the image nicely */
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
  }
</style>