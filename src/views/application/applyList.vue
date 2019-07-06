<template style="padding:0px;height: 100%;">
  <el-container style="padding:0px;height: 100%;">
    <el-main style="padding:0px 20px">
      <div class="headerRow">
        <el-form :inline="true" :model="infos" style="text-align:left;margin: 20px 10px 0px 0px;">
          <el-row>
            <!-- 战区 -->
              <el-select v-model="zOptions.warcode" placeholder="请选择战区" style="width:140px;margin: 0px 10px 10px 0px;">
                <el-option :key="zOptions.warcode" :label="zOptions.warname" :value="zOptions.warcode"></el-option>
              </el-select>
              <!-- 基地 -->
              <el-select v-model="jOptions.basecode" placeholder="请选择基地" style="width:140px;margin: 0px 10px 10px 0px;">
                <el-option :key="jOptions.basecode" :label="jOptions.basename" :value="jOptions.basecode"></el-option>
              </el-select>
            <el-form-item>
              <el-input @keyup.enter.native="onSubmit()" placeholder="请输入要搜索的终端名称" v-model="infos.all_info"
                style="width:600px;" suffix-icon="el-icon-search">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="background-color:#F13D3D;border: none" type="info" size="medium" @click="getList()">搜索
              </el-button>
              <el-button @click="empty()" type="text" style="color:#F13D3D ">清空搜索条件</el-button>
            </el-form-item>
          </el-row>
          <!-- 高级搜索的展开和隐藏 -->
          <el-row v-show=this.advanceds>
            <el-row>
              <!-- 省 -->
              <el-select v-model="sValue" placeholder="请选择省份" v-on:change="sChange"
                style="width:190px;margin: 0px 10px 10px 0px;">
                <el-option v-for="item in sOptions" :key="item.provincecode" :label="item.provincename"
                  :value="item.provincecode"></el-option>
              </el-select>
              <!-- 市 -->
              <el-select v-model="cValue" placeholder="请选择市区" @change="cChange()"
                style="width:210px;margin: 0px 10px 10px 0px;">
                <el-option v-for="item in cOptions" :key="item.code" :label="item.name" :value="item.code"></el-option>
              </el-select>
              <!-- 区/县 -->
              <el-select v-model="qValue" placeholder="请选择区/县" @change="qChange()"
                style="width:210px;margin: 0px 10px 10px 0px;">
                <el-option v-for="item in qOptions" :key="item.code" :label="item.name" :value="item.code"></el-option>
              </el-select>
              <!-- 终端类型 -->
              <el-select @change="changtype()" v-model="infos.store_type" placeholder="请选择终端类型"
                style="width:150px;margin: 0px 20px 10px 0px;">
                <el-option label="全部" value=""></el-option>
                <el-option label="社会终端" value="S"></el-option>
                <el-option label="专卖店" value="M"></el-option>
                <el-option label="KA门店" value="K"></el-option>
              </el-select>
              <!-- 状态 -->
              <el-select @change="changestate()" v-model="infos.bind_type" placeholder="请选择状态"
                style="width:150px;margin: 0px 10px 10px 0px;">
                <el-option label="全部" value=""></el-option>
                <el-option label="未绑定" value="0"></el-option>
                <el-option label="已绑定" value="1"></el-option>
              </el-select>
            </el-row>
          </el-row>
        </el-form>
        <!-- 分割线 -->
        <hr style="height:1px;border:none;border-top:1px solid rgb(215, 203, 203);" />
        <el-row style="text-align: left;">
          <el-row>
            <div style="float: left;;font-size:16px;color:#333;font-weight:600;line-height:30px; margin: 10px 0px;">
              终端信息
            </div>
            <el-button class="adjust" @click="adjust()" type="info"
              style="float: right;padding:7px 20px;margin: 10px 10px; background: #F13D3D;border: none">调整绑定</el-button>
            <el-button class="binding" @click="binding()" type="info"
              style="float: right;padding:7px 20px;margin: 10px 10px; background: #F13D3D;border: none">绑定员工</el-button>
          </el-row>
        </el-row>
      </div>
      <!-- <div class="tables" ref="tables"> -->
        <div >
        <el-table :header-row-class-name='header' v-loading="loading"
          @selection-change="handleSelectionChange" :data="tableData" style="width: 100%;" tooltip-effect="dark"
          :header-cell-style="{background:'#DBE4F3',color:'#333333'}" border>
        <!-- <el-table :height="height" :header-row-class-name='header' v-loading="loading"
          @selection-change="handleSelectionChange" :data="tableData" style="width: 100%;" tooltip-effect="dark"
          :header-cell-style="{background:'#DBE4F3',color:'#333333'}" border> -->
          <el-table-column type="selection" width="55" align="center" fixed="left">
          </el-table-column>
          <el-table-column prop="storeName" label="终端名称" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="storeCode" label="终端编码" width="110" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="storeType" label="终端类别" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-show="(scope.row.storeType == 'S')">社会终端</span>
              <span v-show="(scope.row.storeType == 'M')">专卖店</span>
              <span v-show="(scope.row.storeType == 'K')">KA门店</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="联系人信息" width="190" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.storeOwnerName}}({{scope.row.storeOwnerMobile}})</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="storeOwnerMobile" label="联系人手机号" width="180" show-overflow-tooltip align="center">
          </el-table-column> -->
          <el-table-column label="终端所在省/市/区、县" min-width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.provinceName}}/{{scope.row.cityName}}/{{scope.row.areaName}}</span>
              <!-- <span>{{scope.row.address}}</span> -->
            </template>
          </el-table-column>
          <el-table-column prop="address" label="终端详细信息" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bindType" label="状态" width="90" show-overflow-tooltip></el-table-column>
          <el-table-column prop="" label="绑定员工信息" width="210" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.bindMoblie==null">{{scope.row.bindUser}}{{scope.row.bindMoblie}}</span>
              <span v-else>{{scope.row.bindUser}}({{scope.row.bindMoblie}})</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="bindMoblie" label="绑定员工手机号" min-width="180" show-overflow-tooltip align="center">
          </el-table-column> -->
          <el-table-column fixed="right" label="操作" width="90" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <el-button @click="examinequantes(scope.row)" type="text" size="small">绑定记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page_right">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[10]" :page-size="infos.page_size" layout="total, sizes, prev, pager, next, jumper"
          :total="page_num">
        </el-pagination>
      </div>
      <!-- 查看 -->
      <dialogquantes :quantesDiaTitle="'绑定关系记录'" v-if='quantesIsVisible' :quantesIsVisible='quantesIsVisible'
        @quantesCloseDialog='quantesCloseDialog' :gquantesDatay='gquantesDatay' />

    </el-main>
  </el-container>

