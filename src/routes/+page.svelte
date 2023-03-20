<script lang="typescript">
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';

</script>

<div class="willkommen">
    <Header/>
    <h2>Willkommen bei FineFeast</h2>
        <nav>
            <a href="/InhaberBereich">Inhaberbereich</a>
            <a href="/GastBereich">Gastbereich</a>
        </nav>
    <Footer/>
</div>

<style>
    nav a {
        display: inline-block;
        padding: 10px 20px;
        background-color: goldenrod;
        color: rgb(0, 0, 0);
        text-decoration: none;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 10px;
    }
    nav a:hover {
        background-color: rgb(138, 105, 21);
        color: rgb(255, 255, 255);
    }

    nav a:last-of-type {
        margin-right: 0;
    }
    h2{
        color:goldenrod;
    }
    .willkommen {
        text-align: center;
        display:block;
        margin:5% 1;
    }
</style>