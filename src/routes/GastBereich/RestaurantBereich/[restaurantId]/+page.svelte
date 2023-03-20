<script lang="typescript">

    import Tabs from "../../../Tabs.svelte";
    import Footer from "../../../Footer.svelte";
    import Header from "../../../Header.svelte";
    import { onMount } from "svelte";

    const handleOnClick = async () => console.log('Click!');

    //tabs
    let items =['Über Restaurant', 'Speisekarte', 'Reservierung', 'Bewertung', 'Anreise', 'Kontakt'];
    let activeItem = 'Über Restaurant';
    const tabChange = (e) => {
        activeItem = e.detail;
    }


    // Unique data for for each restaurant - Andrii's part
    export let data;

    let restaurant;
    let restaurantId = data.id.restaurantID;
    let menuId;
    let mealsOfMenu = [];
    let ratingsOfRestaurant = [];


    onMount(async () => {

        const response_restaurant = await fetch(`http://localhost:8081/v1/dinner/restaurants/${restaurantId}`)
        restaurant = await response_restaurant.json()
        menuId = restaurant.menu.menuID

        const response_meals = await fetch(`http://localhost:8081/v1/dinner/meals/menu/${menuId}`)
        mealsOfMenu = await response_meals.json()

        const response_ratings = await fetch(`http://localhost:8081/v1/dinner/ratings/restaurant/${restaurantId}`);
        ratingsOfRestaurant = await response_ratings.json()
    });


    // Reservations - Angelina's part
    let reservation = {
        email: "",
        date: '',
        time: '',
        guests: 1
    };

    async function findCustomerID(email) {
        const response = await fetch(`http://localhost:8081/v1/dinner/customers/email/${reservation.email}`);
        const customer = await response.json();
        if (response.ok) {

            return customer.id;

        }
    }

    async function createReservation(reservation) {
        const customerID2 = await findCustomerID(reservation.email);

        const date = new Date(reservation.date);
        const time = new Date(`1970-01-01T${reservation.time}`);
        const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
        const reservationData = {
            customerID: customerID2,
            date: dateTime.toISOString(),
            count_Seats: reservation.guests,
            restaurantID: restaurantId, // muss noch variabel gemacht werden
        };
        return reservationData;
    }

    function handleSubmit() {
        createReservation(reservation)
            .then(reservationData => {
                // post an API
                fetch('http://localhost:8081/v1/dinner/reservations', {
                    method: 'POST',
                    body: JSON.stringify(reservationData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .then(reservationData => {
                        console.log(reservationData);
                        alert('Reservation submitted successfully!');
                    })
                    .catch(error => {
                        console.error('Error submitting reservation:', error);
                        alert('An error occurred while submitting your reservation.');
                    });
            });
    }
</script>

<Header/>
<div class="restaurant">
    <main>
        <Tabs {activeItem} {items} on:tabChange={tabChange}/>
        {#if activeItem === 'Über Restaurant'}

            <p> Willkommen im FineFeast Restaurant, wo das Essen eine Kunst ist und das Vergnügen ein Erlebnis. Wir bieten Ihnen eine exquisite Auswahl an köstlichen Gerichten, die von unseren erfahrenen Chefköchen mit den besten Zutaten und raffinierten Techniken zubereitet werden.</p>
            <hr class="border">
            <p>Unser Menü umfasst eine breite Palette von Gerichten, die sowohl traditionelle als auch moderne Aromen vereinen. Wir bieten Ihnen eine Vielzahl von Vorspeisen, Hauptspeisen und Desserts an, die Sie mit jedem Bissen in eine Geschmackswelt entführen werden.</p>
            <hr class="border">
            <p>Unser Restaurant ist der perfekte Ort für alle, die eine entspannte und gemütliche Atmosphäre genießen möchten. Wir bieten Ihnen ein stilvolles Ambiente, das sich perfekt für ein intimes Abendessen mit Ihrem Partner oder ein Treffen mit Freunden und Familie eignet.</p>
            <hr class="border">
            <p>Bei FineFeast legen wir großen Wert auf den Genuss und die Zufriedenheit unserer Gäste. Deshalb haben wir auch eine umfangreiche Weinkarte zusammengestellt, die Ihnen eine große Auswahl an erstklassigen Weinen bietet, die perfekt zu Ihrem Essen passen.</p>


        {:else if activeItem === 'Speisekarte'}
            <h2>Übersicht - Menu</h2>

            <p>{#each mealsOfMenu as meal}
                <p><b>name:</b> {meal.name}</p>
                <p><b>price:</b> {meal.price}</p>
                <p><b>categorie:</b> {meal.category}</p>
                <hr>
            {/each}</p>
            <hr>

        {:else if activeItem === 'Reservierung'}
            <div>
                <h2>Make a Reservation</h2>
                <form on:submit|preventDefault={handleSubmit} class="form">
                    <div>
                        <label>
                            <span>Email:</span>
                            <input type="email" bind:value={reservation.email} required />
                        </label>
                    </div>
                    <label>
                        <span>Date:</span>
                        <input type="date" bind:value={reservation.date} />
                    </label>
                    <label>
                        <span>Time:</span>
                        <input type="time" bind:value={reservation.time} />
                    </label>
                    <label>
                        <span>Number of guests:</span>
                        <input type="number" bind:value={reservation.guests} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        {:else if activeItem === 'Bewertung'}
            <h2>Bewertungen: </h2>
            <p>{#each ratingsOfRestaurant as rating}
                <p><b>Customer:</b> {rating.customer.name}</p>
                <p><b>Customer Email:</b> {rating.customer.email}</p>
                <p><b>Text:</b> {rating.ratingText}</p>
                <p><b>Score:</b> {rating.ratingScore}</p>
                <hr>
            {/each}</p>

        {:else if activeItem === 'Anreise'}
            <p> component goes here </p>
        {:else if activeItem === 'Kontakt'}
            <p> component goes here </p>

        {/if}
    </main>
</div>
<Footer/>

<style>
    h2{
        color:goldenrod;
    }
    .restaurant {
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
    ul {
        list-style: none;
    }

    .form {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-gap: 20px;
    }

    label {
        display: flex;
        flex-direction: column;
    }

    label span {
        margin-bottom: 10px;
        font-weight: bold;
    }

    input {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid gray;
    }

    button {
        padding: 10px;
        border-radius: 5px;
        border: none;
        background-color: grey;
        color: #fff;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: all 0.3s ease;
    }

    button:hover {
        background-color: goldenrod;
    }

</style>
