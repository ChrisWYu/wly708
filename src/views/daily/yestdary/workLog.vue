<template>
  <div class="container">
    <div class="work-box">
      <el-row :gutter="20" style="position:relative">
        <!-- 头像 -->
        <el-col :span="4">
          <div class="work-img" style="position: absolute;left: -50px;width:60px;heghit:60px;background:#ffffff">
            <img style="width:100%;heghit:100%" src="/static/img/1556179923(1).jpg">
          </div>
        </el-col>
        <!-- 名字和类型 -->
        <el-col :span="13">
          <h4 v-show="form.logType == 'day_log'" class="big-title" style="text-align:left">{{form.name}}的日报</h4>
          <h4 v-show="form.logType == 'week_log'" class="big-title" style="text-align:left">{{form.name}}的周报</h4>
          <h4 v-show="form.logType == 'month_log'" class="big-title" style="text-align:left">{{form.name}}的月报</h4>
          <!-- 时间 -->
          <p class="small-title" style="text-align:left">{{form.createTime | FormatDate('MM-dd HH:mm')}}</p>
        </el-col>
        <el-col :span="2" style="float:right;">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link" style="font-weight: bold;cursor: pointer;">
              ...
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="lookpep(form.userId,form.name)">查看{{form.name}}的所有日志</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <el-col :span="3" style="float:right">
          <!-- 提交类型 -->
          <p v-show="form.submitStatus == 'normal_submitted'" class="small-title" style="color:#03BB54;background:#E4F8EE;border-radius: 3px;padding: 2px 4px;margin-top: 7px;width: 60px;">正常已提交</p>
          <p v-show="form.submitStatus == 'normal_not_submitted'" class="small-title" style="color:#409eff;background:#b3d8ff;border-radius: 3px;padding: 2px 4px;margin-top: 7px;width: 60px;">正常未提交</p>
          <p v-show="form.submitStatus == 'postpone_submitted'" class="small-title" style="color:#e6a23c;background:#f5dab1;border-radius: 3px;padding: 2px 4px;margin-top: 7px;width: 60px;">延期已提交</p>
          <p v-show="form.submitStatus == 'postpone_not_submitted'" class="small-title" style="color:#fbc4c4;background:#fef0f0;border-radius: 3px;padding: 2px 4px;margin-top: 7px;width: 60px;">延期未提交</p>


          <p v-show="form.submitStatus == 'postpone_submitted'" class="small-title" style="width:100px;margin-top: 10px;">提交时间&nbsp;&nbsp;&nbsp;{{form.subTime
            | FormatDate('MM-dd')}}</p>
        </el-col>
      </el-row>
      <el-row>
        <!-- 日报 -->
        <el-row v-show="form.logType == 'day_log'">
          <el-row>
            <p class="big-title" style="float:left">今日已完成工作：</p>
            <div style="float: left;margin-top: 14px;width: 450px;">
              <div class="medium-title">一、合作终端走访：{{form.cooperationTerminalFinished}}</div>
              <div class="medium-title">二、陌生中终端：{{form.unfamiliarTerminalFinished}}</div>
              <div class="medium-title">三、异常走访：{{form.anomalyReport}}</div>
              <div class="medium-title">四、专项任务：{{form.specialTaskFinished}}</div>
            </div>
          </el-row>
          <el-row>
            <p class="big-title" style="float:left">今日未完成工作：</p>
            <div style="float: left;margin-top: 14px;width: 450px;">
              <div class="medium-title">一、合作终端走访：{{form.cooperationTerminalUnfinished}}</div>
              <div class="medium-title">二、陌生中终端：{{form.unfamiliarTerminalUnfinished}}</div>
              <div class="medium-title">三、专项任务：{{form.specialTaskUnfinished}}</div>
            </div>
          </el-row>
          <el-row>
            <p class="big-title" style="float:left">明日工作计划：</p>
            <div style="float: left;margin-top: 14px;width: 450px;">

              <div class="medium-title">{{form.workPlan}}</div>
              <!-- <div class="medium-title">一、合作终端走访：{{form.cooperationTerminalFinished}}</div>
              <div class="medium-title">二、陌生中终端：{{form.unfamiliarTerminalFinished}}</div>
              <div class="medium-title">三、专项任务：{{form.specialTaskFinished}}</div> -->
            </div>
          </el-row>

          <el-row>
            <p class="big-title" style="float:left">需要协调工作：</p>
            <div style="float: left;margin-top: 14px;width: 450px;" class="medium-title">{{form.needCoordinate}}</div>
          </el-row>

          <el-row>
          <p class="big-title">上传图片：</p>
          <div v-for="(item, index) in form.imgData" :key="index" v-on:click="previewImages(item)">
            <img style="width:90px;height: 160px;float:left;margin-left: 20px;cursor: pointer;" :src="item">
        </div>
      </el-row>

      <el-row>
          <p class="big-title" style="float:left">图片描述：</p>
          <div style="float: left;margin-top: 14px;width: 450px;" class="medium-title">{{form.remark}}</div>
      </el-row>

        </el-row>
        <!-- 周报 -->
        <el-row v-show="form.logType == 'week_log'">
          <el-row>
            <p class="big-title" style="float:left">本周完成工作：</p>
            <div style="float: left;margin-top: 14px;width: 450px;">
              <div class="medium-title">一、走访门店：{{form.storeNum}}个</div>
              <div class="medium-title">二、专项任务：{{form.taskNum}}个</div>
              <div class="medium-title">三、访店铺完成率：{{form.visitPercentageComplete}}</div>
              <div class="medium-title">四、访店铺覆盖率 ：{{form.visitFractionOfCoverage}}</div>
              <div class="medium-title">五、日志确认提交完成率：{{form.submitPercentageComplete}}</div>
              <div class="medium-title">六、本周新增陌生终端：{{form.newTerminalNum}}个</div>
              <div class="medium-title">七、本周终端激活数量：{{form.terminalActivateNum}}个</div>
            </div>
          </el-row>
          <el-row>
            <p class="big-title" style="float:left">本周工作总结：</p>
            <div style="float: left;margin-top: 14px;width: 450px;">
              <div class="medium-title">{{form.summarizeInfo}}</div>
            </div>
          </el-row>


          <el-row>
            <p class="big-title" style="float:left">下周工作计划：</p>
            <div style="float: left;margin-top: 14px;width: 450px;">
              <div class="medium-title">{{form.workPlan}}</div>
            </div>
          </el-row>

          <el-row>
            <p class="big-title" style="float:left">需要协调工作：</p>
            <div style="float: left;margin-top: 14px;width: 450px;" class="medium-title">{{form.needCoordinate}}</div>
          </el-row>

          <el-row>
          <p class="big-title">上传图片：</p>
          <div v-for="(item, index) in form.imgData" :key="index" v-on:click="previewImages(item)">
            <img style="width:90px;height: 160px;float:left;margin-left: 20px;cursor: pointer;" :src="item">
        </div>
      </el-row>
        
        <el-row>
            <p class="big-title" style="float:left">图片描述：</p>
            <div style="float: left;margin-top: 14px;width: 450px;" class="medium-title">{{form.remark}}</div>
        </el-row>

          <!-- <p class="big-title">上传图片：</p> -->
          <!-- <div v-for="(item, index) in newData" :key="index">
                    <img :src="item.imgUrl">
                </div> -->
                

        </el-row>

        <!-- 月报 -->
        <el-row v-show="form.logType == 'month_log'">
          <el-row>
            <p class="big-title" style="float:left">本月完成工作：</p>
            <div style="float: left;margin-top: 14px;width: 450px;">
              <div class="medium-title">一、走访门店：{{form.storeNum}}个</div>
              <div class="medium-title">二、专项任务：{{form.taskNum}}个</div>
              <div class="medium-title">三、访店铺完成率：{{form.visitPercentageComplete}}</div>
              <div class="medium-title">四、访店铺覆盖率 ：{{form.visitFractionOfCoverage}}</div>
              <div class="medium-title">五、日志确认提交完成率：{{form.submitPercentageComplete}}</div>
              <div class="medium-title">六、本月新增陌生终端：{{form.newTerminalNum}}个</div>
              <div class="medium-title">七、本月终端激活数量：{{form.terminalActivateNum}}个</div>
            </div>
          </el-row>
          <el-row>
            <p class="big-title" style="float:left">本月工作总结：</p>
            <div style="float: left;margin-top: 14px;width: 450px;">
              <div class="medium-title">{{form.summarizeInfo}}</div>
            </div>
          </el-row>

        </el-row>


        <!-- <p class="small-title">{{form.oneCon}}</p>
              <p class="big-title">{{form.twoTitle}}</p>
              <p class="small-title">{{form.twoCon}}</p>
              <p class="big-title">{{form.threeTitle}}</p>
              <p class="small-title">{{form.threeCon}}</p>
              <p class="big-title">{{form.fourTitle}}</p>
              <p class="small-title">{{form.fourCon}}</p>
              <p class="big-title">{{form.fiveTitle}}</p>
              <img :src="form.imgUrl">
              <p class="small-title">{{form.fiveCon}}</p> -->
      </el-row>
      <!-- 可以提交意见 -->
       <el-row>
         <!-- <div v-show = booler>
              <el-input type="textarea" placeholder="领导回复" v-model="form.commentContext"></el-input>
              <div style="margin-top:14px;">
                <el-button style="float:right" @click="toSend(form.commentContext,form.id)">发送</el-button>
              </div>
          </div>

          <div v-show = !booler>
              <p class="big-title" style="float:left">领导回复：</p>
              <p class="small-title" style="float: left;margin-top: 12px;text-align:left;width: 450px;">{{form.commentContext}}</p>
          </div> -->
          
        <div :class="{disnone: form.booler === false}" v-show="(form.submitStatus == 'normal_submitted') || (form.submitStatus == 'postpone_submitted')">
          <p class="big-title" style="float:left">领导回复：</p>
            <el-input type="textarea" placeholder="领导回复" v-model="form.commentContext"></el-input>
            <div style="margin-top:14px;">
              <el-button style="float:right" @click="toSend(form.commentContext,form.id)">发送</el-button>
            </div>
        </div>
        <div :class="{disnone: form.booler === true}" v-show="(form.submitStatus == 'normal_submitted') || (form.submitStatus == 'postpone_submitted')">
            <p class="big-title" style="float:left">领导回复：</p>
            <p class="small-title" style="float: left;text-align:left;margin-top: 14px;width: 450px;">{{form.commentContext}}</p>
            <!-- <p class="small-title" style="float: left;text-align:left;margin-top: 14px;width: 450px;">{{form.commentName}}</p> -->
        </div>

      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      // 数据
      form: {
        type: Object,
        required: true
      },
      // 延期变量
      isYanqi: {
        type: Boolean,
        default: false,
        required: true
      },
      booler: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data() {
      return {

      }
    },
    watch: {
      // booler: {
      //   handler(newName, oldName) {
      //     console.log(newName, oldName, "000000000000000000000");
      //   },
      //   immediate: true,
      //   deep: true
      // }
    },
    methods: {
       //图片预览
      previewImages: function (url) {
        dd.biz.util.previewImage({
          urls: [url],//图片地址列表
          current: url,//当前显示的图片链接
          onSuccess: function (result) {
            /**/
          },
          onFail: function (err) { }
        })

        // this.$ddapi.previewImage(this.imgUrl, url);
      },
      // 发送评论
      toSend(pop, index) {
        let formdatas = new FormData();
        formdatas.append('commentContext', pop)
        // formdatas.append('commentUserId', )
        formdatas.append('id', index)
        //commentUserId
       formdatas.append('commentUserId', sessionStorage.getItem("userId"))
        // this.$http.post("/api/reportLog/commentLog", formdatas
         this.$http.post("/api/ddadapter/openApi/data", {
            "code":"00709YA01",
            "data":{
              "commentContext":pop,
              "id":index,
              "commentUserId":sessionStorage.getItem("tokenid"),
            }

         }
        ).then(res => {
          console.log(res)
        }, error => {
          alert(JSON.stringify(error))
        });
        // 主页面显示切换
        this.$emit('to-send', pop, index)
      },
      //点击查看某一个人的所有日报
      lookpep(sss,nnn) {
        console.log("查看的id是" + sss)
         console.log("查看的名字是" + nnn)
        this.$emit('onsubmit', sss,nnn)
      },
    },
    created() {
      // console.log(this.form.booler)
    }
  }
</script>
<style scoped>
  .container {
    width: 600px;
  }

  .work-box {
    margin-bottom: 10px;
    padding: 30px 100px;
    width: 100%;
    border: 1px solid #baa2a2;
    background: #FFFFFF;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.07);
    border-radius: 8px;
  }

  .work-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #666;
  }

  .big-title {
    font-size: 16px;
    color: #333;
    margin: 10px;
    font-weight: bold;
  }

  .medium-title {
    font-size: 13px;
    color: #666;
    /* margin: 15px; */
  }

  .small-title {
    font-size: 12px;
    color: #666;
    margin: 0px;
  }
  .disnone{
    display: none;
  }
</style>