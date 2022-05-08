<template>
  <header class="header">
    <h1 class="title">Fuente</h1>
    <section class="section">
      <Badge
        :count="icons.length"
        @click="onShowDrawer"
        style="cursor: pointer"
      >
        <ShoppingCartOutlined style="font-size: 24px" />
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
          <UploadOutlined style="font-size: 30px" />
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
  <Drawer :visible="visible" @close="visible = false" :closable="false">
    <header class="drawer-header">
      <Badge :count="icons.length">
        <ShoppingCartOutlined style="font-size: 30px" />
      </Badge>
      <div class="drawer-clear" @click="icons = []">
        <ClearOutlined style="font-size: 18px" />
        <span style="margin-left: 6px">全部清除</span>
      </div>
    </header>
    <Button shape="round" block @click="onDownload">下载</Button>
  </Drawer>
</template>

<script lang="ts">
import { message, Upload, Badge, Drawer, Button } from 'ant-design-vue'
import type { GlyphSet, Glyph, FontConstructorOptions } from 'opentype.js'
import opentype from 'opentype.js'
import { defineComponent, ref, toRaw } from 'vue'
import {
  ShoppingCartOutlined,
  UploadOutlined,
  ClearOutlined
} from '@ant-design/icons-vue'

interface Item {
  unicode: string
  glyph: Glyph
  name: string
}

export default defineComponent({
  components: {
    Upload: Upload.Dragger,
    ShoppingCartOutlined,
    UploadOutlined,
    ClearOutlined,
    Button,
    Drawer,
    Badge
  },
  setup() {
    const fontOptions = ref<Partial<FontConstructorOptions>>({})
    const icons = ref<Array<string>>([])
    const list = ref<Array<Item>>([])
    const visible = ref(false)

    const onCopy = (text: string) => {
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.setAttribute('value', text)
      input.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
        message.success(`${text} 复制成功`)
      }
      document.body.removeChild(input)
    }

    const getFontList = (glyphs: GlyphSet) => {
      const result = []
      for (let i = 0; i < glyphs.length; i++) {
        const glyph = glyphs.get(i)
        const { name, unicode } = glyph
        if (name && name !== '.notdef') {
          result.push({ name, unicode: `&#${unicode};`, glyph })
        }
      }
      return result
    }

    const setStyle = (url: string) => {
      const $style = document.createElement('style')
      const { familyName } = fontOptions.value

      $style.innerHTML = `
        @font-face {
          font-family: '${familyName}';
          src: url('${url}') format('truetype');
        }
        .iconfont {
          font-family: '${familyName}' !important;
          font-size: 16px;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }`
      document.body.append($style)
    }

    const onFileChange = (e: any) => {
      const { file } = e
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = ({ target }) => {
        if (target) {
          const font = opentype.parse(target.result)
          const { glyphs, unitsPerEm, ascender, descender, names } = font
          const familyName = names.fontFamily.en
          fontOptions.value = {
            styleName: familyName,
            familyName,
            unitsPerEm,
            descender,
            ascender
          }
          list.value = getFontList(glyphs)
        }
      }

      const readerBase64 = new FileReader()
      readerBase64.readAsDataURL(file)
      readerBase64.onload = ({ target }) => {
        if (target) setStyle(target.result as string)
      }
    }

    const onAddCart = (name: string) => {
      if (icons.value.includes(name)) {
        icons.value.splice(icons.value.indexOf(name), 1)
      } else {
        icons.value.push(name)
      }
    }

    const onShowDrawer = () => {
      if (icons.value.length > 0) {
        visible.value = true
      } else {
        message.warn('请至少选择一个图标')
      }
    }

    const onDownload = () => {
      const glyphs = toRaw(list.value)
        .filter(({ name }) => icons.value.includes(name))
        .map(({ glyph }) => glyph)

      if (glyphs.length === 0) return

      glyphs.unshift(
        new opentype.Glyph({
          path: new opentype.Path(),
          advanceWidth: 650,
          name: '.notdef',
          unicode: 0
        })
      )

      new opentype.Font({
        ...fontOptions.value,
        glyphs: glyphs
      } as FontConstructorOptions).download()
    }

    return {
      onFileChange,
      onShowDrawer,
      onDownload,
      onAddCart,
      visible,
      onCopy,
      icons,
      list
    }
  }
})
</script>

<style lang="less" scoped>
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
  width: 100px;
  margin: 0;
  font-size: 28px;
  text-indent: -9999px;
  background: url('./logo.png') no-repeat center;
  background-size: 100% auto;
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  margin: 0;
  padding: 0;
  list-style: none;

  &-item {
    box-sizing: border-box;
    margin: 24px;
    padding: 10px;
    user-select: none;
    cursor: pointer;
    border: dashed 1px transparent;
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: #f6f6f6;
    }
    &-selected {
      border-color: currentColor;
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

.drawer {
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
  }
  &-clear {
    display: flex;
    align-items: center;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
