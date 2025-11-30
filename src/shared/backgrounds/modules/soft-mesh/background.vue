<template>
  <div class="soft-mesh-background" aria-hidden="true">
    <div class="layer mesh-gradient" />
    <div class="layer grid-overlay" />
    <div class="glass-veil" />
  </div>
</template>

<script setup lang="ts">
// No script needed; purely visual background.
</script>

<style scoped>
.soft-mesh-background {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.layer {
  position: absolute;
  inset: 0;
}

.mesh-gradient {
  background-image:
    radial-gradient(
      80vw 42vw at 12% 18%,
      rgba(99, 102, 241, 0.35),
      transparent 60%
    ),
    radial-gradient(
      65vw 38vw at 82% 28%,
      rgba(236, 72, 153, 0.3),
      transparent 60%
    ),
    radial-gradient(
      70vw 44vw at 56% 82%,
      rgba(20, 184, 166, 0.28),
      transparent 60%
    ),
    radial-gradient(
      70vw 40vw at 20% 78%,
      rgb(var(--accent) / 0.18),
      transparent 60%
    ),
    linear-gradient(180deg, rgb(var(--surface)), rgb(var(--surface-muted)));
  filter: saturate(var(--mesh-saturation, 1.08))
    contrast(var(--mesh-contrast, 1.04));
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(
      0deg,
      rgb(var(--accent) / var(--grid-opacity, 0.12)) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgb(var(--accent) / var(--grid-opacity, 0.12)) 1px,
      transparent 1px
    );
  background-size:
    var(--grid-size, 26px) var(--grid-size, 26px),
    var(--grid-size, 26px) var(--grid-size, 26px);
  background-position:
    0 0,
    0 0;
  mask-image: radial-gradient(
    120% 90% at 50% 45%,
    rgba(0, 0, 0, 0.85),
    rgba(0, 0, 0, 0)
  );
  pointer-events: none;
}

.glass-veil {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, var(--veil-opacity, 0.1));
  backdrop-filter: blur(var(--veil-blur, 6px)) saturate(1.02);
  -webkit-backdrop-filter: blur(var(--veil-blur, 6px)) saturate(1.02);
  pointer-events: none;
}

@media (max-width: 768px) {
  .mesh-gradient {
    background-image:
      radial-gradient(
        100vw 60vw at 10% 20%,
        rgba(99, 102, 241, 0.3),
        transparent 60%
      ),
      radial-gradient(
        85vw 55vw at 85% 30%,
        rgba(236, 72, 153, 0.26),
        transparent 60%
      ),
      radial-gradient(
        90vw 65vw at 55% 85%,
        rgba(20, 184, 166, 0.24),
        transparent 60%
      ),
      radial-gradient(
        90vw 60vw at 18% 80%,
        rgb(var(--accent) / 0.16),
        transparent 60%
      ),
      linear-gradient(180deg, rgb(var(--surface)), rgb(var(--surface-muted)));
  }

  .grid-overlay {
    background-size:
      var(--grid-size-mobile, 22px) var(--grid-size-mobile, 22px),
      var(--grid-size-mobile, 22px) var(--grid-size-mobile, 22px);
  }
}

@supports not ((backdrop-filter: blur(1px))) {
  .glass-veil {
    background: rgba(255, 255, 255, 0.06);
  }
}
</style>
