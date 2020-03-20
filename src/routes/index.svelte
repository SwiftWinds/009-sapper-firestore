<script context="module">
  // import { firebase } from './../firebase';

  export async function preload(page, session) {
    let firebased = await firebase();
    return { firebased };
  }
</script>

<script>
  import { firebase } from "./../firebase";
  import { FirebaseApp, Collection } from 'sveltefire';

  export let firebased = null;
</script>

{#await firebase()}
<p>waiting...</p>
{:then firebased}
<FirebaseApp firebase={firebased}>
  <Collection path={'posts'} let:data={posts}>
    {#each posts as post}
      {post.title}
    {/each}
  </Collection>
</FirebaseApp>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}