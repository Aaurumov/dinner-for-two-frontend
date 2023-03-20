<script lang="typescript">

    import Tabs from "../Tabs.svelte";
    import Footer from "../Footer.svelte";
    import Header from "../Header.svelte";

    export let menuProp;
    let menuState = menuProp;
    const handleOnClick = async () => console.log('Click!');
    //tabs
    let items =['Reservierungen', 'Bestellungen'];
    let activeItem = 'Reservierungen';
    const tabChange = (e) => {
        activeItem = e.detail;
    }
    let posts_reservations=[]
    fetch("http://localhost:8081/v1/dinner/reservations")
        .then(response => response.json())
        .then(data => posts_reservations =data)

    let posts_orders=[]
    fetch("http://localhost:8081/v1/dinner/orders")
        .then(response => response.json())
        .then(data => posts_orders =data)

</script>

<Header/>
<div class="Inhaberbereich">
    <main>
        <Tabs {activeItem} {items} on:tabChange={tabChange}/>
        {#if activeItem === 'Reservierungen'}
            <h2>Übersicht - Reservierungen</h2>

            <p>{#each posts_reservations as post}
                <p><b>Restaurant:</b> {post.restaurant.name}</p>
                <p><b>Time:</b> {post.startingTime}</p>
                <p><b>Number of seats:</b> {post.count_Seats}</p>
                <p><b>Customer:</b> {post.customer.name}</p>
                <p><b>Customer e-mail:</b> {post.customer.email}</p>
                <hr>
            {/each}</p>
            <hr>

        {:else if activeItem === 'Bestellungen'}
            <h2>Übersicht - Bestellungen</h2>

            <p> {#each posts_orders as post}

                <p><b>Date:</b> {post.orderDate}</p>
                <p><b>Customer:</b> {post.customer.name}</p>
                <p><b>Customer e-mail:</b> {post.customer.email}</p>
                <p><b>Total Price:</b> {post.totalPrice}</p>
                <hr>
            {/each}</p>

        {/if}
    </main>
</div>

<Footer/>

<style>
    h2{
        color:goldenrod;
    }
    .header {
        text-align: center;
        display:block;
        margin:5% 1;
    }
    hr{
        color: goldenrod;
    }
    .border {
        width: 300px;

    }
    h3{
        color: goldenrod;
        text-decoration: underline;

    }
    main {
        flex: 10;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }

</style>