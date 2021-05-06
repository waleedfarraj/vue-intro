'use strict'

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        cart: {
            type: Object,
            required: true
        }
    }
    , template: ` <div class="product">
    <div class="product-image">
    <img :src="image" :alt="description"  >
</div>
<div class="product-info">
    <h1>{{title}}</h1>
    <p v-if="onSale">SALE!!!{{sale}}</p>
    <p v-if="inStock">in Stock</p>
    <p v-else :class ="{scratched : !inStock}" >Out of stock</p>
    <P>shipping :{{shipping}}</P>
    <ul>
        <li v-for="detail in details">{{detail}}</li>

    </ul>
    <div v-for="(variant,index) in variants" 
    :key="variant.variantId"
    class="color-box"
    :style="{backgroundColor:variant.variantColor}"
    @mouseover="switchImg(index)">
    </div>
    <button 
    :disabled="!inStock"
     v-on:click="addToCart" 
     :class = "{disabledButton : !inStock}">Add to Cart</button>
  
    <button  :class="{disabledButton : cart == 0}" :disabled="cart == 0" @click="removeFronCart" >Remove item</button>
    <div>
    <h2>Reviews</h2>
    <p v-if="!reviews.length"> There are no reviews yet.</p>
  <ul>
  <li v-for ="review in reviews">
  <p> {{review.name}}</p>
  <p> {{review.review}}</p>
  <p> {{review.rating}}</p>
  </li>
  </ul>
    </div>
    <product-review @submitted="addReview"></product-review>
  
</div>
</div>`
    , data() {

        return {
            brand: 'Vue mastery',
            product: 'Socks',
            description: 'Long and pink',
            selectedVariant: 0,
            link: "https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding",
            inStock: true,
            details: ["80% cotton", "20% ployster", "gender-natural"],
            onSale: false,
            reviews:[],
            variants: [{ variantColor: 'green', variantId: "4822", variantImage: "./assets/vmSocks-green-onWhite.jpg" },
            { variantColor: 'blue', variantId: "4823", variantImage: "./assets/vmSocks-blue-onWhite.jpg" }],
        }
    }
    ,


    methods: {
        addToCart: function () {
            this.$emit('add-to', this.variants[this.selectedVariant].variantId)
        },
        switchImg: function (index) {
            this.selectedVariant = index
        },
        removeFronCart: function () {
            this.$emit('take-from', this.variants[this.selectedVariant].variantId)
        },
        addReview(productReview){
            this.reviews.push(productReview)
            console.log(this.reviews);
        }

    },
    computed: {
        title: function () {
            return this.brand + ' ' + this.product
        },
        image: function () {
            return this.variants[this.selectedVariant].variantImage
        },
        sale: function () {
            return this.product + ' ' + this.brand
        },
        shipping: function () {
            return this.premium === true ? 'FREE' : '2.99$'
        }

    }
}

)
Vue.component('product-review', {
    template: `<form class="review-form" @submit.prevent = "onSubmit">
    <p v-if="errors.length"> 
    <b>Correct following error(s)</b>
    <ul>
    <li v-for="error in errors">{{error}}<li>
    </ul>
    </P>
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" >
    </p>

    <p>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review"  ></textarea>
    </p>

    <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
    </p>
    <button type="submit"> Submit </button>
    </form>

    
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [] 
        }
    }
    ,methods :{
        onSubmit() {
            if(this.name&&this.review && this.rating){
                let productReview = {
                    name :this.name,
                    review:this.review,
                    rating:this.rating
                }
                this.name = null
                this.review = null
                this.rating =  null
                this.$emit('submitted',productReview)
            }else{
                this.errors = []
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")


            }
        
        }
    }
})
var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
        

    },
    methods: {
        incremeantCart(id) {
            // this.cart += 1
            this.cart.push(id)
            console.log(this.cart);
            // console.log(this.cart);
        },
        decrementCart(id) {
            // this.cart -= 1
            console.log(id);
            let idString = id.toString()
            console.log(idString);
            if (this.cart.indexOf(idString) != -1) {
                this.cart.splice(this.cart.indexOf(idString), 1)
            }
        }
    },
  


})