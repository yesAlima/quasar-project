<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div id="particles-js"></div>
        <q-card
          class="login-form"
          v-bind:style="$q.platform.is.mobile?{'width': '80%'}:{'width':'30%'}"
        >
          <q-avatar
            square
            size="120px"
            class="absolute"
            style="top: -17px;right: 0px;transform: translateY(-50%);"
          >
            <img src="/app-icon.png" />
          </q-avatar>
          <q-img
            class='q-mt-md'
            src="/desk-illustration.svg"
          />
          <q-card-section>

            <div class="row no-wrap items-center">
              <div class="col text-h6 text-bold text-primary ellipsis">Ali System</div>
            </div>
          </q-card-section>
          <q-card-section class='text-center q-my-lg'>
            <q-btn
              size='xl'
              class='q-mb-sm'
              icon="img:/gmail.png"
              color="primary"
              outline
              @click="googleLogin()"
              label="login "
            />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script type="text/javascript">
</script>
<script>
import fbLoginMixin from "../mixins/fbLoginMixin";

export default {
  mixins: [fbLoginMixin],
  data() {
    return {
      username: "admin",
      password: "Admin@CRM"
    };
  },
  mounted() {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#ffffff"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: "img/app-icon.png",
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }
};
</script>

<style>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, rgb(136, 198, 63) 15%, #363d57 70%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.login-form {
  position: absolute;
}
</style>
