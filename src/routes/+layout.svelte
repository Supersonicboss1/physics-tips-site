<script lang="ts">
    import "../app.css";
  </script>
<div class="box-border m-0 p-0 font-sans">
    <nav class="flex items-center h-16 bg-gray-800">
        <a class=" pr-6 p-5 hover:bg-gray-900" href="/">Home</a>
        <a class=" pr-6 p-5 hover:bg-gray-900" href="/tips">Tips</a>
      </nav>

      <slot></slot>
    </div>
    <style lang="postcss">
        :global(html) {
          background-color: theme(colors.gray.900);

        }
        :global(html) {
            color: theme(colors.gray.100);
          }
      </style>