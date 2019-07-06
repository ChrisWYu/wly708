<template>
  <el-container>
    <!-- <el-header style="background-color:#AE0000">
      <h4 style="color:white;text-align: left">仿销日志</h4>
    </el-header> -->
    <div style="margin: 0px 10px 0px 10px;width: 100%">
      <el-form :inline="true" :model="form" style="text-align:left;margin: 20px 10px 0px 0px;">
        <el-row style="width:100%">
          <el-row style="position: relative;">
            <!-- onFocus // @focus-->
            <!-- <el-form-item>
              <el-input  @focus="dingda" placeholder="点击选择发送人" v-model="form.useynam" style="width:465px;cursor: pointer;">
              </el-input>
              <div style="position: absolute;cursor: pointer;top: 0px;right: 0;width: 40px;height: 40px;">
                <i class="el-icon-error" style="color: #d4c3c3;font-size:20px;margin-left: 10px"></i>
              </div>
            </el-form-item> -->
            <!-- 选择发送人 -->
            <span style="float:left;margin-left: 10px;height: 40px;line-height: 40px;font-weight: bold;">选择发送人：</span>
            <div @click="dingda" style="text-indent: 20px;color:rgb(185, 189, 199);border-radius: 4px;cursor: pointer;border: 1px solid #dcdfe6;float: left;width:380px;height: 40px;line-height: 40px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
              {{useynam}}
            </div>

            <!-- 选择状态 -->
            <el-select v-on:change="zhuangtai()" style="margin-left: 20px;margin-right: 20px;width: 150px;" v-model="form.submitStatus"
              placeholder=" - 状态 -">
              <el-option label="-全部状态-" value=""></el-option>
              <el-option label="正常已提交" value="normal_submitted"></el-option>
              <el-option label="正常未提交" value="normal_not_submitted"></el-option>
              <el-option label="延期已提交" value="postpone_submitted"></el-option>
              <el-option label="延期未提交" value="postpone_not_submitted"></el-option>
            </el-select>
            <!--选择时间 -->
            <!-- <el-form-item style="margin-left:0px;">
              <el-date-picker type="date" placeholder="开始时间" v-model="form.startTime" style="width: 150px;"></el-date-picker>
              <span>—</span>
              <el-date-picker type="date" placeholder="结束时间" v-model="form.endTime" style="width: 150px;"></el-date-picker>
            </el-form-item> -->
            <el-date-picker :clearable="false" v-on:change="sjtime()" v-model="form.alltime" type="daterange"
              range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <!-- 搜索按键 -->
            <!-- <el-form-item>
              <el-button @click="search" type="info" size="medium" style="background:#F13D3D;border: none">搜索</el-button>
            </el-form-item> -->
            <!-- 清空 -->
            <el-button @click="empty()" type="text" style="color:#F13D3D;margin-left: 20px;">清空搜索条件</el-button>
          </el-row>
          <el-row style="margin-top:20px;">
            <!-- <span style="font-weight: bold;">请选择模板</span> -->
            <el-button class="assselik" :class="{activeClick:activeName==''}" v-on:click="activeName=''" @click="search()"
              style="margin-left:100px;" size="medium">全部</el-button>
            <el-button class="assselik" :class="{activeClick:activeName=='day_log'}" v-on:click="activeName='day_log'"
              @click="daybao()" size="medium">日报</el-button>
            <el-button class="assselik" :class="{activeClick:activeName=='week_log'}" v-on:click="activeName='week_log'"
              @click="weekbao()" size="medium">周报</el-button>
            <el-button class="assselik" :class="{activeClick:activeName=='month_log'}" v-on:click="activeName='month_log'"
              @click="monthbao()" size="medium">月报</el-button>
            <!-- <el-select style="float:right;margin-right:50px;border:1px solid #F13D3D;" v-model="value" placeholder="提交状态">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select> -->

          </el-row>
        </el-row>
      </el-form>
      <!-- 日志的循环 -->
      <el-row v-loading="loading" style="margin-top:30px;">
        <div style="width: 800px;margin:0px auto">
          <div v-for="(item, index) in newData" :key="index">
            <work-log :form="item" :isYanqi="item.isYanqi" :booler="item.booler" @onsubmit="cc" @to-send="toSend"></work-log>
          </div>
          <div @click="getMore" style="height: 50px;cursor: pointer;text-align: center;font-weight: bold;">点击加载更多</div>
        </div>
      </el-row>

    </div>
  </el-container>
