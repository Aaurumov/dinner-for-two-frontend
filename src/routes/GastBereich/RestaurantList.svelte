<!-- RestaurantList.svelte -->

<script>
     export let restaurants;
</script>

<h1>Restaurant List</h1>

<ul>
    {#each restaurants as restaurant}
        <li>
            <a href={`GastBereich/RestaurantBereich/${restaurant.restaurantID}`}>{restaurant.name}</a>
        </li>
    {/each}
</ul>

<style>
    a {
        font-size: 20px;
        color: black;
        text-decoration: none;
        background-color: #F4F4F4;
        border-radius: 5px;
        display: block;
        padding: 10px;
        font-family: 'Times New Roman', Times, serif;
    }

    a:hover {
        color: white;
        background-color: goldenrod;
    }
    ul {
        list-style: none;
    }
</style>
