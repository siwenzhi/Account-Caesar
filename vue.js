const { createApp, ref, reactive, toRefs, watchEffect, computed } = Vue;

const vue3Composition = {
  setup() {
    const FormTemplate = {
      title: null,
      site: null,
      notes: null,
      method: "Caesar",
      offset: 1,
      createTime: null,
      updateTime: null,
      items: [
        {
          index: 1,
          label: "账号",
          value: null,
          flag: false,
          result: null,
        },
      ],
    };

    const reomteFile = reactive({
      url: null,
    });

    let accountInfo = reactive(FormTemplate);

    // const fieldOptinos=ref(["1", "2"])
    // const fieldOptinos=ref([{value:"账号"}, {value: "密码"}])
    // const fieldOptinos = reactive([{ value: "账号" }, { value: "密码" }])
    const fieldOptinos = reactive(["账号", "密码", "手机", "邮箱"]);

    const encryptionMethodEnum = reactive({
      Caesar: 1,
    });

    let previewJSON = ref();

    let previewFlag = ref([]);

    // watchEffect(() => {
    //     // accountInfo.title="!23"
    //     console.log(2)

    // });

    let autoConvert = ref(true);

    // 处理预览同时对串进行偏移加密
    previewJSON = computed(() => {
      // console.log(previewFlag.value);
      // console.log("1?", previewFlag.value.indexOf("1"))

      if (autoConvert.value == true) {
        for (let i = 0; i < accountInfo.items.length; i++) {
          let item = accountInfo.items[i];
          // 这里打开的话，会导致拉取远程解密时加密值会被value的空串覆盖掉(拉取后还没解密，这里就侦听到了)
          // item.result = item.value;
          if (item.flag == true && item.value != null && item.value != "") {
            item.result = CaesarUtil.CaesarEncryption(
              item.value,
              parseInt(accountInfo.offset)
            );
          }
        }
      }

      accountInfo.updateTime = GetDateTime.dateTime();

      let temp = JSON.parse(JSON.stringify(accountInfo));

      for (let i = 0; i < temp.items.length; i++) {
        let item = temp.items[i];
        if (item.flag == true && previewFlag.value.indexOf("2") != -1) {
          item.value = "";
        }
      }

      if (previewFlag.value.indexOf("1") != -1) {
        // console.log("1?", previewFlag.value.indexOf(1));
        temp.offset = "";
      }

      // return JSON.stringify(accountInfo, null, 4);
      return JSON.stringify(temp, null, 4);
    });

    // -- 值 与 方法分割 ---------------------------------------------

    const RemoveItem = (item) => {
      // console.log(item)
      let index = accountInfo.items.indexOf(item);
      if (index !== -1) {
        accountInfo.items.splice(index, 1);
      }
    };

    const AddItem = () => {
      accountInfo.items.push({
        value: "",
        index: Date.now(),
        label: "",
        flag: true,
      });
    };

    const ResetForm = () => {
      accountInfo = reactive(FormTemplate);
    };

    const EncryptionCaesar = () => {
      // previewJSON = JSON.stringify(accountInfo, null, 4);
    };

    const CaesarDecrypt = () => {
      for (let i = 0; i < accountInfo.items.length; i++) {
        let item = accountInfo.items[i];
        item.value = item.result;
        if (item.flag == true && item.result != null && item.value != "") {
          item.value = CaesarUtil.CaesarDecrypt(
            item.result,
            parseInt(accountInfo.offset)
          );
        }
      }
    };

    const CopyToClipboar = async () => {
      await navigator.clipboard.writeText(previewJSON.value);
      ElementPlus.ElMessage({
        message: "已复制到剪贴板",
        showClose: true,
        duration: 1000,
        type: "success",
      });
    };

    const ExportJsonFile = () => {
      // console.log(123)

      try {
        let blob = new Blob([previewJSON.value], { type: "text/json" });
        // window.navigator.msSaveBlob(blob, "filenam" + '.json');

        const a = document.createElement("a");
        // 创建一个URL对象
        const url = URL.createObjectURL(blob);
        // 设置a标签的href属性为URL对象的URL
        a.href = url;
        // 设置a标签的download属性为文件名
        a.download = accountInfo.title + ".json";
        // 模拟点击a标签
        a.click();
        // 释放URL对象
        URL.revokeObjectURL(url);

        // 当用户点击下载链接后，浏览器会自动下载文件并销毁a标签。因此，不需要删除a标签。
        // 当用户点击下载链接后，浏览器会自动下载文件并销毁a标签。这是因为a标签的download属性告诉浏览器要下载文件，
        // 而不是在当前页面打开它。浏览器会自动处理下载请求，下载文件并销毁a标签，以确保不会对页面性能产生负面影响。
      } catch (e) {
        ElementPlus.ElMessage({
          message: "异常: " + e,
          showClose: true,
          duration: 1000,
          type: "error",
        });
        console.log(e);
      }
    };

    const GetRemoteFile = async () => {
      autoConvert.value = false;
      await axios
        .get(reomteFile.url)
        .then((res) => {
          // let temp = JSON.parse(JSON.stringify(res.data));
          // accountInfo = reactive(temp)

          ElementPlus.ElMessage({
            message: "拉取成功, 自动转换中···",
            showClose: true,
            duration: 500,
            type: "success",
          });

          accountInfo.title = res.data.title;
          accountInfo.site = res.data.site;
          accountInfo.notes = res.data.notes;
          accountInfo.method = res.data.method;
          accountInfo.offset = res.data.offset;
          accountInfo.createTime = res.data.createTime;
          accountInfo.updateTime = res.data.updateTime;
          accountInfo.items = res.data.items;
        })
        .catch(function (error) {
          ElementPlus.ElMessage({
            message: "异常: " + error,
            showClose: true,
            duration: 1000,
            type: "error",
          });
          console.log(error);
        });

      CaesarDecrypt();

      ElementPlus.ElMessage({
        message: "转换完毕",
        showClose: true,
        duration: 500,
        type: "success",
      });
    };

    const tttt = (v) => {
      console.log(v);
    };

    return {
      reomteFile: reomteFile,
      accountInfo: accountInfo,
      fieldOptinos: fieldOptinos,
      previewJSON: previewJSON,
      previewFlag: previewFlag,
      autoConvert: autoConvert,
      RemoveItem,
      AddItem,
      ResetForm,
      EncryptionCaesar,
      CaesarDecrypt,
      CopyToClipboar,
      ExportJsonFile,
      GetRemoteFile,
      tttt,
    };
  },
};
const app = createApp(vue3Composition).use(ElementPlus).mount("#app");
