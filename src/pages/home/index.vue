<template>
  <div class="home">
    <h1>Welcome to Fuente</h1>
    <input type="file" @change="onFileChange" accept=".ttf" />
    <ul class="icons">
      <li v-for="item in list" :key="item.unicode" class="icons-item">
        <div class="iconfont icon" v-html="item.unicode" />
        <div class="icon-name">{{ item.name }}</div>
        <div class="icon-unicode">{{ item.unicode }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import opentype, { GlyphSet } from "opentype.js";

export default defineComponent({
  setup() {
    const list = ref<Array<{ name: string; unicode: string }>>([]);

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

    const onFileChange = e => {
      const file = e.target.files[0];

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
      list
    };
  }
});
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
  max-width: 1600px;
  min-width: 1200px;
  margin: 0 auto;
  padding: 40px 32px;
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
