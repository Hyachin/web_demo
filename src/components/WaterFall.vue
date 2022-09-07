<script setup>
import { reqWaterFallImages } from "../api/waterFall";
import { throttle } from "../utils/throttle";
let page = 1;
let limit = 30;
let waterFallImages = ref([]);
let wrapper;
let existedLineHeight = [];
onMounted(async () => {
  await getWaterFallImages();
  reLayout();
  window.onscroll = throttle(async function () {
    if (loadMore()) {
      page++;
      await getWaterFallImages();
      reLayout();
    }
  }, 500);
});
const setRef = (el) => {
  wrapper = el;
};
const getWaterFallImages = async function () {
  let {
    albumdata: { linkData },
  } = await reqWaterFallImages(page, limit);
  console.log(linkData);
  let Images = linkData.map((image) => {
    return {
      id: image.pid,
      url: image.thumbnailUrl,
    };
  });
  waterFallImages.value = waterFallImages.value.concat(Images);
};
const reLayout = async () => {
  setTimeout(() => {
    existedLineHeight = [];
    let clientWidth = wrapper.clientWidth;
    let pItem = wrapper.children;
    let pItemWidth = pItem[0].offsetWidth;
    let num = Math.floor(clientWidth / pItemWidth);
    wrapper.style.width = num * pItemWidth + "px";
    for (let i = 0; i < pItem.length; i++) {
      if (i < num) {
        existedLineHeight.push(pItem[i].clientHeight);
      } else {
        const minHeight = Math.min(...existedLineHeight);
        let index = existedLineHeight.indexOf(minHeight);
        pItem[i].style.position = "absolute";
        pItem[i].style.left = index * pItemWidth + "px";
        pItem[i].style.top = minHeight + "px";
        existedLineHeight[index] += pItem[i].offsetHeight;
      }
    }
  }, 1000);
};
const loadMore = () => {
  let pItem = wrapper.children;
  let lastItem = pItem[pItem.length - 1];
  // 可视区域高度
  let clientHeight = document.documentElement.clientHeight;
  // 滚动距离
  let scrollTop = document.documentElement.scrollTop;
  if (lastItem.offsetTop < clientHeight + scrollTop) {
    return true;
  } else {
    return false;
  }
};
</script>

<template>
  <div class="wrapper clearfix" :ref="setRef">
    <div class="item" v-for="image in waterFallImages" :key="image.id">
      <div class="pic">
        <img class="image" :src="image.url" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
.wrapper {
  position: relative;
  margin: 0 auto;
}
.wrapper .item {
  float: left;
  height: auto;
  padding: 15px 0 0 15px;
}
.wrapper .item .pic {
  /* height: auto; */
}
.wrapper .item .pic .image {
  box-shadow: 2px 2px 3px #aaaaaa;
  width: 200px;

  height: auto;
}
</style>
