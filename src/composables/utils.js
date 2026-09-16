import { ElNotification } from "element-plus";
import { ElMessageBox } from "element-plus";
import nProgress from "nprogress";

export function toast(message, type="success") {
    ElNotification({
        message: message,
        type: type,
        duration: 2000
    })
}

export function showModal(content="提示内容", type="warning", title="") {
    return ElMessageBox.confirm(
      content,
      title,
      {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type,
      }
    )
}

export function showFullLoading() {
  nProgress.start();
}

export function hideFullLoading() {
  nProgress.done();
}