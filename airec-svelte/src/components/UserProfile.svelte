<script>
  import { onMount } from 'svelte';
  import { user, fetchUser } from '../stores/userStore.js';
  import {aiInsight } from '../stores/aiInsightStore.js';
  // onMount(async () => {
  //   await fetchUser();
  // });
  onMount(fetchUser);
  console.log('Current AI Insight:', $aiInsight);

</script>

{#if $user}
  <h1>Welcome, {$user.name}!</h1>
{:else}

  <p>Loading user profile...</p>
{/if}
