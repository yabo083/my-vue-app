<template>
    <div class="card">
        hhh
    </div>
</template>

<script>
export default {
    name: 'Login',
}
</script>

<style>

.card::before {
  content: "";
  width: 104%;
  height: 102%;
  border-radius: 8px;
  background-image: linear-gradient(
    var(--rotate)
    , #5ddcff, #3c67e3 43%, #4e00c2);
  position: absolute;
  z-index: -1;
  top: -1%;
  left: -2%;
  animation: spin 2.5s linear infinite;
}

.card::after {
  position: absolute;
  top: calc(var(--card-height) / 6);
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  transform: scale(0.8);
}

@property --rotate {
  syntax: "<angle>";
  initial-value: 132deg;
  inherits: false;
}

@keyframes spin {
  0% {
    --rotate: 0deg;
  }
  100% {
    --rotate: 360deg;
  }
}

</style>
