<template>
  <div class="edit">
    <quillEditor></quillEditor>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  export default {
    name: 'edit',
    data(){
      return {}
    },
    created(){},
    mounted(){},
    destroyed(){},
    methods: {},
    components: {
      quillEditor
    }
  }
</script>

<style lang="scss" scoped>
  .edit{
    padding: 10px;
    .quill-editor{
      background: #fff;
    }
  }
</style>