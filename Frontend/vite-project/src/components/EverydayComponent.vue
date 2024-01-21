<template>
    <div class='EverydayComponent'>
        <h2>This is a component</h2> 
        my_var: {{ my_var }}     
    </div>
    </template>
    
<script>
export default{    
    data(){ 
        return {
            my_var: 'Hello'            
        }
    }
}
</script>

<style>
    .EverydayComponent{
        background-color: #14ed1b;
    }
</style>