<template>
  <div class="login-container">
    <div class="login-left">
      <div class="login-left-content">
        <h2 class="welcome-text">欢迎使用</h2>
        <h1 class="system-name">学习-提升</h1>
        <p class="system-desc">坚持、自律、热爱、幸福</p>
      </div>
    </div>
    <div class="login-right">
      <div class="login-form-wrapper">
        <div class="login-header">
          <h2 class="login-title">欢迎登录</h2>
          <p class="login-subtitle">请输入您的账号和密码</p>
        </div>

        <el-form
          class="login-form"
          ref="loginFormRef"
          :model="formData"
          :rules="rules"
          label-position="top"
          autocomplete="off"
        >
          <el-form-item label="账号" prop="user">
            <el-input
              v-model.trim="formData.user"
              placeholder="请输入账号"
              clearable
              maxlength="16"
              minlength="4"
              :prefix-icon="User"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pwd">
            <el-input
              v-model.trim="formData.pwd"
              type="password"
              placeholder="请输入密码"
              clearable
              show-password
              maxlength="16"
              minlength="4"
              :prefix-icon="Lock"
            />
          </el-form-item>

          <el-form-item label="验证码" prop="code">
            <div class="verification-code-container">
              <el-input
                v-model.trim="formData.code"
                placeholder="请输入验证码"
                clearable
                maxlength="4"
                minlength="4"
                :prefix-icon="Tickets"
              />
              <div class="verification-code-wrapper">
                <VerifyCode
                  ref="verifyCodeRef"
                  :value="formData.code"
                  :contentWidth="110"
                ></VerifyCode>
              </div>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="submit-btn"
              :loading="loading"
              @click="onSubmit"
            >
              登 录
            </el-button>
          </el-form-item>

          <div class="form-footer">
            <div class="remember-me">
              <el-checkbox>记住我</el-checkbox>
            </div>
            <a href="javascript:void(0)" class="forgot-password">忘记密码?</a>
          </div>
        </el-form>
      </div>
    </div>

    <!-- 滑动验证组件 -->
    <SliderVerifyCode
      v-model:isShow="isShow"
      @codeSuccess="loginSuccess"
    ></SliderVerifyCode>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRef } from "../../hooks";
import { useLogin } from "@/store/modules/login";
import { VerifyCode, SliderVerifyCode } from "../../components";
import { User, Lock, Tickets } from "@element-plus/icons-vue";
import { type ElForm } from "element-plus";
import { encryptAES } from "@/utils/crypto";
import dayjs from "dayjs";

const loginFormRef = ref<InstanceType<typeof ElForm> | null>(null);
const verifyCodeRef = ref<InstanceType<typeof VerifyCode> | null>(null);

const router = useRouter();
const loginStore = useLogin();
const isShow = ref(false);
const loading = ref(false);
const formData = useRef({
  user: "LJLNB",
  pwd: "NBDELJL",
  code: "",
});

/**
 * 校验验证码是否匹配
 * @returns {boolean}
 */
const checkCode = (_: any, value: string, callback: Function): void => {
  if (value === "") {
    callback(new Error("请输入验证码"));
  } else if (value.length !== 4) {
    callback(new Error("验证码长度不正确"));
  } else if (!verifyCodeRef.value?.isEqual(value)) {
    callback(new Error("验证码错误"));
    verifyCodeRef.value?.refreshCode();
  } else {
    callback();
  }
};

const rules = {
  user: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" },
  ],
  pwd: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" },
  ],
  code: [
    { required: true, validator: checkCode, trigger: "blur" },
    { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" },
  ],
};

/**
 * 重置状态
 */
const resetState = () => {
  loading.value = false;
  formData.reset();
  verifyCodeRef.value?.refreshCode();
  loginFormRef.value?.clearValidate();
};

/**
 * 账号密码验证码和
 * 滑动验证组件验证成功
 */
const loginSuccess = () => {
  loading.value = true;

  const userInfo = {
    user: formData.value.user,
    time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    token: encryptAES(formData.value.user),
    avatar:
      "https://images.unsplash.com/photo-1633957897986-70e83293f3ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    roles: ["ADMIN"],
  };

  // 存储用户信息
  loginStore.setUserInfo(userInfo);

  // 模拟登录接口响应
  setTimeout(() => {
    resetState();
    router.replace({
      path: "/",
    });
  }, 1000);
};

/**
 * 校验表单输入项
 * @param valid 是否验证通过
 */
const validateForm = (valid: boolean) => {
  if (!valid) return;
  // 校验验证码是否匹配
  loginFormRef.value!.validateField("code");
  isShow.value = true;
};

const onSubmit = () => {
  if (loading.value) return;
  if (!loginFormRef.value) return;
  loginFormRef.value.validate(validateForm);
};

const keydownHandle = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    onSubmit();
  }
};

onBeforeUnmount(() => resetState());

onMounted(() => {
  window.addEventListener("keydown", keydownHandle);
});

onUnmounted(() => {
  window.removeEventListener("keydown", keydownHandle, false);
});
</script>

<style lang="scss" scoped>
@use "./login.scss";
</style>