</template>
<script>
  import * as api from '../../api/api'
  import workLog from './yestdary/workLog'
  export default {
    components: { workLog },
    data() {
      return {
        loading: false,//加载中
        activeName: "",//选择日志分类的样式
        pageCurrent: 0,//定义的页码
        pageSize: "30",
        value: '',
        useynam: "",//钉钉返回的人名
        usesss: [],//要查询人的Id
        form: {
          alltime: "",//所有的时间
          startTime: "",//开始时间
          endTime: "",//结束时间
          submitStatus: "",//提交类型
          name: '',
          region: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        // 展示的数据
        newData: [],
        // 第一页初始数据
        bigData: [
        ],
        // pageInfo: {
        //   currentPage: 1,
        //   pageSize: 10
        // }
      };
    },

    created() {
      // 初始化时间
      // this.sjtime();

      //初始化获取后台数据
      this.query();
      // console.log("时间为")
      // console.log(this.form.startTime)
      // console.log(this.form.endTime)
    },
    methods: {
      //选择状态改变时
      zhuangtai() {
        // console.log(this.form.submitStatus)
        this.search();
      },
      //选择时间后
      sjtime() {
        this.form.startTime = this.$moment(this.form.alltime[0]).format(
          "YYYY-MM-DD"
        );
        this.form.endTime = this.$moment(this.form.alltime[1]).format(
          "YYYY-MM-DD"
        );
        this.search();
      },
      //初始化查询
      query() {
        this.loading = true;
        // usesss:[{"userId":"123"},{"userId":"方式"}],
        this.pageCurrent++;
        this.activeName = "";
        let formdatas = new FormData();
        formdatas.append('pageCurrent', this.pageCurrent)
        formdatas.append('pageSize', this.pageSize)
        var userId = this.usesss;
        for (var i = 0; i < this.usesss.length; i++) {
          // console.log(this.usesss[i].userId)
          if (userId == "") {
            userId = this.usesss[i].userId;
          } else {
            userId = userId + "," + this.usesss[i].userId;
          }
        }
        formdatas.append('userId', userId)
          this.$http.post("/api/ddadapter/openApi/data", {
            "code":"00709YA03",
            "data":{
              "pageCurrent":this.pageCurrent,
              "pageSize":this.pageSize,
              "userId":userId,
              "tokenid":sessionStorage.getItem("tokenid")
            }

          }
        ).then(res => {
          console.log(res)
          // 数据展示
          this.newData = JSON.parse(JSON.stringify(res.data.data.list))

          console.log(this.newData)
          //添加布尔值
          this.newData.map(item => {
            if (item.commentContext == "" || item.commentContext == null || item.commentContext == undefined) {
              item.booler = true;
            } else {
              item.booler = false;
            }
            item.imgData = item.imgUrl;
            // if (item.imgUrl) {
            //   item.imgData = item.imgUrl.split(",");
            // }
          })
          this.loading = false;
        }, error => {
          console.log(JSON.stringify(error))
        });
      },
      // 清空条件
      empty() {
        this.loading = true;
        this.pageCurrent = 1;
        this.form.alltime = "";
        this.activeName = "";
        this.form.submitStatus = "";
        this.useynam = "";//钉钉返回的人名
        this.usesss = [];
        let formdatas = new FormData();
        formdatas.append('pageCurrent', this.pageCurrent)
        formdatas.append('pageSize', this.pageSize)
        formdatas.append('userId', "")
        formdatas.append('startTime', "")
        formdatas.append('endTime', "")

        // formdatas.append('userId', "123,456")
        // this.$http.post("/api/reportLog/query", formdatas
         this.$http.post("/api/ddadapter/openApi/data", {
            "code":"00709YA03",
            "data":{
              "pageCurrent":this.pageCurrent,
              "pageSize":this.pageSize,
              "userId":"",
              "startTime":"",
              "endTime":"",
              "tokenid":sessionStorage.getItem("tokenid")
            }

         }
        ).then(res => {
          // 数据展示
          this.newData = JSON.parse(JSON.stringify(res.data.data.list))
          console.log(this.newData)
          //添加布尔值
          this.newData.map(item => {
            if (item.commentContext == "" || item.commentContext == null || item.commentContext == undefined) {
              item.booler = true;
            } else {
              item.booler = false;
            }
            // if (item.imgUrl) {
            //   item.imgData = item.imgUrl.split(",");
            // }
          })
          this.loading = false;
        }, error => {
          console.log(JSON.stringify(error))
        });

      },
      //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
      dateFormat: function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        /* 在日期格式中，月份是从0开始的，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // 拼接
        return year + "-" + month + "-" + day;
      },

      //点击搜索
      search() {
        this.loading = true;
        this.pageCurrent = 1;//变成第一页
        // this.activeName = "全部";//日报模板
        let formdatas = new FormData();
        formdatas.append('userId', this.usesss)//要查询的ID
        formdatas.append('activeName', this.activeName)
        formdatas.append('submitStatus', this.form.submitStatus)
        formdatas.append('pageCurrent', this.pageCurrent)
        formdatas.append('pageSize', this.pageSize)
        // console.log(this.form.startTime)
        if (this.form.startTime !== '' && this.form.startTime !== null && this.form.startTime !== undefined) {
          var staaa = this.dateFormat(this.form.startTime) + " 00:00:00";
          formdatas.append('startTime', this.dateFormat(this.form.startTime) + " 00:00:00")
          console.log(this.dateFormat(this.form.startTime), this.form.startTime, "0000000000000")
        } else {
          console.log("1111");
          var staaa = this.form.startTime;
          formdatas.append('startTime', this.form.startTime)
        }

        if (this.form.endTime !== '' && this.form.endTime !== null && this.form.endTime !== undefined) {
          var enddd = this.dateFormat(this.form.endTime) + " 23:59:59";
          formdatas.append('endTime', this.dateFormat(this.form.endTime) + " 23:59:59")
        } else {
          var enddd = this.form.endTime;
          formdatas.append('endTime', this.form.endTime)
        }

        // this.$http.post("/api/reportLog/query", formdatas
         this.$http.post("/api/ddadapter/openApi/data", {
            "code":"00709YA03",
            "data":{
              "userId":this.usesss,
              "activeName": this.activeName,
              "submitStatus":this.form.submitStatus,
              "pageCurrent":this.pageCurrent,
              "pageSize":this.pageSize,
              "startTime":staaa,
              "endTime":enddd,
              "logType":this.activeName,
              "tokenid":sessionStorage.getItem("tokenid")
            }

         }
        ).then(res => {
          this.newData = JSON.parse(JSON.stringify(res.data.data.list))
          this.newData.map(item => {
            if (item.commentContext == "" || item.commentContext == null || item.commentContext == undefined) {
              item.booler = true;
            } else {
              item.booler = false;
            }
            // if (item.imgUrl) {
            //   item.imgData = item.imgUrl.split(",");
            // }
          })
          console.log(this.newData)
          this.loading = false;
        }, error => {
          alert(JSON.stringify(error))
        });
      },
      //选择模板
      //日报
      daybao() {
        this.loading = true;
        console.log("点击日报为:" + this.activeName)
        this.pageCurrent = 1;//变成第一页
        let formdatas = new FormData();
        formdatas.append('userId', this.usesss)//要查询的ID
        formdatas.append('submitStatus', this.form.submitStatus)
        formdatas.append('activeName', this.activeName)
        formdatas.append('pageCurrent', this.pageCurrent)
        formdatas.append('pageSize', this.pageSize)
        if (this.form.startTime !== '' && this.form.startTime !== null && this.form.startTime !== undefined) {
          var starrrr = this.dateFormat(this.form.startTime) + " 00:00:00";
          formdatas.append('startTime', this.dateFormat(this.form.startTime) + " 00:00:00")
          console.log(this.dateFormat(this.form.startTime), this.form.startTime, "0000000000000")
        } else {
          var starrrr = this.form.startTime;
          console.log("1111");
          formdatas.append('startTime', this.form.startTime)
        }

        if (this.form.endTime !== '' && this.form.endTime !== null && this.form.endTime !== undefined) {
          var endddd = this.dateFormat(this.form.endTime) + " 23:59:59";
          formdatas.append('endTime', this.dateFormat(this.form.endTime) + " 23:59:59")
        } else {
          var endddd = this.form.endTime;
          formdatas.append('endTime', this.form.endTime)
        }
        formdatas.append('logType', this.activeName)
        // console.log(formdatas.get("submitStatus"))
        // this.$http.post("/api/reportLog/query", formdatas
        this.$http.post("/api/ddadapter/openApi/data", {
            "code":"00709YA03",
            "data":{
              "userId":this.usesss,
              "activeName": this.activeName,
              "submitStatus":this.form.submitStatus,
              "pageCurrent":this.pageCurrent,
              "pageSize":this.pageSize,
              "logType":this.activeName,
              "startTime":starrrr,
              "endTime":endddd,
              "tokenid":sessionStorage.getItem("tokenid")
            }

         }
        ).then(res => {
          this.newData = JSON.parse(JSON.stringify(res.data.data.list))
          //添加布尔值
          this.newData.map(item => {
            if (item.commentContext == "" || item.commentContext == null || item.commentContext == undefined) {
              item.booler = true;
            } else {
              item.booler = false;
            }
            // if (item.imgUrl) {
            //   item.imgData = item.imgUrl.split(",");
            // }
          })
          console.log(this.newData)
          this.loading = false;
        }, error => {
          alert(JSON.stringify(error))
        });
      },
      //周报
      weekbao() {
        this.loading = true;
        console.log("点击周报为:" + this.activeName)
        this.pageCurrent = 1;//变成第一页
        let formdatas = new FormData();
        formdatas.append('userId', this.usesss)//要查询的ID
        formdatas.append('pageCurrent', this.pageCurrent)
        formdatas.append('pageSize', this.pageSize)
        formdatas.append('activeName', this.activeName)
        formdatas.append('submitStatus', this.form.submitStatus)
        if (this.form.startTime !== '' && this.form.startTime !== null && this.form.startTime !== undefined) {
          var starrrrr = this.dateFormat(this.form.startTime) + " 00:00:00";
          formdatas.append('startTime', this.dateFormat(this.form.startTime) + " 00:00:00")
          console.log(this.dateFormat(this.form.startTime), this.form.startTime, "0000000000000")
        } else {
          var starrrrr = this.form.startTime;
          console.log("1111");
          formdatas.append('startTime', this.form.startTime)
        }

        if (this.form.endTime !== '' && this.form.endTime !== null && this.form.endTime !== undefined) {
          var enddddd = this.dateFormat(this.form.endTime) + " 23:59:59";
          formdatas.append('endTime', this.dateFormat(this.form.endTime) + " 23:59:59")
        } else {
          var enddddd = this.form.endTime;
          formdatas.append('endTime', this.form.endTime)
        }
        formdatas.append('logType', this.activeName)
        // console.log(formdatas.get("submitStatus"))
        // this.$http.post("/api/reportLog/query", formdatas
        this.$http.post("/api/ddadapter/openApi/data", {
            "code":"00709YA03",
            "data":{
              "userId":this.usesss,
              "activeName": this.activeName,
              "submitStatus":this.form.submitStatus,
              "pageCurrent":this.pageCurrent,
              "pageSize":this.pageSize,
              "logType":this.activeName,
              "startTime":starrrrr,
              "endTime":enddddd,
              "tokenid":sessionStorage.getItem("tokenid")
            }

         }
        ).then(res => {
          this.newData = JSON.parse(JSON.stringify(res.data.data.list))
          //添加布尔值
          this.newData.map(item => {
            if (item.commentContext == "" || item.commentContext == null || item.commentContext == undefined) {
              item.booler = true;
            } else {
              item.booler = false;
            }
            // if (item.imgUrl) {
            //   item.imgData = item.imgUrl.split(",");
            // }
          })
          console.log(this.newData)
          this.loading = false;
        }, error => {
          alert(JSON.stringify(error))
        });
      },
      //月报
      monthbao() {
        this.loading = true;
        console.log("点击月报为:" + this.activeName)
        this.pageCurrent = 1;//变成第一页
        let formdatas = new FormData();
        formdatas.append('userId', this.usesss)//要查询的ID
        formdatas.append('pageCurrent', this.pageCurrent)
        formdatas.append('pageSize', this.pageSize)
        formdatas.append('activeName', this.activeName)
        formdatas.append('submitStatus', this.form.submitStatus)
        if (this.form.startTime !== '' && this.form.startTime !== null && this.form.startTime !== undefined) {
          var startt1 = this.dateFormat(this.form.startTime) + " 00:00:00";
          formdatas.append('startTime', this.dateFormat(this.form.startTime) + " 00:00:00")
          console.log(this.dateFormat(this.form.startTime), this.form.startTime, "0000000000000")
        } else {
          var startt1 = this.form.startTime;
          console.log("1111");
          formdatas.append('startTime', this.form.startTime)
        }

        if (this.form.endTime !== '' && this.form.endTime !== null && this.form.endTime !== undefined) {
          var endtt = this.dateFormat(this.form.endTime) + " 23:59:59";
          formdatas.append('endTime', this.dateFormat(this.form.endTime) + " 23:59:59")
        } else {
          var endtt = this.form.endTime;
          formdatas.append('endTime', this.form.endTime)
        }
        formdatas.append('logType', this.activeName)
        // console.log(formdatas.get("submitStatus"))
        // this.$http.post("/api/reportLog/query", formdatas
         this.$http.post("/api/ddadapter/openApi/data", {
            "code":"00709YA03",
            "data":{
              "userId":this.usesss,
              "activeName": this.activeName,
              "submitStatus":this.form.submitStatus,
              "pageCurrent":this.pageCurrent,
              "pageSize":this.pageSize,
              "logType":this.activeName,
              "startTime":startt1,
              "endTime":endtt,
              "tokenid":sessionStorage.getItem("tokenid")
            }

         }
        ).then(res => {
          this.newData = JSON.parse(JSON.stringify(res.data.data.list))
          //添加布尔值
          this.newData.map(item => {
            if (item.commentContext == "" || item.commentContext == null || item.commentContext == undefined) {
              item.booler = true;
            } else {
              item.booler = false;
            }
            // if (item.imgUrl) {
            //   item.imgData = item.imgUrl.split(",");
            // }
          })
          console.log(this.newData)
          this.loading = false;
        }, error => {
          alert(JSON.stringify(error))
        });
      },
      //查看某人的所有日志
      cc(data, nnn) {
        this.loading = true;
        this.useynam = nnn;//显示的姓名
        this.usesss = data;//显示的id
        this.pageCurrent = 1;//变成第一页
        this.activeName = "";//变成全部
        // console.log("查看某人的日志")
        // console.log(data)
        let formdatas = new FormData();
        formdatas.append('submitStatus', this.form.submitStatus)
        formdatas.append('logType', this.activeName)
        formdatas.append('pageCurrent', this.pageCurrent)
        formdatas.append('pageSize', this.pageSize)
        if (this.form.startTime !== '' && this.form.startTime !== null && this.form.startTime !== undefined) {
          var starttt = this.dateFormat(this.form.startTime) + " 00:00:00";
          formdatas.append('startTime', this.dateFormat(this.form.startTime) + " 00:00:00")
          console.log(this.dateFormat(this.form.startTime), this.form.startTime, "0000000000000")
        } else {
          var starttt = this.form.startTime;
          console.log("1111");
          formdatas.append('startTime', this.form.startTime)
        }

        if (this.form.endTime !== '' && this.form.endTime !== null && this.form.endTime !== undefined) {
          var endtii = this.dateFormat(this.form.endTime) + " 23:59:59";
          formdatas.append('endTime', this.dateFormat(this.form.endTime) + " 23:59:59")
        } else {
          var endtii = this.form.endTime;
          formdatas.append('endTime', this.form.endTime)
        }
        var userId = new Array()
        // var userId = [];
        userId[0]=this.usesss;
        // var userId = this.usesss;
        // for (var i = 0; i < this.usesss.length; i++) {
        //   // console.log(this.usesss[i].userId)
        //   if (userId == "") {
        //     userId = this.usesss[i].userId;
        //   } else {
        //     userId = userId + "," + this.usesss[i].userId;
        //   }

        // }
        console.log(userId)
        // console.log("要查询的ID为" + userId)
        formdatas.append('userId', userId)
        // formdatas.append('userId', this.usesss)
        // console.log(formdatas.get("submitStatus"))
        // this.$http.post("/api/reportLog/query", formdatas
        this.$http.post("/api/ddadapter/openApi/data", {
            "code":"00709YA03",
            "data":{
              "userId":userId,
              // "activeName": this.activeName,
              "submitStatus":this.form.submitStatus,
              "pageCurrent":this.pageCurrent,
              "pageSize":this.pageSize,
              "logType":this.activeName,
              "startTime":starttt,
              "endTime":endtii,
              "tokenid":sessionStorage.getItem("tokenid")
            }

         }
        ).then(res => {
          this.loading = false;
          console.log(res)
          this.newData = res.data.data.list;
          //添加布尔值
          this.newData.map(item => {
            if (item.commentContext == "" || item.commentContext == null || item.commentContext == undefined) {
              item.booler = true;
            } else {
              item.booler = false;
            }
          })
          console.log(this.newData)
        }, error => {
          this.$message.error(JSON.stringify(error));
        });


      },
      // 选择框的点击事件
      dingda() {
        let t = this;
        // this.$ddapi.contactChoose().then(res=>{
        //   console.log(res)
        // })
        console.log("点击出发")
        dd.biz.contact.complexPicker({
          title: "选择发送人",            //标题
          corpId: sessionStorage.getItem("corpId"),              //企业的corpId
          multiple: true,            //是否多选
          limitTips: "超出了",          //超过限定人数返回提示
          maxUsers: 1000,            //最大可选人数
          pickedUsers: [],            //已选用户
          pickedDepartments: [],          //已选部门
          disabledUsers: [],            //不可选用户
          disabledDepartments: [],        //不可选部门
          requiredUsers: [],            //必选用户（不可取消选中状态）
          requiredDepartments: [],        //必选部门（不可取消选中状态）
          appId: 158,              //微应用的Id
          permissionType: "GLOBAL",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: false,        //返回人，或者返回人和部门
          startWithDepartmentId: 0,   //仅支持0和-1
          onSuccess: function (result) {
            /**{
                selectedCount:1,                              //选择人数
                users:[{"name":"","avatar":"","emplId":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），emplId（用户工号）三个字段
                departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
            }*/
            // useynam:"选择发送人",//钉钉返回的人名
            // usesss:[],//要查询人的Id

            // console.log(result.users)
            // t.useynam = [];
            // t.usesss = [];
            var renming = []
            var renid = []
            result.users.map(item => {
              console.log(item.name)
              console.log(item.emplId)
              renming.push(item.name);
              renid.push(item.emplId);
            })
            // console.log(renid)
            t.usesss = renid;//赋值
            console.log("人的ID为")
            console.log(t.usesss)
            var renmingjihe = ""
            for (var i = 0; i < renming.length; i++) {
              if (renming == "") {
                // return
                renmingjihe = renming[i];
              } else {
                renmingjihe = renming[i] + "," + renmingjihe;
              }
            }
            //显示名称
            t.useynam = renmingjihe
            console.log("启用事件")
            t.pageCurrent = 1;//变成第一页
            t.activeName = "";//变成全部
            let formdatas = new FormData();
            formdatas.append('userId', t.usesss)//要查询的ID
            formdatas.append('pageCurrent', t.pageCurrent)
            formdatas.append('pageSize', t.pageSize)
            formdatas.append('submitStatus', t.form.submitStatus)
            if (t.form.startTime !== '' && t.form.startTime !== null && t.form.startTime !== undefined) {
              var starttttt = t.dateFormat(t.form.startTime) + " 00:00:00";
              formdatas.append('startTime', t.dateFormat(t.form.startTime) + " 00:00:00")
              console.log(t.dateFormat(t.form.startTime), t.form.startTime, "0000000000000")
            } else {
              var starttttt = t.form.startTime;
              console.log("1111");
              formdatas.append('startTime', t.form.startTime)
            }

            if (t.form.endTime !== '' && t.form.endTime !== null && t.form.endTime !== undefined) {
              var endttttt = t.dateFormat(t.form.endTime) + " 23:59:59";
              formdatas.append('endTime', t.dateFormat(t.form.endTime) + " 23:59:59")
            } else {
              var endttttt = t.form.endTime;
              formdatas.append('endTime', t.form.endTime)
            }
            formdatas.append('logType', t.activeName)
            // console.log(formdatas.get("submitStatus"))
            t.loading = true;
            // t.$http.post("/api/reportLog/query", formdatas
            t.$http.post("/api/ddadapter/openApi/data", {
            "code":"00709YA03",
            "data":{
              "userId":t.usesss,
              // "activeName": this.activeName,
              "submitStatus":t.form.submitStatus,
              "pageCurrent":t.pageCurrent,
              "pageSize":t.pageSize,
              "logType":t.activeName,
              "startTime":starttttt,
              "endTime":endttttt,
              "tokenid":sessionStorage.getItem("tokenid")
            }

         }
            ).then(res => {
              t.newData = JSON.parse(JSON.stringify(res.data.data.list))
              //添加布尔值
              t.newData.map(item => {
                if (item.commentContext == "" || item.commentContext == null || item.commentContext == undefined) {
                  item.booler = true;
                } else {
                  item.booler = false;
                }
              })
              t.loading = false;
            }, error => {
              t.loading = false;
              alert(JSON.stringify(error))
            });
          },

        });
        // console.log("123")
      },
      //下拉菜单的点击事件
      //正常已提交
      norSub() {
        console.log("正常已提交")
      },
      //正常未提交
      nornoSub() {
        console.log("正常未提交")
      },
      //延期已提交
      oveSub() {
        console.log("延期已提交")
      },
      //延期未提交
      ovenoSub() {
        console.log("延期未提交")
      },
      // Tab切换的内容显示，可注释
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      // 发送评论
      toSend(pop, index) {
        this.$nextTick(() => {
          this.newData.map(item => {
            if (item.id == index) {
              item.booler = false;
              item.summarizeInfo = item.summarizeInfo + " "
              // console.log(item);
            }
          })
        })
        // this.newData. = !this.form[index].booler;
      },
      // 加载更多
      getMore() {
        this.loading = true;
        console.log("加载更多的类型为" + this.activeName)
        this.pageCurrent++;//页数+1
        console.log("第几页" + this.pageCurrent)
        let formdatas = new FormData();
        formdatas.append('userId', this.usesss)//要查询的ID
        formdatas.append('submitStatus', this.form.submitStatus)//提交类型
        // 提交时间
        if (this.form.startTime !== '' && this.form.startTime !== null && this.form.startTime !== undefined) {
          var starttii = this.dateFormat(this.form.startTime) + " 00:00:00";
          formdatas.append('startTime', this.dateFormat(this.form.startTime) + " 00:00:00")
          console.log(this.dateFormat(this.form.startTime), this.form.startTime, "0000000000000")
        } else {
          var starttii = this.form.startTime;
          console.log("1111");
          formdatas.append('startTime', this.form.startTime)
        }

        if (this.form.endTime !== '' && this.form.endTime !== null && this.form.endTime !== undefined) {
          var endtimmm = this.dateFormat(this.form.endTime) + " 23:59:59";
          formdatas.append('endTime', this.dateFormat(this.form.endTime) + " 23:59:59")
        } else {
           var endtimmm =  this.form.endTime;
          formdatas.append('endTime', this.form.endTime)
        }
        //类型activeName
        formdatas.append('logType', this.activeName)
        // 分页
        formdatas.append('pageCurrent', this.pageCurrent)
        formdatas.append('pageSize', this.pageSize)
        // this.$http.post("/api/reportLog/query", formdatas
        this.$http.post("/api/ddadapter/openApi/data", {
            "code":"00709YA03",
            "data":{
              "userId":this.usesss,
              // "activeName": this.activeName,
              "submitStatus":this.form.submitStatus,
              "pageCurrent":this.pageCurrent,
              "pageSize":this.pageSize,
              "logType":this.activeName,
              "startTime":starttii,
              "endTime":endtimmm,
              "tokenid":sessionStorage.getItem("tokenid")
            }

         }
        ).then(res => {
          this.loading = false;
          console.log(res.data.data)
          this.newData = this.newData.concat(JSON.parse(JSON.stringify(res.data.data.list)))
          //添加布尔值
          this.newData.map(item => {
            if (item.commentContext == "" || item.commentContext == null || item.commentContext == undefined) {
              item.booler = true;
            } else {
              item.booler = false;
            }
            // if (item.imgUrl) {
            //   item.imgData = item.imgUrl.split(",");
            // }
          })
          
          // console.log(this.newData)
        }, error => {
          alert(JSON.stringify(error))
        });
      },
    },
  };
</script>
<style scoped>
  .assselik {
    width: 100px;
    border: 1px solid #F13D3D;
    background: #ffffff;
    color: #F13D3D;
  }

  .activeClick {
    background: #F13D3D;
    color: #ffffff;
  }
</style>