<template>
    <div class="banner">
      <div class="parent">
        <v-container>
          <v-row class="fill-height align-center">
            <v-col cols="12">
              <div class="cont">
                <h1 class="title">Electronics Store</h1>
                <p class="hint">Sale up to 10 % off on selected Items</p>
                <v-btn color="primary" class="shop-btn">Shop Now</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </template>
  
  <style scoped>
  /* General banner styles */
  .banner {
    .parent {
      background-image: url('../../assets/images/banner-bg.jpg');
      background-size: cover;
      background-position: center;
      height: 400px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .cont {
      color: #fff;
      position: relative;
      z-index: 1;
      text-align: left;
      padding: 2rem; /* Adjusted for better responsiveness */
      max-width: 600px;
      background: rgba(0, 0, 0, 0.5); /* Subtle background for readability */
      border-radius: 8px;
    }
  
    .title {
      font-size: 3rem;
      font-weight: bold;
      margin: 0;
      line-height: 1.2;
    }
  
    .hint {
      font-size: 1.25rem;
      margin-top: 0.5rem;
      line-height: 1.5;
    }
  
    .shop-btn {
      margin-top: 1.5rem;
      border-radius: 20px;
    }
  }
  
  /* Responsive styles */
  @media screen and (max-width: 1200px) {
    .banner .parent {
      height: 350px;
    }
  
    .cont {
      padding: 1.5rem;
    }
  
    .title {
      font-size: 2.5rem;
    }
  
    .hint {
      font-size: 1rem;
    }
  }
  
  @media screen and (max-width: 768px) {
    .banner .parent {
      height: 300px;
    }
  
    .cont {
      padding: 1rem;
      text-align: center; /* Center text for smaller screens */
    }
  
    .title {
      font-size: 2rem;
    }
  
    .hint {
      font-size: 0.875rem;
    }
  }
  
  @media screen and (max-width: 576px) {
    .banner .parent {
      height: 250px;
    }
  
    .cont {
      padding: 0.75rem;
      text-align: center;
    }
  
    .title {
      font-size: 1.75rem;
    }
  
    .hint {
      font-size: 0.75rem;
    }
  }
  
  /* Additional tweaks for very small devices */
  @media screen and (max-width: 400px) {
    .banner .parent {
      height: 200px;
    }
  
    .title {
      font-size: 1.5rem;
    }
  
    .hint {
      font-size: 0.7rem;
    }
  }
  </style>
  