import { PrismaClient } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function seed() {
  // Wipe existing course data (LessonProgress and CoursePurchase are left intact)
  await prisma.lessonProgress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.coursePurchase.deleteMany();
  await prisma.course.deleteMany();

  await prisma.course.create({
    data: {
      title: "TypeScript with Vue.js 3",
      chapters: {
        create: [
          {
            title: "Chapter 1",
            slug: "1-chapter-1",
            number: 1,
            lessons: {
              create: [
                {
                  title: "Vue Fundamentals with the Composition API Course",
                  slug: "1-vue-fundamentals-with-the-composition-api-course",
                  number: 1,
                  youtubeUrl:
                    "https://youtu.be/jF_jYjYRsxk?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  sourceUrl:
                    "https://www.youtube.com/embed/jF_jYjYRsxk?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  text: `<p>In this course, we will teach you the fundamental concepts of Vue.js 3 and create a solid foundation for your Vue journey.</p>
                    <p>The Vue.js Fundamentals with the Composition API course covers:</p>
                    <ul>
                      <li>Introduction to two-way data binding</li>
                      <li>Template syntax and expressions</li>
                      <li>Vue directives, loops and conditional rendering</li>
                      <li>Vue Devtools</li>
                      <li>Handling user inputs</li>
                      <li>Handling events</li>
                      <li>Vue.js methods and computed properties</li>
                      <li>Attribute bindings and dynamic classes</li>
                    </ul>
                    <p>The course is suitable for developers who do not yet know Vue.js or are just getting started with Vue.</p>`,
                },
                {
                  title: "Master Quasar: Build Powerful Cross-Platform Apps",
                  slug: "2-master-quasar-build-powerful-cross-platform-apps",
                  number: 2,
                  youtubeUrl:
                    "https://youtu.be/x2XY8Djj4es?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  sourceUrl:
                    "https://www.youtube.com/embed/x2XY8Djj4es?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  text: `<p>
                    Discover the power of the Quasar Framework in this beginner-friendly guide! 🚀
                    In this video, we'll cover everything you need to start building
                    cross-platform Vue.js apps with Quasar:
                  </p>

                  <ul>
                    <li>A quick introduction to what makes Quasar special.</li>
                    <li>
                      Installing Quasar using your favorite package manager (Yarn, npm, pnpm, or
                      Bun).
                    </li>
                    <li>
                      Setting up ESLint for clean and error-free coding in VS Code.
                    </li>
                    <li>
                      Exploring the <code>QBtn</code> component: size, colors, styles, icons, and
                      even adding badges!
                    </li>
                  </ul>`,
                },
                {
                  title:
                    "How to Create Realtime Laravel Apps with Laravel Reverb",
                  slug: "3-how-to-create-realtime-laravel-apps-with-laravel-reverb",
                  number: 3,
                  youtubeUrl:
                    "https://youtu.be/F444U4Vens0?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  sourceUrl:
                    "https://www.youtube.com/embed/F444U4Vens0?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  text: `<p>
                    In this step-by-step tutorial, we'll guide you through creating a new Laravel
                    application using the official Laravel installer.
                  </p>

                  <p>
                    We'll also show you how to install Laravel Reverb to get started with
                    real-time broadcasting in your Laravel projects.
                  </p>`,
                },
              ],
            },
          },
          {
            title: "Chapter 2",
            slug: "2-chapter-2",
            number: 2,
            lessons: {
              create: [
                {
                  title: "Github Copilot for Vue Developers",
                  slug: "1-github-copilot-for-vue-developers",
                  number: 1,
                  youtubeUrl:
                    "https://youtu.be/HgdWrMrILrs?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  sourceUrl:
                    "https://www.youtube.com/embed/HgdWrMrILrs?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  text: `<p>
                    Let's experiment with GitHub Copilot to see how useful it can be with Vue apps!
                  </p>
                  <p>
                    This video is part of our fully featured course on the Vue School platform.
                  </p>`,
                },
                {
                  title:
                    "Vue.js Suspense Component: Learn How to Handle Async Dependencies",
                  slug: "2-vue-js-suspense-component-learn-how-to-handle-async-dependencies",
                  number: 2,
                  youtubeUrl:
                    "https://youtu.be/wymBjTAEaUE?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  sourceUrl:
                    "https://www.youtube.com/embed/wymBjTAEaUE?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  text: `<p>
                    Discover how to manage async components effortlessly in Vue.js using the
                    Suspense component for top-level awaited functions!
                  </p>

                  <p>
                    In this tutorial, we'll explore how to use Vue 3's Suspense to handle
                    asynchronous components and top-level awaited functions, ensuring a smooth
                    loading experience across your app.
                  </p>

                  <p>
                    Starting with common async issues, we'll dive into practical examples using
                    <code>defineComponent</code> to illustrate how Suspense works and show how to
                    render loading states with ease.
                  </p>`,
                },
                {
                  title:
                    "Master File-Based Routing with Unplugin Vue Router in Vue.js",
                  slug: "3-master-file-based-routing-with-unplugin-vue-router-in-vue-js",
                  number: 3,
                  youtubeUrl:
                    "https://youtu.be/rsHJ_6Qq-jw?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  sourceUrl:
                    "https://www.youtube.com/embed/rsHJ_6Qq-jw?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  text: `<p>
                    Ready to revolutionize routing in your Vue.js projects? In this video, learn
                    how to set up the Unplugin Vue Router to enable file-based routing in a fresh
                    Vue.js project.
                  </p>

                  <p>
                    We'll guide you through the initial setup and show you how this plugin
                    simplifies routing by dynamically mapping Vue components to routes. No more
                    manual mapping, fewer typos, and less frustration!
                  </p>

                  <p>
                    This video is just the start. In the full
                    <strong>"Enhanced Routing with Unplugin Vue Router"</strong> course on Vue
                    School, you'll go beyond the basics, exploring advanced file-based routing
                    concepts, type-safe routes, and TypeScript integration for a more intuitive
                    development experience.
                  </p>`,
                },
                {
                  title: "The Vuetify Data Table Component and Vuetify Labs",
                  slug: "4-the-vuetify-data-table-component-and-vuetify-labs",
                  number: 4,
                  youtubeUrl:
                    "https://youtu.be/NizXP2E12sE?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  sourceUrl:
                    "https://www.youtube.com/embed/NizXP2E12sE?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  text: `<p>
                    In this lesson, learn about experimenting with the cutting-edge Vue components
                    from Vuetify Labs.
                  </p>

                  <p>
                    Also, learn to use a data table to quickly display tabular data in your Vue
                    apps with pagination, filtering, sorting, row selection, and more!
                  </p>`,
                },
              ],
            },
          },
          {
            title: "Chapter 3",
            slug: "3-chapter-3",
            number: 3,
            lessons: {
              create: [
                {
                  title: "Build Robust Vue js Forms with FormKit",
                  slug: "1-build-robust-vue-js-forms-with-formkit",
                  number: 1,
                  youtubeUrl:
                    "https://youtu.be/wo1poFTjQEM?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  sourceUrl:
                    "https://www.youtube.com/embed/wo1poFTjQEM?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  text: `<p>
                    Unlock the power of FormKit and take your Vue.js forms to the next level!
                  </p>

                  <p>Here's what you'll learn:</p>

                  <ol>
                    <li>
                      <strong>Introduction to FormKit:</strong>
                      Discover how FormKit simplifies form building, validation, theming, and
                      submission. Say goodbye to tedious traditional forms!
                    </li>
                    <li>
                      <strong>Project Setup &amp; Config:</strong>
                      Set up a Nuxt 3 project from scratch and install the FormKit Nuxt module
                      effortlessly.
                    </li>
                    <li>
                      <strong>Powerful Form Fields with a Simple API:</strong>
                      Build versatile form inputs with intuitive props for validation,
                      customization, and more.
                    </li>
                    <li>
                      <strong>Form Population &amp; Submission:</strong>
                      Learn how to handle initial values, manage submission states, and handle
                      forms like a pro.
                    </li>
                    <li>
                      <strong>Form Customization with Props:</strong>
                      Add extra polish with FormKit's customizable props like
                      <code>submit-label</code> and <code>submit-behavior</code>.
                    </li>
                  </ol>

                  <p><strong>Why FormKit?</strong></p>

                  <p>
                    FormKit isn't just a library—it’s a framework that empowers developers to
                    build complex forms with ease. Whether you're a Vue beginner or an experienced
                    pro, FormKit's features will transform how you build forms.
                  </p>

                  <p><strong>💡 Perfect for developers who:</strong></p>

                  <ul>
                    <li>Want to reduce boilerplate code in forms.</li>
                    <li>Need powerful validation and error handling.</li>
                    <li>Love clean and customizable UI components.</li>
                  </ul>`,
                },
                {
                  title: "How to Use Iconify Web Components in Vue js",
                  slug: "2-how-to-use-iconify-web-components-in-vue-js",
                  number: 2,
                  youtubeUrl:
                    "https://youtu.be/aY4uvJ-MrIE?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  sourceUrl:
                    "https://www.youtube.com/embed/aY4uvJ-MrIE?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  text: `<p>
                    Explore how to use Iconify Web Component in Vue.js.
                  </p>

                  <p><strong>What You'll Learn:</strong></p>

                  <ul>
                    <li>How to integrate Lucide Icons with Vue.js</li>
                    <li>Using Iconify for a massive collection of icons</li>
                    <li>Leveraging Iconify's Web Component in Vue apps</li>
                    <li>Best practices for performance and customization</li>
                  </ul>`,
                },
                {
                  title: "How to Prefetch Lazily Loaded Vue Components",
                  slug: "3-how-to-prefetch-lazily-loaded-vue-components",
                  number: 3,
                  youtubeUrl:
                    "https://youtu.be/PHyciOFiI-M?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  sourceUrl:
                    "https://www.youtube.com/embed/PHyciOFiI-M?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  text: `<p>
                      In this lesson from our course
                      <strong>"The Ultimate Guide to Vue Performance"</strong>, learn advanced
                      performance optimization techniques to enhance user experience by
                      implementing smart component prefetching.
                    </p>

                    <p>
                      Discover how to leverage event-driven preloading, including mouseover
                      detection, to anticipate user interactions and load component chunks before
                      they're needed.
                    </p>

                    <p>
                      This tutorial covers Vue lazy loading of page components and other components
                      as well as Nuxt route prefetching.
                    </p>

                    <p>
                      You'll learn how to reduce perceived loading times and optimize bundle
                      loading. Perfect for Vue developers looking to build lightning-fast,
                      production-ready applications with optimized client-side performance.
                    </p>`,
                },
                {
                  title: "Javascript Custom Error Classes: When, Why, How",
                  slug: "4-javascript-custom-error-classes-when-why-how",
                  number: 4,
                  youtubeUrl:
                    "https://youtu.be/XHDvwxK3lGg?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  sourceUrl:
                    "https://www.youtube.com/embed/XHDvwxK3lGg?list=PLxddmVXxb3Huq1a85yhttZggUoIaWz4bJ",
                  text: `<p>In this free lesson from our JavaScript Error Handling course, learn how to
                      create and implement custom error classes to build robust error handling
                      systems in your applications.
                    </p>

                    <p>Discover:</p>

                    <ul>
                      <li>
                        How to create custom error types by extending the base
                        <code>Error</code> class
                      </li>
                      <li>
                        Why custom error classes give you more control and flexibility
                      </li>
                      <li>
                        How to implement error codes for different failure scenarios
                      </li>
                      <li>
                        Techniques for separating developer messages from user-friendly errors
                      </li>
                      <li>
                        Real-world example using payment processing error handling
                      </li>
                    </ul>

                    <p>
                      Stop relying on generic error messages! This tutorial walks through a
                      practical payment processing example to show how custom error classes can
                      dramatically improve user experience while giving developers the detailed
                      information they need.
                    </p>`,
                },
              ],
            },
          },
        ],
      },
    },
  });
}

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
