<script lang="typescript">

    import Tabs from '../Tabs.svelte';


    //tabs
    let items =['Willkommen', 'Unsere Restaurants'];
    let activeItem = 'Willkommen';
    const tabChange = (e) => {
        activeItem = e.detail;
    }

    export let url = "";


    import { onMount } from 'svelte';
    import axios from 'axios';
    import RestaurantList from './RestaurantList.svelte';
    import Footer from "../Footer.svelte";
    import Header from "../Header.svelte";

    const API_URL = 'http://localhost:8081/v1/dinner/restaurants';

    let restaurants = [];

    onMount(async () => {
        const response = await axios.get(API_URL);
        restaurants = response.data;
    });

</script>

<Header/>
<div class="Gastbereich">
    <main>
        <Tabs {activeItem} {items} on:tabChange={tabChange}/>
        {#if activeItem === 'Willkommen'}

            <p> Willkommen im FineFeast Restaurant, wo das Essen eine Kunst ist und das Vergnügen ein Erlebnis. Wir bieten Ihnen eine exquisite Auswahl an köstlichen Gerichten, die von unseren erfahrenen Chefköchen mit den besten Zutaten und raffinierten Techniken zubereitet werden.</p>
            <hr class="border">
            <p>Unser Menü umfasst eine breite Palette von Gerichten, die sowohl traditionelle als auch moderne Aromen vereinen. Wir bieten Ihnen eine Vielzahl von Vorspeisen, Hauptspeisen und Desserts an, die Sie mit jedem Bissen in eine Geschmackswelt entführen werden.</p>
            <hr class="border">
            <p>Unser Restaurant ist der perfekte Ort für alle, die eine entspannte und gemütliche Atmosphäre genießen möchten. Wir bieten Ihnen ein stilvolles Ambiente, das sich perfekt für ein intimes Abendessen mit Ihrem Partner oder ein Treffen mit Freunden und Familie eignet.</p>
            <hr class="border">
            <p>Bei FineFeast legen wir großen Wert auf den Genuss und die Zufriedenheit unserer Gäste. Deshalb haben wir auch eine umfangreiche Weinkarte zusammengestellt, die Ihnen eine große Auswahl an erstklassigen Weinen bietet, die perfekt zu Ihrem Essen passen.</p>


        {:else if activeItem === 'Unsere Restaurants'}
            <RestaurantList restaurants={restaurants} />
        {/if}
    </main>
</div>
<Footer/>

<style>

    hr{
        color: goldenrod;
    }
    .border {
        width: 300px;

    }
    .Gastbereich {
        text-align: center;
        display:block;
        margin:5% 1;
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