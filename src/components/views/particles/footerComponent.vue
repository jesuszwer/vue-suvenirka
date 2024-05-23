<template>
  <footer>
    <div class="container">
      <div class="contact">
        <div>
          <img src="@/assets/img/logo.svg" alt="logo">
        </div>
        <a href="tel:+77770803003">+7 777 080 3003</a>
        <a href="mailto:suvenirka@artpool.kz">suvenirka@artpool.kz</a>
        <div class="social">
          <a href="https://www.instagram.com/suvenirka_ala/" target="_blank">
            <i class="bi bi-instagram"></i>
          </a>
          <a href="https://wa.me/77770804004" target="_blank">
            <i class="bi bi-whatsapp"></i>
          </a>
          <a href="https://www.youtube.com/@suveniryalmaty" target="_blank">
            <i class="bi bi-youtube"></i>
          </a>
        </div>
      </div>
      <div class="information">
        <h4>О нас</h4>
        <p>ИП "Art&Pol"</p>
        <p>г.Алматы, ул.Желтоксана 37 А</p>
        <iframe
          src="https://yandex.kz/map-widget/v1/?ll=76.937812%2C43.265234&mode=whatshere&tab=inside&whatshere%5Bpoint%5D=76.937812%2C43.265234&whatshere%5Bzoom%5D=17&z=17"
          width="360" height="220" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe>
        <p>
          &copy; 2024 Все права защищены
        </p>
      </div>
    </div>

  </footer>
</template>

<script setup>
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 auto;
  padding: 32px 0;
}

footer {
  width: 100%;
  display: flex;
  background-color: #F0F0F0;

  & .contact {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    & img {
      height: 64px;
      align-self: flex-start;
      margin-bottom: 20px;
    }

    & a {
      color: black;
      text-decoration: none;
      font-size: 24px;
    }

    & .social {
      display: flex;
      flex-direction: row;
      column-gap: 20px;
      margin-bottom: 20px;

      & i {
        font-size: 32px;
      }
    }

    & p {
      font-size: 20px;
      margin-top: auto;
      /* Добавлено для прижатия к низу */
    }

  }

  & p {
    font-size: 20px;
    justify-self: flex-end;
  }


  & .information {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    & h4 {
      font-size: 24px;
    }

    & p {
      font-size: 24px;

    }
  }

}

@media (max-width: 992px) {
  .contact {
    & a {
      font-size: 22px !important;
    }
  }

  .information {
    & p {
      font-size: 22px !important;
    }
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    row-gap: 20px;

    & .contact {
      align-items: center;
    }

    & .information {
      align-items: center;
    }
  }
}
</style>