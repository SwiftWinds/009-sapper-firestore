<script context="module">
  import firebaseConfig from '../firebaseConfig';
  import { FirebaseApp, Collection } from 'sveltefire';

  async function firebase() {
    if (process.browser) {
        return firebase;
    } else {
        console.log("hello theree");
        const firebase = await import('firebase');
        if (firebase.apps.length == 0) {
            let app = firebase.initializeApp(firebaseConfig);
            return app;
        }
        else {
            return firebase.apps[0];
        }
    }
  }

  export async function preload(page, session) {
    const globalFirebase = await firebase;
    console.log("im here!");
    await import ('firebase/firestore');
    console.log('im also here!');
    console.log("im also also here!!");
    
    if (globalFirebase) {
      console.log('YESSS');
    }

    console.log("globalFirebase", globalFirebase);
    globalFirebase.initializeApp(firebaseConfig);
    console.log(globalFirebase);
  }
</script>

<script>
  import { onMount } from 'svelte';

  let globalFirebase;

  onMount(() => {
    globalFirebase = firebase;
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
	});
</script>

{#if globalFirebase}
  <FirebaseApp firebase={globalFirebase}>
    <Collection path={'posts'} let:data={posts}>
      {#each posts as post}
        {post.title}
      {/each}
    </Collection>
  </FirebaseApp>
{/if}
