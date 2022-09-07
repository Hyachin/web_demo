<script setup>
defineProps({
  msg: String,
});

const count = ref(0);
console.log(count.value);
const obj = reactive({
  name: "zs",
});
console.log(obj.name);
const test = function (e) {
  if (e.target.className == "b") {
    console.log("点击的是b对象");
  }
  if (e.target.className == "c") {
    console.log("点击的是c对象");
  }
};
</script>

<template>
  <div class="a" @click="test">
    <div class="b">b</div>
    <div class="c">c</div>
  </div>
  <br />
  <h1>{{ msg }}</h1>
  1234
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
