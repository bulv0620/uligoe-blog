<script setup>
import { UploadOutlined, UndoOutlined } from '@ant-design/icons-vue';
import { useUser } from '@/store/useUser';
import { storeToRefs } from 'pinia';
import { onMounted, ref, computed } from 'vue';

const userStore = useUser();
const { userInfo, tempUserInfo: form, oldPwd, newPwd, confirmPwd } = storeToRefs(userStore);

onMounted(() => {
  userStore.clear();
})

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const mode = ref('info')

function onModeChange() {
  mode.value = mode.value === 'info' ? 'pwd' : 'info'
}

async function validatePass(_rule, value) {
  if (value !== newPwd.value) {
    return Promise.reject("请输入相同的密码");
  } else {
    return Promise.resolve();
  }
};
</script>

<template>
  <div class="personal">
    <a-row justify="space-around">
      <a-col :span="12">
        <div class="personal-panel">
          <a-card title="资料卡" :bordered="false">
            <h1><img class="logo" src="../../assets/imgs/logo.png" alt=""></h1>
            <div class="logo-info">
              <div class="name info-item">
                <img src="../../assets/imgs/user_logo.png" alt="">
                <span>{{ userInfo.name }}</span>
              </div>
              <div class="github info-item">
                <img src="../../assets/imgs/github_logo.png" alt="">
                <span>{{ userInfo.github }}</span>
              </div>
              <div class="email info-item">
                <img src="../../assets/imgs/email_logo.png" alt="">
                <span>{{ userInfo.email }}</span>
              </div>
            </div>
            <div class="description">
              {{ userInfo.description }}
            </div>
          </a-card>
        </div>
      </a-col>
      <a-col :span="11">
        <div class="personal-form">
          <a-card title="修改资料" :bordered="false">
            <template #extra>
              <a @click="onModeChange">{{ mode === 'info' ? '修改密码' : '修改资料' }}</a>
            </template>
            <a-form v-if="mode === 'info'" :model="form" @finish="userStore.editUserInfo(form)" v-bind="layout">
              <a-form-item label="昵称" name="name" :rules="[{ required: true, message: '请输入昵称' }]">
                <a-input v-model:value="form.name"></a-input>
              </a-form-item>

              <a-form-item label="生日" name="birthday" :rules="[{ required: true, message: '请输入生日' }]">
                <a-date-picker v-model:value="form.birthday" valueFormat="YYYY-MM-DD" style="width:100%" />
              </a-form-item>

              <a-form-item label="地址" name="address" :rules="[{ required: true, message: '请输入地址' }]">
                <a-input v-model:value="form.address"></a-input>
              </a-form-item>

              <a-form-item label="github" name="github" :rules="[{ required: true, message: '请输入github地址' }]">
                <a-input v-model:value="form.github"></a-input>
              </a-form-item>

              <a-form-item label="wechat" name="wechat" :rules="[{ required: true, message: '请输入wechat账号' }]">
                <a-input v-model:value="form.wechat"></a-input>
              </a-form-item>

              <a-form-item label="email" name="email" :rules="[{ required: true, message: '请输入email地址' }]">
                <a-input v-model:value="form.email"></a-input>
              </a-form-item>

              <a-form-item label="work" name="work" :rules="[{ required: true, message: '请输入工作职务' }]">
                <a-input v-model:value="form.work"></a-input>
              </a-form-item>

              <a-form-item label="描述" name="description">
                <a-textarea v-model:value="form.description" :rows="4"></a-textarea>
              </a-form-item>

              <a-form-item>
                <a-button type="primary" html-type="submit">
                  <template #icon>
                    <UploadOutlined />
                  </template>上传
                </a-button>
                <a-button style="margin-left: 8px" @click="userStore.clear()">
                  <template #icon>
                    <UndoOutlined />
                  </template>还原
                </a-button>
              </a-form-item>
            </a-form>

            <a-form v-else :model="userStore" @finish="userStore.editPwd" v-bind="layout">
              <a-form-item label="旧密码" name="oldPwd" :rules="[{ required: true, message: '请输入旧密码' }]">
                <a-input type="password" v-model:value="oldPwd" placeholder="输入旧的密码"></a-input>
              </a-form-item>

              <a-form-item label="新密码" name="newPwd" :rules="[{ required: true, message: '请输入新密码' }]">
                <a-input type="password" v-model:value="newPwd" placeholder="输入新的密码"></a-input>
              </a-form-item>

              <a-form-item label="确认" name="confirmPwd"
                :rules="[{ required: true, message: '请确认密码' }, { trigger: 'change', validator: validatePass }]">
                <a-input type="password" v-model:value="confirmPwd" placeholder="重复新的密码"></a-input>
              </a-form-item>

              <a-form-item>
                <a-button type="primary" html-type="submit">
                  <template #icon>
                    <UploadOutlined />
                  </template>上传
                </a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style lang='less' scoped>
.personal {
  padding: 24px;

  .personal-panel {
    width: 100%;
    background: #fff;

    h1 {
      text-align: center;

      .logo {
        width: 80px;
      }
    }

    .logo-info {
      margin-top: 18px;
      display: flex;
      justify-content: center;

      .info-item {

        cursor: pointer;
        border-radius: 32px;
        margin: 0 4px;
        padding-right: 8px;
        color: white;

        img {
          width: 32px;
        }

        span {
          margin: 0 4px;
        }
      }

      .email {
        background: rgb(77, 177, 235);
      }

      .github {
        background: rgb(97, 230, 212);
      }

      .name {
        background: rgb(119, 209, 179);
      }
    }

    .description {
      margin-top: 14px;
      text-align: center;
    }
  }

  .personal-form {
    width: 100%;
    background: #fff;
  }
}
</style>