(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c3e15da8"],{1658:function(e,t,l){},2033:function(e,t,l){"use strict";var a=l("71cf"),i=l.n(a);i.a},"2b92":function(e,t,l){"use strict";var a=l("1658"),i=l.n(a);i.a},4397:function(e,t,l){"use strict";var a={linkTypes:[{value:"0",label:"全部"},{value:"1",label:"技术"},{value:"2",label:"生活"},{value:"3",label:"购物"},{value:"4",label:"前端"},{value:"5",label:"设计"},{value:"6",label:"项目"},{value:"7",label:"小程序"},{value:"8",label:"后端"},{value:"9",label:"友链"},{value:"10",label:"社区"}],userTypes:[{value:"0",label:"全部"},{value:"1",label:"用户"},{value:"2",label:"管理员"},{value:"3",label:"超级管理员"}],articleTypes:[{value:"0",label:"全部"},{value:"1",label:"技术"},{value:"2",label:"生活"}],articleTags:[{value:"0",label:"全部"},{value:"1",label:"css3"},{value:"2",label:"sass/less"},{value:"3",label:"html5"},{value:"4",label:"javascript"},{value:"5",label:"es6"},{value:"6",label:"canvas"},{value:"7",label:"pixijs"},{value:"8",label:"createjs"},{value:"9",label:"vue"},{value:"10",label:"vuex"},{value:"11",label:"vue-router"},{value:"12",label:"nuxt"},{value:"13",label:"微信小程序"},{value:"14",label:"wepy"},{value:"15",label:"uniapp"},{value:"16",label:"hybird app"},{value:"17",label:"nginx"},{value:"18",label:"webpack"},{value:"19",label:"express"},{value:"20",label:"koa2"},{value:"21",label:"nodejs"},{value:"22",label:"mongodb"},{value:"23",label:"人生"},{value:"24",label:"随记"},{value:"25",label:"情感"},{value:"26",label:"生活"},{value:"27",label:"工作"},{value:"28",label:"旅游"},{value:"29",label:"烹饪"},{value:"30",label:"运动"},{value:"31",label:"电影"},{value:"32",label:"音乐"},{value:"33",label:"游戏"},{value:"34",label:"足球"},{value:"35",label:"感悟"},{value:"36",label:"爱情"},{value:"37",label:"哲学"},{value:"38",label:"社交"},{value:"39",label:"心得体会"},{value:"40",label:"吃喝玩乐"}]};t["a"]=a},"71cf":function(e,t,l){},8256:function(e,t,l){"use strict";var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"tinymce-container",class:{fullscreen:e.fullscreen},style:{width:e.containerWidth}},[l("textarea",{staticClass:"tinymce-textarea",attrs:{id:e.tinymceId}}),l("div",{staticClass:"editor-custom-btn-container"},[l("editorImage",{staticClass:"editor-upload-btn",attrs:{color:"#1890ff"},on:{successCBK:e.imageSuccessCBK}})],1)])},i=[],s=(l("ac6a"),l("c5f6"),function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"upload-container"},[l("el-dialog",{attrs:{title:"内容图片上传",visible:e.uploadDialog,width:"50%","close-on-click-modal":!1},on:{"update:visible":function(t){e.uploadDialog=t}}},[l("div",{staticClass:"upload-box"},[l("el-upload",{ref:"upload",staticClass:"editor-upload",attrs:{action:"",multiple:!0,"file-list":e.fileList,"show-file-list":!0,limit:10,accept:".jpg, .jpeg, .png","list-type":"picture-card","http-request":e.handleUpload,"auto-upload":!0,"before-upload":e.beforeUpload,"on-preview":e.handlePreview,"on-remove":e.handleRemove,"on-exceed":e.handleExceed}},[l("i",{staticClass:"el-icon-plus"}),l("div",{attrs:{slot:"tip"},slot:"tip"},[e._v("文件格式必须是 jpg 、png 或 jpeg，每次只能同时上传5张，且每张不超过 500kb的图片。")]),l("el-dialog",{attrs:{visible:e.previewInUploadDialog,width:"35%","append-to-body":""},on:{"update:visible":function(t){e.previewInUploadDialog=t}}},[l("div",{staticStyle:{"text-align":"center"}},[l("img",{staticStyle:{display:"inline-block",width:"auto","max-width":"100%",height:"600px"},attrs:{src:e.previewPic,alt:""}})])])],1)],1),l("el-button",{on:{click:function(t){e.uploadDialog=!1}}},[e._v("\n      取 消\n    ")]),l("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("\n      确 定\n    ")])],1)],1)}),n=[],r=(l("7f7f"),l("456d"),{name:"EditorSlideUpload",props:{color:{type:String,default:"#1890ff"}},data:function(){return{previewDialog:!1,uploadDialog:!1,listObj:{},fileList:[],fileArray:[],formData:null,previewInUploadDialog:!1,previewPic:""}},methods:{checkAllSuccess:function(){var e=this;return Object.keys(this.listObj).every(function(t){return e.listObj[t].hasSuccess})},handleSubmit:function(){var e=this,t=Object.keys(this.listObj).map(function(t){return e.listObj[t]});this.checkAllSuccess()?(this.$emit("successCBK",t),this.listObj={},this.fileList=[],this.uploadDialog=!1):this.$message("请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！")},handlePreview:function(e){this.previewPic=e.url,this.previewDialog=!0},handleExceed:function(e,t){this.$message({message:"上传选择图片数太多啦~",type:"warning"})},handleRemove:function(e){console.log(e);for(var t=e.uid,l=Object.keys(this.listObj),a=0,i=l.length;a<i;a++)if(this.listObj[l[a]].uid===t)return console.log(this.listObj[l[a]]),this.$store.dispatch("article/removeArticlePics",{url:this.listObj[l[a]].preUrl}).then(function(e){console.log(e)}),void delete this.listObj[l[a]]},handleUpload:function(e){var t=this;console.log(this.$refs.upload);var l=new FormData;l.append("file",e.file),console.log(this.$refs.upload.uploadFiles),this.$store.dispatch("article/uploadArticlePics",l).then(function(l){console.log(l),l.success&&(t.listObj[e.file.uid].url="".concat(t.reUrl).concat(l.data[0].url),t.listObj[e.file.uid].preUrl=l.data[0].url,t.listObj[e.file.uid].hasSuccess=!0)})},beforeUpload:function(e){var t=this;return e.size>5e5?(this.$message({message:"文件".concat(e.name,"太大，不能超过 500kb"),type:"warning"}),!1):new Promise(function(l,a){console.log(1),t.formData=new FormData,t.listObj[e.uid]={hasSuccess:!1,uid:e.uid,width:t.width,height:t.height},l(!0)})}}}),o=r,c=(l("2b92"),l("2877")),u=Object(c["a"])(o,s,n,!1,null,"1400d721",null),d=u.exports,m=["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"],h=m,p=["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample","hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],v=p,b=(l("ac4d"),l("8a81"),[]);function f(){return window.tinymce}var g=function(e,t){var l=document.getElementById(e),a=t||function(){};if(!l){var i=document.createElement("script");i.src=e,i.id=e,document.body.appendChild(i),b.push(a);var s="onload"in i?n:r;s(i)}function n(t){t.onload=function(){this.onerror=this.onload=null;for(var e=0,l=b;e<l.length;e++){var a=l[e];a(null,t)}b=null},t.onerror=function(){this.onerror=this.onload=null,a(new Error("Failed to load "+e),t)}}function r(e){e.onreadystatechange=function(){if("complete"===this.readyState||"loaded"===this.readyState){this.onreadystatechange=null;var t=!0,l=!1,a=void 0;try{for(var i,s=b[Symbol.iterator]();!(t=(i=s.next()).done);t=!0){var n=i.value;n(null,e)}}catch(r){l=!0,a=r}finally{try{t||null==s.return||s.return()}finally{if(l)throw a}}b=null}}}l&&a&&(f()?a(null,l):b.push(a))},y=g,w="https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js",x={name:"Tinymce",components:{editorImage:d},props:{id:{type:String,default:function(){return"vue-tinymce-"+ +new Date+(1e3*Math.random()).toFixed(0)}},value:{type:String,default:""},toolbar:{type:Array,required:!1,default:function(){return[]}},menubar:{type:String,default:"file edit insert view format table"},height:{type:[Number,String],required:!1,default:360},width:{type:[Number,String],required:!1,default:"auto"}},data:function(){return{hasChange:!1,hasInit:!1,tinymceId:this.id,fullscreen:!1,languageTypeList:{en:"en",zh:"zh_CN"}}},computed:{containerWidth:function(){var e=this.width;return/^[\d]+(\.[\d]+)?$/.test(e)?"".concat(e,"px"):e}},watch:{value:function(e){var t=this;!this.hasChange&&this.hasInit&&this.$nextTick(function(){return window.tinymce.get(t.tinymceId).setContent(e||"")})}},mounted:function(){this.init()},activated:function(){window.tinymce&&this.initTinymce()},deactivated:function(){this.destroyTinymce()},destroyed:function(){this.destroyTinymce()},methods:{init:function(){var e=this;y(w,function(t){t?e.$message.error(t.message):e.initTinymce()})},initTinymce:function(){var e=this,t=this;window.tinymce.init({selector:"#".concat(this.tinymceId),language:this.languageTypeList["zh"],height:this.height,body_class:"panel-body ",object_resizing:!1,toolbar:this.toolbar.length>0?this.toolbar:v,menubar:this.menubar,plugins:h,end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,advlist_bullet_styles:"square",advlist_number_styles:"default",imagetools_cors_hosts:["www.tinymce.com","codepen.io"],default_link_target:"_blank",link_title:!1,nonbreaking_force_tab:!0,init_instance_callback:function(l){t.value&&l.setContent(t.value),t.hasInit=!0,l.on("NodeChange Change KeyUp SetContent",function(){e.hasChange=!0,e.$emit("input",l.getContent())})},setup:function(e){e.on("FullscreenStateChanged",function(e){t.fullscreen=e.state})}})},destroyTinymce:function(){var e=window.tinymce.get(this.tinymceId);this.fullscreen&&e.execCommand("mceFullScreen"),e&&e.destroy()},setContent:function(e){window.tinymce.get(this.tinymceId).setContent(e)},getContent:function(){window.tinymce.get(this.tinymceId).getContent()},imageSuccessCBK:function(e){var t=this;e.forEach(function(e){window.tinymce.get(t.tinymceId).insertContent('<img class="wscnph" src="'.concat(e.url,'" >'))})}}},k=x,F=(l("ac48"),Object(c["a"])(k,a,i,!1,null,"423ae1f8",null));t["a"]=F.exports},"8aad":function(e,t,l){},a952:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"create"},[l("div",{staticClass:"v-container"},[l("div",{staticClass:"v-header"},[l("el-row",[l("el-col",{attrs:{xs:24,sm:18,md:18,lg:18,xl:18}},[l("span",[e._v("作者：")]),l("el-input",{attrs:{placeholder:"请输入标题",clearable:"",size:"small"},model:{value:e.articleForm.title,callback:function(t){e.$set(e.articleForm,"title",t)},expression:"articleForm.title"}})],1)],1),l("el-row",[l("el-col",{attrs:{xs:24,sm:18,md:18,lg:18,xl:18}},[l("span",[e._v("描述：")]),l("el-input",{attrs:{placeholder:"请输入描述",type:"textarea",rows:2,clearable:"",size:"small"},model:{value:e.articleForm.desc,callback:function(t){e.$set(e.articleForm,"desc",t)},expression:"articleForm.desc"}})],1)],1),l("el-row",{attrs:{gutter:10}},[l("el-col",{attrs:{xs:6,sm:4,md:4,lg:5,xl:4}},[l("span",[e._v("作者：")]),l("el-input",{attrs:{placeholder:"请输入作者",clearable:"",size:"small"},model:{value:e.articleForm.author,callback:function(t){e.$set(e.articleForm,"author",t)},expression:"articleForm.author"}})],1),l("el-col",{attrs:{xs:6,sm:4,md:4,lg:5,xl:4}},[l("span",[e._v("分类：")]),l("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:"请选择文章类别",size:"small"},model:{value:e.articleForm.type,callback:function(t){e.$set(e.articleForm,"type",t)},expression:"articleForm.type"}},e._l(e.articleTypes,function(e,t){return l("el-option",{directives:[{name:"show",rawName:"v-show",value:0!==t,expression:"index !== 0"}],key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),l("el-col",{attrs:{xs:12,sm:10,md:10,lg:10,xl:8}},[l("span",[e._v("标签：")]),l("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"",clearable:"",placeholder:"请选择文章标签",size:"small"},model:{value:e.articleForm.tag,callback:function(t){e.$set(e.articleForm,"tag",t)},expression:"articleForm.tag"}},e._l(e.articleTags,function(e){return l("el-option",{directives:[{name:"show",rawName:"v-show",value:"0"!==e.value,expression:"item.value !== '0'"}],key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),l("el-row",[l("el-col",{attrs:{xs:12,sm:8,md:8,lg:6,xl:3}},[l("span",[e._v("状态：")]),l("div",{staticStyle:{"padding-top":"10px"}},[l("el-radio",{attrs:{label:"1",size:"small"},model:{value:e.articleForm.state,callback:function(t){e.$set(e.articleForm,"state",t)},expression:"articleForm.state"}},[e._v("发布")]),l("el-radio",{attrs:{label:"2",size:"small"},model:{value:e.articleForm.state,callback:function(t){e.$set(e.articleForm,"state",t)},expression:"articleForm.state"}},[e._v("草稿")])],1)]),l("el-col",{attrs:{xs:12,sm:8,md:8,lg:6,xl:3}},[l("span",[e._v("权限：")]),l("div",{staticStyle:{"padding-top":"10px"}},[l("el-radio",{attrs:{label:"1",size:"small"},model:{value:e.articleForm.publish,callback:function(t){e.$set(e.articleForm,"publish",t)},expression:"articleForm.publish"}},[e._v("公开")]),l("el-radio",{attrs:{label:"2",size:"small"},model:{value:e.articleForm.publish,callback:function(t){e.$set(e.articleForm,"publish",t)},expression:"articleForm.publish"}},[e._v("私密")])],1)])],1),l("el-row",{attrs:{gutter:6}},[l("el-col",{attrs:{xs:8,sm:8,md:8,lg:6,xl:4}},[l("span",[e._v("点赞数：")]),l("el-input-number",{attrs:{min:0,max:1e8,label:"请输入点赞数","controls-position":"right",size:"small"},on:{change:e.handleChange},model:{value:e.articleForm.likes,callback:function(t){e.$set(e.articleForm,"likes",t)},expression:"articleForm.likes"}})],1),l("el-col",{attrs:{xs:8,sm:8,md:8,lg:6,xl:4}},[l("span",[e._v("吐槽数：")]),l("el-input-number",{attrs:{min:0,max:1e8,label:"请输入吐槽数","controls-position":"right",size:"small"},on:{change:e.handleChange},model:{value:e.articleForm.dislikes,callback:function(t){e.$set(e.articleForm,"dislikes",t)},expression:"articleForm.dislikes"}})],1),l("el-col",{attrs:{xs:8,sm:8,md:8,lg:6,xl:4}},[l("span",[e._v("浏览数：")]),l("el-input-number",{attrs:{min:0,max:1e8,label:"请输入浏览数","controls-position":"right",size:"small"},on:{change:e.handleChange},model:{value:e.articleForm.views,callback:function(t){e.$set(e.articleForm,"views",t)},expression:"articleForm.views"}})],1)],1),l("el-row",[l("el-col",{staticStyle:{display:"flex","align-items":"center"},attrs:{span:24}},[l("span",[e._v("缩略图：")]),l("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","auto-upload":!0,"show-file-list":!1,accept:".jpg, .jpeg, .png",limit:1,"before-upload":e.beforeThumbUpload,size:"small"}},[e.thumbImgUrl?l("div",{class:["avatar-box",{hover:e.thumbImgHover}],on:{mouseenter:function(t){e.thumbImgHover=!0},mouseleave:function(t){e.thumbImgHover=!1}}},[l("img",{staticClass:"avatar",attrs:{src:e.thumbImgUrl}}),e.thumbImgHover?l("div",{staticClass:"imgHoverBtns"},[l("i",{staticClass:"el-icon-zoom-in",on:{click:function(t){t.stopPropagation(),e.thumbVisible=!0}}}),l("i",{staticClass:"el-icon-delete",on:{click:function(t){return t.stopPropagation(),e.handleThumbRemove(t)}}})]):e._e()]):l("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e.winWidth>500?l("ul",{staticClass:"upload-tip"},[l("li",[e._v("每次只能上传1张图片。")]),l("li",[e._v("每张图片大小不超过 200kb。")]),l("li",[e._v("文件必须是 jpg 、png 或 jpeg 格式的图片。")])]):e._e(),l("el-dialog",{attrs:{visible:e.thumbVisible,width:e.winWidth<500?"90%":e.winWidth<1200?"60%":"35%"},on:{"update:visible":function(t){e.thumbVisible=t}}},[l("div",{staticStyle:{"text-align":"center"}},[l("img",{staticStyle:{display:"inline-block",width:"auto","max-width":"100%",height:"600px"},attrs:{src:e.thumbImgUrl,alt:""}})])])],1)],1)],1),l("div",{staticClass:"v-body"},[l("el-row",[l("tinymce",{attrs:{height:460},model:{value:e.articleForm.content,callback:function(t){e.$set(e.articleForm,"content",t)},expression:"articleForm.content"}})],1)],1),l("div",{staticClass:"v-footer"},[l("el-row",[l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.handleSubmit}},[e._v("保存")])],1)],1)])])},i=[],s=(l("ac4d"),l("8a81"),l("ac6a"),l("7f7f"),l("8256")),n=l("4397"),r={name:"create",data:function(){var e=n["a"].articleTypes,t=n["a"].articleTags;return{articleTypes:e,articleTags:t,articleForm:{title:"",desc:"",author:"admin",type:"",tag:[],state:"1",publish:"1",content:"",views:0,likes:0,dislikes:0,comments:0},fileObj:null,thumbImgUrl:"",thumbVisible:!1,thumbImgHover:!1}},computed:{},created:function(){},mounted:function(){},destroyed:function(){},methods:{handleChange:function(){},handleThumbRemove:function(){this.thumbImgUrl="",this.fileObj=null},beforeThumbUpload:function(e){return e.size>2e5?(this.$message.warning("文件".concat(e.name,"太大，不能超过 200kb")),!1):(this.thumbImgUrl=URL.createObjectURL(e),this.fileObj=e,!1)},handleSubmit:function(){var e=this;if(this.checkArticle()){var t=new FormData;t.append("file",this.fileObj),t.append("title",this.articleForm.title),t.append("desc",this.articleForm.desc),t.append("author",this.articleForm.author),t.append("type",this.articleForm.type),t.append("state",this.articleForm.state),t.append("tag",this.articleForm.tag),t.append("publish",this.articleForm.publish),t.append("content",this.articleForm.content),t.append("views",this.articleForm.views),t.append("likes",this.articleForm.likes),t.append("dislikes",this.articleForm.dislikes),t.append("comments",this.articleForm.comments);var l=[],a=!0,i=!1,s=void 0;try{for(var n,r=this.articleForm.tag[Symbol.iterator]();!(a=(n=r.next()).done);a=!0){var o=n.value,c=!0,u=!1,d=void 0;try{for(var m,h=this.articleTags[Symbol.iterator]();!(c=(m=h.next()).done);c=!0){var p=m.value;o==p.value&&l.push(p.label)}}catch(v){u=!0,d=v}finally{try{c||null==h.return||h.return()}finally{if(u)throw d}}}}catch(v){i=!0,s=v}finally{try{a||null==r.return||r.return()}finally{if(i)throw s}}t.append("tagDesc",l),this.$store.dispatch("article/postArticle",t).then(function(t){t.success?(e.$message.success("发布成功！"),setTimeout(function(){e.$router.push({path:"/article/list"})},500)):e.$message.error(t.msg)})}},checkArticle:function(){return this.articleForm.title.trim()?this.articleForm.desc.trim()?this.articleForm.author.trim()?this.articleForm.type?this.articleForm.tag.length?!!this.articleForm.content.trim()||(this.$message.error("请输入文章内容"),!1):(this.$message.error("请选择文章标签"),!1):(this.$message.error("请选择文章类型"),!1):(this.$message.error("请输入作者"),!1):(this.$message.error("请输入描述"),!1):(this.$message.error("请输入标题"),!1)}},components:{tinymce:s["a"]}},o=r,c=(l("2033"),l("2877")),u=Object(c["a"])(o,a,i,!1,null,"7a146120",null);t["default"]=u.exports},ac48:function(e,t,l){"use strict";var a=l("8aad"),i=l.n(a);i.a}}]);