<script lang="ts">
    import { onMount } from 'svelte';
    let rate = ["USD", "EUR","AUD","CAD","CHF","CLP","ARS"];
let Currency={
        fromCurrency:'',
        toCurrency:''
    }
    let data = 1;
    $: amount = 1;
    const fetchData = async () => {
        try {
            const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${Currency.fromCurrency}`);
            if (!res.ok) {
                await Promise.reject(new Error(res.statusText))
            }
            const json = await res.json();
            const exchangeRate = json.rates[Currency.toCurrency];
            if (exchangeRate) {
                data = exchangeRate;
               
            } else {
                console.error('Exchange rate not found.');
            }
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    };

    onMount(fetchData);

    const selectCurrency = async () => {
        await fetchData();
    };
</script>

<div>
    <select bind:value={Currency.fromCurrency} on:change={selectCurrency}>
        {#each rate as rat}
            <option value={rat}>{rat}</option>
        {/each}
    </select>

    <select bind:value={Currency.toCurrency} on:change={selectCurrency}>
        {#each rate as rat}
            <option value={rat}>{rat}</option>
        {/each}
    </select>

</div>

{#if data !== null}
    <p>Current exchange rate from {Currency.fromCurrency} to {Currency.toCurrency}: {data}</p>
    
    <p>Converted amount: {amount*data}</p>
{:else}
    <p>Loading...</p>
{/if}

<input type="number" bind:value={amount}>