</template>

<script>
  import * as api from '../../api/api'
  import dialogquantes from "@/views/application/quantitiesinfo";
  export default {
    components: { dialogquantes },
    data() {
      return {
        height: null,
        zhanji: {
          zValue: "64",// 战区绑定值
          jValue: "3515",// 基地绑定值
        },
        jValue: "",// 基地绑定值
        sValue: "", // 省绑定值
        cValue: "",// 市绑定值
        qValue: "",// 区绑定值
        qdata: [],// 区县json
        cdata: [],// 市json
        zOptions: {}, //战区
        jOptions: {},//基地
        sOptions: [],// 省json 省数组
        cOption: "",
        cOptions: [],// 市数组
        qOptions: [], // 区数组
        /**三联动↑ */
        gquantesDatay: "",//传给子页面的id
        advanceds: true,//高级搜索切换
        quantesIsVisible: false,
        loading: false,
        dingping: [],//过滤后钉钉的内容
        multipleSelection: [],//全部的筛选框数据
        quantesData: [],//筛选后的多选框数据
        quantes: [],//要传给后台的多选框数据
        /**终端信息 */
        tableData: [],
        currentPage: 1,
        total: 0,
        page_num: 0,
        infos: {
          tokenid: sessionStorage.getItem("tokenid"),
          page_current: 1,
          page_size: 10,
          all_info: "",
          // store_type: "",
          // bind_type: "",
        },
      };
    },
    mounted: function () {
      this.height = document.documentElement.clientHeight - 380;
    },
    methods: {
      // 标题为剧中
      header: function () {
        return "gggg"
      },
      // 区选择方法
      qChange() {
        this.getList();
      },
      // 市选择
      cChange(val) {
        this.getList();
        // 清空区
        this.qOptions = [];
        this.qValue = "";

        // 根据市的选择，给区数组赋值
        // this.qdata.map(el => {
        //   if (el.pId === val) {
        //     this.qOptions.push(el);
        //   }
        // });
        let xcValue = {
          "provinceCode": this.sValue,
          "cityCode": this.cValue
          //  "name": "string"
        }
        // console.log("选择市区的值")
        // console.log(xcValue)
        let formF = JSON.stringify(xcValue);
        //  根据市的选择，给区组赋值
        // 
        // api.wlyareaArea(formF).then(res => {
        api.wlyareaArea({
          "code": "00707SUA06",
          "data": xcValue
        }).then(res => {
          console.log(res)
          // console.log(res,"ppppppppppp")
          this.qOptions = res.data.data;
        })
      },
      // 省选择
      sChange(val) {
        let t = this;
        // 清空市、区
        this.cValue = "";
        this.qValue = "";
        this.qOptions = [];
        this.cOptions = [];
        // console.log("省的值为");
        // console.log(this.sValue);
        let sfValue = {
          "provinceCode": this.sValue,
          "tokenid": sessionStorage.getItem("tokenid")
          //sessionStorage.setItem("tokenid", res.userid);
          //  "name": "string"
        }
        // console.log("选择省后的值")
        // console.log(sfValue)
        // let formF = JSON.stringify(sfValue);
        //  根据省的选择，给市数组赋值
        api.wlyareaCity(
          {
            "code": "00707SUA05",
            "data": sfValue
          }
        ).then(res => {
          console.log(res)
          // console.log(res,"ppppppppppp")
          this.cOptions = res.data.data;
          // console.log(typeof(this.cOptions))

          //  let newData = [];
          // for (let i in this.cOption) {
          //   this.cOptions.push({
          //     id: i,
          //     label: this.cOption[i]
          //   });
          // }
          // console.log(this.cOptions);

          //  for(var key in this.cOptions){
          //     console.log(key+":"+this.cOptions[key])
          //  }


        })
      },
      //初始化加载省
      newChange() {
        let t = this;
        // 清空市、区
        this.cValue = "";
        this.qValue = "";
        this.qOptions = [];
        this.cOptions = [];

        this.sOptions = JSON.parse(sessionStorage.getItem("provinceinfo"));//provinceinfo
        console.log(this.sOptions)
        //判断省份数组中数据是否为一条数据 如果是一条数据则默认选中此数据
        if(this.sOptions.length==1){
          this.sValue = this.sOptions[0].provincecode;
          this.sChange();
        }else{
          
        }
      },
      changepr() {
        this.getList()
      },
      changtype() {
        this.getList()
      },
      changestate() {
        this.getList()
      },
      //三联动↑

      //多选框事件
      handleSelectionChange(val) {
        this.multipleSelection = val;
        // console.log(this.multipleSelection)
      },
      //查看
      examinequantes(row) {
        this.gquantesDatay = row.storeId;
        this.quantesIsVisible = true;
      },
      quantesCloseDialog() {
        this.quantesIsVisible = false;
      },
      // 输入框回车事件
      onSubmit() {
        this.getList();
      },

      //列表初始化
      getList() {
        this.loading = true;
        // this.infos.pk_war = this.zValue;
        // this.infos.pk_base = this.jValue;
        this.infos.pk_war = this.zOptions.warcode;//战区
        this.infos.pk_base = this.jOptions.basecode;//基地
        this.infos.pk_province = this.sValue;
        this.infos.pk_city = this.cValue;
        this.infos.pk_area = this.qValue;

        let ttsousuo = JSON.stringify(this.infos);
        api.wlystoreQuery({
          "code": "00707SUA01",
          "data": this.infos
        }).then(res => {
          console.log(res)
          this.page_num = res.data.page_num;
          this.tableData = res.data.data;
          this.loading = false;
        })
      },
      //分页
      handleCurrentChange(size) {
        this.infos.page_current = size;
        this.getList()
      },
      handleSizeChange(val) {
        // 改变每页显示的条数 
        this.infos.page_size = val;
        //在改变每页显示的条数时，要将页码显示到第一页
        // this.currentPage = 1
        this.getList()
      },
      // 绑定员工
      binding() {
        let t = this;
        let www = JSON.stringify(t.multipleSelection)

        if (t.multipleSelection.length == 0) {
          this.$message({
            message: '请选择你要绑定的终端',
            type: 'warning'
          })
          t.loading = false;
          return
        } else {
          if (www.indexOf('已绑定') == -1) {
            //下面是正常的
            DingTalkPC.biz.contact.choose({
              multiple: false, //是否多选： true多选 false单选； 默认true
              users: [], //默认选中的用户列表，员工userid；成功回调中应包含该信息
              corpId: sessionStorage.getItem("corpId"), //企业id
              max: 1500, //人数限制，当multiple为true才生效，可选范围1-1500
              onSuccess: function (data) {
                //钉钉的回调数据
                console.log("钉钉回参")
                console.log(data)
                var dingdinghuidiao = data[0];
                // console.log("钉钉返回数据:")
                // console.log(dingdinghuidiao)
                var username = dingdinghuidiao.name
                var usermobile = ""
                var userid = dingdinghuidiao.emplId
                t.multipleSelection.map(item => {
                  t.quantesData.push({ store_id: item.storeId, store_address: item.address, store_name: item.storeName });
                })
                var stores = t.quantesData;

                let superdi = {
                  userid: userid,
                  username: username,
                  usermobile: usermobile,
                  stores: stores,
                  tokenid: sessionStorage.getItem("tokenid"),
                  // tokencode: sessionStorage.getItem("tokencode")
                }
                let formFata = JSON.stringify(superdi);
                api.wlystoreBinding({
                  "code": "00707SUA03",
                  "data": superdi
                }).then(res => {
                  console.log(res)
                  if (res.data.errcode == "0") {
                    t.quantesData = []
                    t.getList()
                  }
                  else {
                    this.$message({
                      message: res.data.errmsg,
                      type: 'warning'
                    });
                  }
                })
              },
              onFail: function (err) {
                t.loading = false;
              }
            });
          } else {
            t.loading = false;
            this.$message({
              message: '请选择正确的绑定人员',
              type: 'warning'
            });
          }
        }
      },
      // 调节绑定
      adjust() {
        let t = this;
        t.multipleSelection.map(item => {
          if (item.bindUser == null || item.bindUser == "" || item.bindUser == undefined) {
            // 为空
            t.loading = false;
            t.$message({
              message: '请选择正确的绑定人员',
              type: 'warning'
            });
            return
          } else {
            if (t.multipleSelection.length != 1) {
              t.loading = false;
              this.$message({
                message: '请只选择一条消息',
                type: 'warning'
              });
            } else {
              DingTalkPC.biz.contact.choose({
                multiple: false, //是否多选： true多选 false单选； 默认true
                users: [], //默认选中的用户列表，员工userid；成功回调中应包含该信息
                corpId: sessionStorage.getItem("corpId"), //企业id
                max: 1500, //人数限制，当multiple为true才生效，可选范围1-1500
                // pickedUsers:t.multipleSelection,            //已选用户
                onSuccess: function (data) {
                  //钉钉的回调数据
                  // console.log(data)
                  var dingdinghuidiao = data[0];
                  var username = dingdinghuidiao.name
                  var usermobile = ""
                  var userid = dingdinghuidiao.emplId
                  t.multipleSelection.map(item => {
                    t.quantesData.push({ store_id: item.storeId, store_address: item.address, store_name: item.storeName });
                  })
                  var stores = t.quantesData;

                  let superdisr = {
                    userid: userid,
                    username: username,
                    usermobile: usermobile,
                    stores: stores,
                    tokenid: sessionStorage.getItem("tokenid"),
                    //  tokencode: sessionStorage.getItem("tokencode")
                  }

                  let formFataer = JSON.stringify(superdisr);
                  api.wlystoreBindMofiy({
                    "code": "00707SUA04",
                    "data": superdisr
                  }).then(res => {
                    console.log(res.data)
                    if (res.data.errcode == "0") {
                      t.quantesData = []
                      t.getList()
                    }
                    else {
                      this.$message({
                        message: res.data.message,
                        type: 'warning'
                      });
                    }
                  })
                },
                onFail: function (err) {
                  // console.log(err);
                }
              });
            }
          }
        })
      },
      //清空条件
      empty() {
        this.zValue = "";
        this.jValue = "";
        this.sValue = "";
        this.cValue = "";
        this.qValue = "";
        this.sOptions = [];
        this.qOptions = [];
        this.cOptions = [];
        this.infos.store_type = "",
        this.infos.bind_type = "",
        this.infos.all_info = "",
        this.newChange();
        this.getList();
      },
    },
    created() {
      console.log(sessionStorage.getItem("tokenid"))
      console.log("战区")//zOptions
      this.zOptions = JSON.parse(sessionStorage.getItem("warinfo"));
      console.log(this.zOptions);//provinceinfo
      console.log("基地")//jOptions
      this.jOptions = JSON.parse(sessionStorage.getItem("baseinfo"));
      console.log(this.jOptions);//provinceinfo
      this.newChange();//查询省
      this.getList();//初始化查询
    }
  };
</script>
<style>
  /*分页居右*/
  .page_right {
    float: right;
    padding: 10px;
  }

  .el-table td,
  .el-table th {
    padding: 0px 0;
  }

  .el-main {
    height: calc(100% - 120px);
  }

  .headerRow {
    height: 120px;
    /* position: absoluteS;
   top:50px; */
  }

  .tables {
    height: calc(100% - 200px);
    /* background: #AE0000 */
  }

  .el-table {
    height: 90%;
  }

  .el-table th {
    height: 50px;
  }

  .el-table thead tr.gggg th {
    text-align: center;
  }
</style>