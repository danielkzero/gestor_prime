<template>
  <router-view />
</template>

<style>
 .p-highlight {
  --tw-text-opacity: 1;
  color: var(--fallback-s,oklch(var(--s)/var(--tw-text-opacity)));
}
.p-link:hover {
  background-color: color-mix(in oklab,oklch(var(--btn-color, var(--b3)) / var(--tw-bg-opacity, 1)) 90%,black);
  border-color: color-mix(in oklab,oklch(var(--btn-color, var(--b3)) / var(--tw-border-opacity, 1)) 90%,black);
}
.p-paginator-pages .p-highlight, .p-dropdown-items .p-highlight {
  background-color: color-mix(in oklab,oklch(var(--btn-color, var(--b3)) / var(--tw-bg-opacity, 1)) 90%,black);
  border-color: color-mix(in oklab,oklch(var(--btn-color, var(--b3)) / var(--tw-border-opacity, 1)) 90%,black);
}
.p-dropdown-items {
  --tw-bg-opacity: 1;
  background-color: var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)));
  text-align: center;
}

.p-dropdown-items-wrapper {
  --tw-bg-opacity: 1;
  background-color: var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)));
  padding: 0.5rem;
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);
  border-radius: var(--rounded-box, 0.5rem);
}
.p-dropdown-label, .p-dropdown-trigger {
  --tw-bg-opacity: 1;
  background-color: var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)));
  padding: 0.5rem;
}
.p-dropdown {
  border-radius: var(--rounded-box, 0.5rem);
  padding: 0.5rem;
}
.p-dropdown-item {
  border-radius: var(--rounded-box, 0.5rem);
  padding: 0.5rem;  
}
.p-paginator-element {
    align-items: stretch;
    border-radius: var(--rounded-btn, 0.5rem);
}
.p-paginator-element .p-paginator-element:first-child:not(:last-child), .p-paginator *:first-child:not(:last-child) .p-paginator-element {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
}

.p-paginator-element :where(.p-paginator-element:last-child:not(:first-child)), .p-paginator :where(*:last-child:not(:first-child) .p-paginator-element) {
    border-start-end-radius: inherit;
    border-end-end-radius: inherit;
}
.p-paginator-element :where(.p-paginator-element:first-child:not(:last-child)), .p-paginator :where(*:first-child:not(:last-child) .p-paginator-element) {
    border-end-start-radius: inherit;
    border-start-start-radius: inherit;
}
.p-paginator-element :where(.p-paginator-element) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    border-end-start-radius: 0;
    border-start-start-radius: 0;
}
.p-paginator-element, .p-paginator-rpp-options {
    display: inline-flex;
    height: 3rem;
    min-height: 3rem;
    min-width: 3rem;
    flex-shrink: 0;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border-radius: var(--rounded-btn, 0.5rem);
    border-color: transparent;
    border-color: oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity));
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center;
    font-size: 0.875rem;
    line-height: 1em;
    gap: 0.5rem;
    font-weight: 600;
    text-decoration-line: none;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    border-width: var(--border-btn, 1px);
    animation: button-pop var(--animation-btn, 0.25s) ease-out;
}
.p-autocomplete-panel {
  --tw-bg-opacity: 1;
  background-color: var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)));
  padding: 0.5rem;
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);
  border-radius: var(--rounded-box, 0.5rem);
}
details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none;
}
.p-datatable-table {
    border-spacing: 0px;
    width: 100%;
}
.p-paginator {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
}
.p-dropdown {
    padding: 0.5rem;
}
.p-dropdown-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.p-dropdown-label, .p-dropdown-trigger {
    --tw-bg-opacity: 1;
    background-color: var(--fallback-b1, oklch(var(--b1)))/var(--tw-bg-opacity)));
    padding: 0.5rem;
}
.p-paginator .p-dropdown {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    height: 3rem;
}
.p-paginator-rpp-options{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;  
}
</style>