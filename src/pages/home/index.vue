<template>
  <header class="header">
    <h1 class="title">Fuente</h1>
    <section class="section"></section>
  </header>
  <main class="main">
    <div class="upload" v-if="!list.length">
      <a-upload
        :beforeUpload="() => false"
        :showUploadList="false"
        @change="onFileChange"
      >
        <div class="upload-container">
          <upload-outlined style="font-size:30px" />
          <p class="upload-description">点击或者拖拽字体文件到此区域</p>
        </div>
      </a-upload>
    </div>
    <ul class="icons" v-else>
      <li
        @click="onCopy(item.name)"
        v-for="item in list"
        :key="item.unicode"
        class="icons-item"
      >
        <div class="iconfont icon" v-html="item.unicode" />
        <div class="icon-name">{{ item.name }}</div>
        <div class="icon-unicode">{{ item.unicode }}</div>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { UploadChangeParam, VcFile } from "ant-design-vue/types/upload";
import opentype, { GlyphSet } from "opentype.js";
import { defineComponent, ref } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message, Upload } from "ant-design-vue";

export default defineComponent({
  components: {
    AUpload: Upload.Dragger,
    UploadOutlined
  },
  setup() {
    const list = ref<Array<{ name: string; unicode: string }>>([]);

    const onCopy = (text: string) => {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", text);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        message.success(`${text} 复制成功`);
      }
      document.body.removeChild(input);
    };

    const getFontList = (glyphs: GlyphSet) => {
      const result = [];

      for (let i = 0; i < glyphs.length; i++) {
        const { name, unicode } = glyphs.get(i);
        if (name) result.push({ name, unicode: `&#${unicode};` });
      }

      return result;
    };

    const setStyle = (url: string) => {
      const $style = document.createElement("style");
      $style.innerHTML = `
        @font-face {
          font-family: 'iconfont';
          src: url('${url}') format('truetype');
        }
        .iconfont {
          font-family: "iconfont" !important;
          font-size: 16px;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }`;
      document.body.append($style);
    };

    const onFileChange = (e: UploadChangeParam<VcFile>) => {
      const { file } = e;

      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = ({ target }) => {
        if (target) {
          list.value = getFontList(opentype.parse(target.result).glyphs);
        }
      };

      const readerBase64 = new FileReader();
      readerBase64.readAsDataURL(file);
      readerBase64.onload = ({ target }) => {
        if (target) setStyle(target.result as string);
      };
    };

    return {
      onFileChange,
      onCopy,
      list
    };
  }
});
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 40px;
  background: #fff;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0;
  font-size: 28px;
}

.main {
  text-align: center;
  max-width: 1600px;
  min-width: 1200px;
  margin: 0 auto;
  padding: 24px 32px;
}

.upload {
  width: 500px;
  margin: 8% auto 0;
  &-container {
    padding: 30px 0;
  }
  &-description {
    margin-top: 30px;
    font-size: 18px;
  }
}

.icons {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  &-item {
    list-style: none;
    box-sizing: border-box;
    flex: 0 0 12.5%;
    margin-top: 24px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: #f6f6f6;
    }
  }
}

.icon {
  font-size: 32px;
  &-name {
    margin: 12px 0 4px;
  }
}
@media screen and (max-width: 1500px) {
  .icons-item {
    flex: 0 0 20%;
  }
}
</style>
