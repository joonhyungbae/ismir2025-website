<template>
  <section id="hero" class="position-relative">
    <!-- Title and dates overlaid on the cover -->
    <v-container class="fill-height px-4 py-12 position-absolute top-0 left-0">
      <v-responsive
        class="d-flex align-center mx-auto"
        height="100%"
        max-width="700"
        width="100%"
      >
        <BaseSubheading
          size="text-h4"
          title="Welcome to the 26th International Society for Music Information Retrieval Conference"
          weight="regular"
          class="text-white text-shadow-soft"
        />

        <BaseHeading
          size="text-h1"
          title="ISMIR 2025"
          weight="medium"
          class="text-white text-shadow-soft"
        />

        <BaseBody class="text-white text-shadow-soft" fontSize="25px">
          Sep 21-25, Daejeon, Korea
        </BaseBody>

        <!--
        <div
          :class="smAndDown ? 'flex-column align-start' : 'align-center'"
          class="d-flex flex-wrap"
        >
          <BaseBtn @click="goToImportantDates">
            Important Dates
          </BaseBtn>

          <span class="font-weight-bold ml-6 mr-4 my-4 text-white">or</span>

          <BaseBtn
            :ripple="false"
            color="white"
            class="pa-1"
            height="auto"
            text
            href="https://mac.kaist.ac.kr"
            target="_blank"
          >
            Registration
          </BaseBtn>


        </div>
        -->
      </v-responsive>
    </v-container>

    <!-- Full-height image slider -->
    <div class="custom-image-slider" :style="{ height: carouselHeight }">
      <!-- Image container -->
      <div class="image-container">
        <v-img
          v-for="(image, index) in images"
          :key="index"
          :src="image.src"
          :class="{ active: currentImageIndex === index }"
          class="slider-image"
          cover
        >
        </v-img>

        <!-- Gradient overlay for text legibility -->
        <div class="gradient-overlay"></div>
      </div>

      <!-- Navigation buttons -->
      <v-btn icon class="nav-btn prev-btn" @click="prevImage">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn icon class="nav-btn next-btn" @click="nextImage">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
//import { useRouter } from 'vue-router'
import k1 from "@/assets/CoverImages/fhd/k1.webp";
import k2 from "@/assets/CoverImages/fhd/k2.webp";
import k3 from "@/assets/CoverImages/fhd/k3.webp";
import d1 from "@/assets/CoverImages/fhd/d1.webp";
import d2 from "@/assets/CoverImages/fhd/d2.webp";
import d3 from "@/assets/CoverImages/fhd/d3.webp";
//import s1 from '@/assets/CoverImages/fhd/s1.webp'
//import s2 from '@/assets/CoverImages/fhd/s2.webp'
//import s3 from '@/assets/CoverImages/fhd/s3.webp'
//import s4 from '@/assets/CoverImages/fhd/s4.webp'
import BaseHeading from "@/components/base/BaseHeading.vue";
import BaseSubheading from "@/components/base/BaseSubheading.vue";
import BaseBody from "@/components/base/BaseBody.vue";
//import BaseBtn from '@/components/base/BaseBtn.vue'

const images = [
  { src: k1 },
  { src: d1 },
  //{ src: s1 },
  { src: k2 },
  { src: d2 },
  //{ src: s2 },
  { src: k3 },
  { src: d3 },
  //{ src: s3 },
  //{ src: s4 },
];

// Carousel height, kept in a ref so it can be adjusted
const carouselHeight = ref("65vh");
/*
// Router instance
const router = useRouter()

// Navigate to the Important Dates section
const goToImportantDates = () => {
  router.push({ name: 'important-dates' }) // Navigate by route name
}
*/

const currentImageIndex = ref(0);

const prevImage = () => {
  currentImageIndex.value =
    (currentImageIndex.value - 1 + images.length) % images.length;
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
};

// Automatic slide rotation
let autoSlideInterval = null;

const startAutoSlide = () => {
  // Clear any existing interval
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }

  autoSlideInterval = setInterval(() => {
    nextImage();
  }, 8000);
};

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
};

// Start automatic rotation when the component mounts
onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});
</script>

<style scoped>
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute;
  z-index: 1;
}
.top-0 {
  top: 0;
}
.left-0 {
  left: 0;
}
/* Image slider styles */
.custom-image-slider {
  position: relative;
  overflow: hidden;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slider-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.slider-image.active {
  opacity: 1;
}

/* Gradient overlay styles */
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 65, 145, 0.65) 0%,
    rgba(0, 65, 145, 0.45) 50%,
    rgba(0, 65, 145, 0.3) 80%,
    rgba(237, 94, 96, 0.25) 100%
  );
  z-index: 0;
  pointer-events: none;
}

/* Navigation button styles */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 65, 145, 0.8) !important;
  color: white !important;
  z-index: 10;
}

.nav-btn:hover {
  background-color: rgba(0, 65, 145, 1) !important;
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}

/* Text shadow */
.text-shadow-soft {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Smaller navigation buttons on phones (<=600px) */
@media (max-width: 600px) {
  .nav-btn {
    display: none !important;
  }
}
</style>
