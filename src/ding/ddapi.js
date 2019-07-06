export class Ddapi {
  contactChoose(userid) {
    return new Promise(function (reslove, reject) {
      DingTalkPC.biz.contact.choose({
        multiple: true, //是否多选： true多选 false单选； 默认true
        users: userid, //默认选中的用户列表，员工userid；成功回调中应包含该信息
        corpId: localStorage.getItem("corpId"), //企业id
        max: 1500, //人数限制，当multiple为true才生效，可选范围1-1500
        onSuccess: function (data) {
          reslove(data);
        },
        onFail: function (err) {
          console.log(err);
        }
      });
    })
  }
  //钉钉confirm项目提示框
  confirm(msgtext) {
    return new Promise(function (resolve) {
      DingTalkPC.device.notification.confirm({
        message: msgtext,
        title: 'Note',
        buttonLabels: ['Confirm', 'Cancel'],
        onSuccess: function (result) {
          resolve(result.buttonIndex)
        },
        onFail: function (err) {}
      });
    })
  }
  // 钉钉文件下载
  downloadFile(url, fileName) {
    console.log(url, fileName, "--------------------下载")
    DingTalkPC.biz.util.downloadFile({
      url: url, //要下载的文件的url
      name: fileName, //定义下载文件名字
      onProgress: function (msg) {
        // 文件下载进度回调
        console.log(msg)
      },
      onSuccess: function (result) {
        console.log(result);
      },
      onFail: function (err) {
        console.log(err);
      }
    });
  }

  //图片预览
  utilPreviewImage(images, image) {
    DingTalkPC.biz.util.previewImage({
      urls: images, //图片地址列表
      current: image, //当前显示的图片链接
      onSuccess: function (result) {
        /**/
      },
      onFail: function () {}
    })
  }

  //图片上传API
  uploadImage(multiple, maxNum) {
    return new Promise(function (reslove, reject) {
      DingTalkPC.biz.util.uploadImage({
        compression: true,
        multiple: multiple, //是否多选，默认false
        max: maxNum, //最多可选个数
        onSuccess: function (result) {
          reslove(result)
        },
        onFail: function (err) {
          reject(err)
        }
      })
    })
  }

  //钉钉弹窗
  notificationToast(content, type, time) {
    DingTalkPC.device.notification.toast({
      type: type, //toast的类型 alert, success, error, warning, information, confirm
      text: content, //提示信息
      duration: time, //显示持续时间，单位秒，最短2秒，最长5秒
      delay: 0, //延迟显示，单位秒，默认0, 最大限制为10
      onSuccess: function (result) {
        /*{}*/
      },
      onFail: function (err) {

      }
    })
  }
}

let ddapi = new Ddapi()
export default ddapi
