<style lang="less" scoped>
@deep: ~'>>>';
  .message{
    >.ant-row{
      padding: 0 0 20px;
    }
    .ant-divider-horizontal{
      margin: 20px 0;
    }
    .ant-comment{
      @{deep} .ant-comment-inner{
        padding: 0;
      }
      .ant-row{
        margin: 0;
      }
    }
  }
</style>
<template>
  <div class="message container">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-input placeholder="昵称*"/>
      </a-col>
      <a-col :span="8">
        <a-input placeholder="邮箱*"/>
      </a-col>
      <a-col :span="8">
        <a-input placeholder="网址"/>
      </a-col>
    </a-row>
    <!-- <a-row type="flex" justify="end" align="middle">
      sycho
      <a-icon type="setting" style="padding: 0 10px;"/>
      <a-dropdown v-model="dropdownVisible">
        <a class="ant-dropdown-link" href="#"> 设置账户信息 </a>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">编辑信息</a-menu-item>
          <a-menu-item key="2">清空信息</a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-row> -->
    <a-comment>
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" :value="textareaValue" placeholder="愿你的观点与众不同..."></a-textarea>
        </a-form-item>
        <a-form-item style="text-align:right;">
          <a-button html-type="submit" :loading="submitting" @click="handleSubmit" type="primary" icon="smile"> 提交 </a-button>
        </a-form-item>
      </div>
    </a-comment>
    <a-divider dashed />
    <a-row type="flex" justify="space-between" align="middle">
      <a-col>
        <a-tag>100条留言</a-tag>
        <a-tag><a-icon type="like" />100人觉得有点牛逼</a-tag>
        <a-tag color="#f50" @click="onShuang">赏</a-tag>
      </a-col>
      <a-col>
        <a-radio-group default-value="a" button-style="solid">
          <a-radio-button value="a">最新</a-radio-button>
          <a-radio-button value="b">最热</a-radio-button>
        </a-radio-group>
      </a-col>
    </a-row>
    <a-divider>评论区</a-divider>
    <a-comment>
      <!-- <span slot="actions">Reply to</span> -->
      <template slot="actions">
        <span> Windows 7 Chrome | 75 中国  -  杭州 </span>
        <span>
          <a-tooltip title="Like">
            <a-icon
              type="like"
              :theme="action === 'liked' ? 'filled' : 'outlined'"
              @click="like"
            />
          </a-tooltip>
          <span style="padding-left: '8px';cursor: 'auto'">
            {{ likes }}
          </span>
        </span>
        <span>
          <a-tooltip title="Dislike">
            <a-icon
              type="dislike"
              :theme="action === 'disliked' ? 'filled' : 'outlined'"
              @click="dislike"
            />
          </a-tooltip>
          <span style="padding-left: '8px';cursor: 'auto'">
            {{ dislikes }}
          </span>
        </span>
        <span>Reply to</span>
      </template>
      <a slot="author">Han Solo</a>
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
      <p slot="content">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
      <a-tooltip slot="datetime" :title="moment().format('YYYY-MM-DD HH:mm:ss')">
        <span>{{ moment().fromNow() }}</span>
      </a-tooltip>
      <a-comment>
        <span slot="actions">Reply to</span>
        <a slot="author">Han Solo</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
        <p slot="content">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
        <a-comment>
          <span slot="actions">Reply to</span>
          <a slot="author">Han Solo</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <p slot="content">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
        </a-comment>
        <a-comment>
          <span slot="actions">Reply to</span>
          <a slot="author">Han Solo</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <p slot="content">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
        </a-comment>
      </a-comment>
    </a-comment>
    <a-modal
      title="Title"
      v-model="modalVisible"
      :footer="null"
      :maskClosable="true"
      centered
    >
      test
    </a-modal>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'Message',
    head(){
      return { title: '留言墙|Message' }
    },
    data(){
      return {
        dropdownVisible: false,
        likes: 0,
        dislikes: 0,
        action: null,
        moment,
        modalVisible: false,
        submitting: false,
        textareaValue: ''
      }
    },
    computed: {
    },
    methods: {
      like() {
        this.likes = 1
        this.dislikes = 0
        this.action = 'liked'
      },
      dislike() {
        this.likes = 0
        this.dislikes = 1
        this.action = 'disliked'
      },
      onShuang() {
        this.modalVisible = true
      },
      handleMenuClick() {
      },
      handleSubmit() {}
    }
  }
</script>