<template>
  <header class="header">
    <h1 class="title">Fuente</h1>
    <section class="section">
      <Badge :count="icons.length">
        <ShoppingCartOutlined style="font-size:24px" />
      </Badge>
    </section>
  </header>
  <main class="main">
    <div class="upload" v-if="!list.length">
      <Upload
        :beforeUpload="() => false"
        :showUploadList="false"
        @change="onFileChange"
      >
        <div class="upload-container">
          <UploadOutlined style="font-size:30px" />
          <p class="upload-description">点击或者拖拽字体文件到此区域</p>
        </div>
      </Upload>
    </div>
    <ul class="icons" v-else>
      <li
        :class="{ 'icons-item-selected': icons.includes(item.name) }"
        v-for="item in list"
        :key="item.unicode"
        class="icons-item"
      >
        <div
          @click="onAddCart(item.name)"
          class="iconfont icon"
          v-html="item.unicode"
        />
        <div @click="onCopy(item.name)" class="icon-name" title="点击复制">
          {{ item.name }}
        </div>
        <div
          @click="onCopy(item.unicode)"
          class="icon-unicode"
          title="点击复制"
        >
          {{ item.unicode }}
        </div>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { UploadChangeParam, VcFile } from "ant-design-vue/types/upload";
import opentype, { GlyphSet, Glyph } from "opentype.js";
import { defineComponent, ref } from "vue";
import { UploadOutlined, ShoppingCartOutlined } from "@ant-design/icons-vue";
import { message, Upload, Badge } from "ant-design-vue";

interface Item {
  unicode: string;
  glyph: Glyph;
  name: string;
}

export default defineComponent({
  components: {
    Upload: Upload.Dragger,
    ShoppingCartOutlined,
    UploadOutlined,
    Badge
  },
  setup() {
    const list = ref<Array<Item>>([]);
    const icons = ref<Array<string>>([]);

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
        const glyph = glyphs.get(i);
        const { name, unicode } = glyph;
        if (name) result.push({ name, unicode: `&#${unicode};`, glyph });
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

    const onAddCart = (name: string) => {
      if (icons.value.includes(name)) {
        icons.value.splice(icons.value.indexOf(name), 1);
      } else {
        icons.value.push(name);
      }
    };

    return {
      onFileChange,
      onAddCart,
      onCopy,
      list,
      icons
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

.section {
  flex: 1;
  text-align: right;
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
    flex: 0 0 12.5%;
    box-sizing: border-box;
    margin: 24px;
    padding: 10px;
    user-select: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: #f6f6f6;
    }
    &-selected {
      border: dashed 1px currentColor;
    }
  }
}

.icon {
  font-size: 32px;
  &-name {
    margin: 8px 0 4px;
    &:hover {
      text-decoration: underline;
    }
  }
  &-unicode {
    &:hover {
      text-decoration: underline;
    }
  }
}
@media screen and (max-width: 1500px) {
  .icons-item {
    flex: 0 0 20%;
  }
}
</style>
