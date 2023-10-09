<template>
  <!--获取当前登陆用户信息-->
  <div style="display: flex;justify-content: center">
    <el-card class="box-card" style="width: 500px;height: 400px">
      <template #header>
        <div class="card-header">
          <span><strong>Profile</strong></span>
          <el-button type="primary" plain @click="dialogInfoVisible = true" class="button" text>Edit Profile</el-button>
        </div>
      </template>
      <div>
        <div style="display: flex;justify-content: center">
          <!-- <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              action="http://127.0.0.1:3008/upload"
              :on-success="handleAvatarSuccess"
          >
          <img title="点击修改用户头像" v-if="imageUrl" style="height: 120px;width: 120px;border-radius: 60px" :src="imageUrl" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          <img v-if="imageUrl" style="height: 120px;width: 120px;border-radius: 60px" :src="imageUrl" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <!--绑定数据-->
          <!-- </el-upload> -->
        </div>
        <br/>
        <div>
          Username:
          <el-tag>{{userInfo.username}}</el-tag>
        </div>
        <div>
          Phone number:
          <el-tag>{{this.$store.state.phone}}</el-tag>
        </div>
        <div>
          University/Institute:
          <el-tag>{{userInfo.institute}}</el-tag>
        </div>
        <div>
          Authority:
          <el-tag type="success" v-if="this.$store.state.access!=1">User</el-tag>
          <el-tag type="success" v-else>Admin</el-tag>
        </div>
        <div type="flex">
          <br/>
          <el-button type="danger" plain @click="dialogPasswordVisible = true" class="button">Change password</el-button>
        </div>
      </div>
    </el-card>
  </div>
  <!--修改密码-->
  <el-dialog
    title="Change your password"
    :draggable="true"
    v-model="dialogPasswordVisible"
    :append-to-body="true"
    width="30%"
    @close="handleClose">
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        status-icon
        class="demo-ruleForm"
        label-width="160px"
    >
      <el-form-item label="Enter old passward" prop="oldpass">
        <el-input v-model="ruleForm.oldpass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Enter new passward" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Check new passward" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="resetForm('ruleForm')" plain>Cancel</el-button>
        <el-button type="success" @click="submitForm('ruleForm')" plain>Confirm</el-button><!--绑定一个post事件-->
      </span>
    </template>
  </el-dialog>
  <!--编辑用户信息-->
  <el-dialog
      title="Edit your profile"
      :draggable="true"
      v-model="dialogInfoVisible"
      :append-to-body="true"
      width="30%"
      @close="handleClose">
    <el-form label-width="120px">
<!--      <el-form-item label="用户权限">-->
<!--        <el-select v-model="newInfo.userpermission" placeholder="请选择用户权限">-->
<!--          <el-option label="系统管理员" value="0"></el-option>-->
<!--          <el-option label="普通用户" value="1"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="Phone number">
        <el-input v-model="newInfo.phone" autocomplete="off" />
      </el-form-item>
      <!-- <el-form-item label="用户地址">
        <el-input v-model="newInfo.address" autocomplete="off" />
      </el-form-item> -->
    </el-form>
    <template #footer>
        <span class="dialog-footer">
        <el-button type="danger" @click="dialogInfoVisible = false" plain>Cancel</el-button>
        <el-button type="success" @click="InfoSuccess" plain>Confirm</el-button><!--绑定一个post事件-->
        </span>
    </template>
  </el-dialog>
</template>

<script>
import {useStore} from "vuex";
import { ElMessage } from 'element-plus'
import axios from 'axios'
const store = useStore();
axios.defaults.baseURL='/api';
//axios.defaults.baseURL='http://localhost:7996';
axios.defaults.timeout='3000';
import request from "../../api";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        //当输入了确认密码后才会判断密码是否一致
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (this.ruleForm.pass.length!=0 && value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      imageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      ruleForm: {
        oldpass:'',
        pass: '',
        checkPass: '',
      },
      rules: {
        oldpass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      name: "AdminInfo",
      flag:0,
      dialogPasswordVisible : false,
      dialogInfoVisible : false,
      userInfo : {
        username: this.$store.state.username,//当登陆后会获取已经登陆的用户的用户名，电话号码，权限等信息
        phone: this.$store.state.phone,
        institute: this.$store.state.institute,
        userpermission:this.$store.state.access
      },
      newInfo : {
        username:'',
        phone:'',
        address:'',
        userpermission:''
      }
    };
  },
  methods: {
    demo() {

    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleClose:function()
    {
      this.newInfo.username=''
      this.newInfo.userpermission=''
      this.newInfo.phone=''
      this.newInfo.address=''
      this.ruleForm.oldpass=''
      this.ruleForm.pass=''
      this.ruleForm.checkPass=''
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("here3")
          //调用post修改密码
          request.post('/user/updatepwd',{},
          {
            params:{
              username:this.userInfo.username,
              newPassword:this.ruleForm.pass
            },
            headers:{'Content-Type':'application/json'}
          }
          ).then(function(response) {
            console.log("here1"+response)
          }).catch(function(err) {
            console.log("here2"+err)
          })
          this.dialogPasswordVisible = false
          ElMessage({
            message: '修改成功！',
            type: 'success',
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogPasswordVisible = false
    },
    InfoSuccess :function (){
      if(this.newInfo.username!=''){
        this.userInfo.username=JSON.parse(JSON.stringify(this.newInfo.username))
        this.flag=1
      }
      if(this.newInfo.userpermission!=''){
        this.userInfo.userpermission=JSON.parse(JSON.stringify(this.newInfo.userpermission))
        this.$store.state.access=JSON.parse(JSON.stringify(this.newInfo.userpermission))
        this.flag=1
        axios.post('/user/updateidentify',{
          "identify":this.userInfo.userpermission,
          "username":this.userInfo.username
        }).then(function(response) {
          console.log(response)
        }).catch(function(err) {
          console.log(err)
        })
      }
      if(this.newInfo.phone!='') {
        this.userInfo.phone=JSON.parse(JSON.stringify(this.newInfo.phone))
        //this.$store.state.phone=JSON.parse(JSON.stringify(this.newInfo.phone))
        this.$store.commit("setPhone",this.userInfo.phone)
        console.log(this.$store.state.phone)
        console.log(this.userInfo.phone)
        this.flag=1
        axios.post('/user/updatetel',{
          "telephone":this.newInfo.phone,
          "username":this.userInfo.username
        }).then(function(response) {
          console.log(response)
        }).catch(function(err) {
          console.log(err)
        })
      }
      if(this.newInfo.address!='') {
        this.userInfo.address=JSON.parse(JSON.stringify(this.newInfo.address))
        this.flag=1
      }
      this.dialogInfoVisible = false
      if(this.flag) {
          ElMessage({
            message: '修改成功！',
            type: 'success',
          })
        this.flag=0
      }
      else {
        ElMessage({
          message: '未修改！',
        })
      }
    }
  },
  mounted: function () {
    this.$store.state.phone=localStorage.getItem("phone")
  }
}
</script>

<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>