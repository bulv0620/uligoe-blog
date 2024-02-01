<script setup>
import { onMounted, ref, reactive, toRefs } from "vue";
import { message } from "ant-design-vue";
import { useUser } from '@/store/useUser';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const userState = useUser();

const showLogo = ref(false);
onMounted(() => {
    setTimeout(() => {
        showLogo.value = true;
    }, 100);
});


const loginState = reactive({
    username: '',
    password: '',
    loading: false,
})
const { username, password, loading } = toRefs(loginState);

async function login() {
    try {
        loading.value = true;
        await userState.login(username.value, password.value);
        loading.value = false;
        message.success('登录成功');
        let toPath = route.query.redirect;
        if (toPath) {
            router.push(toPath);
        }
        else {
            router.push('/dashboard');
        }
    } catch (e) {
        loading.value = false;
        console.log(e);
        message.error(typeof e === 'string' ? e : e.message);
    }
}

function onFinish() {
    login();
};

function onFinishFailed(errorInfo) {
    message.error(errorInfo.errorFields[0].errors[0])
};

</script>

<template>
    <div class="bg">
        <div class="login-panel">
            <div class="left">
                <h1 class="logo" :class="{ show: showLogo }">uligoe</h1>
            </div>
            <div class="right">
                <h1 class="login-title">登录</h1>
                <a-form class="login-form" :model="loginState" name="login-form" @finish="onFinish"
                    @finishFailed="onFinishFailed">
                    <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名' }]">
                        <a-input type="text" class="form-control" id="username" placeholder="请输入用户名"
                            v-model:value="username" :disabled="loading"></a-input>
                    </a-form-item>
                    <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
                        <a-input type="password" class="form-control" id="password" placeholder="请输入密码"
                            v-model:value="password" :disabled="loading"></a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit" :loading="loading">登录</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
.bg {
    width: 100%;
    height: 100vh;
    background: #f5f5f5;

    .login-panel {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translate(-50%, -50%);
        width: 500px;
        height: 260px;
        box-shadow: 0 3px 6px #00000015;

        .left {
            width: 250px;
            height: 260px;
            background: url("./imgs/2.jpg") no-repeat left;
            display: flex;
            justify-content: center;
            align-items: center;

            .logo {
                color: #fff;
                font-size: 56px;
                opacity: 0;
                transition: 1.5s;
                transform: translateY(-30%);

                &.show {
                    color: #2783da;
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }

        .right {
            width: 250px;
            height: 260px;
            background: #fff;

            .login-title {
                font-size: 26px;
                color: #2783da;
                margin: 18px 18px;
            }

            .login-form {
                padding: 8px 18px
            }
        }
    }
}
</style>