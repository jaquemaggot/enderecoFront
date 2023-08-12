<script>
    export default{
        name: "MensagensComponent",
        props:{
            msg: String
        }
    }
</script>

<template>
    <div class="message-container">
        <p>{{ msg }}</p>
    </div>
</template>

<style>
    .message-container{
        color: #004085;
        background-color: #cce5ff;
        border: 2px solid #BBDAFF;
        border-radius: 5px;
        padding: 10px;
        max-width: 400px;
        margin: 30px auto;
    }
</style>